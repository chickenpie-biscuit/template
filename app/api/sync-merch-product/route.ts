import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '0fg6ihzb',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { feedPostId } = body;

    if (!feedPostId) {
      return NextResponse.json(
        { error: 'feedPostId is required' },
        { status: 400 }
      );
    }

    // Fetch the feedPost document
    const feedPost = await client.fetch(
      `*[_type == "feedPost" && _id == $id][0]{
        _id,
        title,
        slug,
        category,
        description,
        body,
        featuredImage,
        productGallery,
        price,
        originalPrice,
        productType,
        sizes,
        limitedQuantity,
        dropDate,
        stock,
        featured,
        publishedAt,
        syncedProduct
      }`,
      { id: feedPostId }
    );

    if (!feedPost) {
      return NextResponse.json(
        { error: 'FeedPost not found' },
        { status: 404 }
      );
    }

    // Only sync merch-drops
    if (feedPost.category !== 'merch-drops') {
      return NextResponse.json(
        { error: 'Only merch-drops can be synced to products' },
        { status: 400 }
      );
    }

    // Build product data
    const productData: Record<string, any> = {
      _type: 'product',
      title: feedPost.title,
      slug: feedPost.slug,
      price: feedPost.price || 0,
      originalPrice: feedPost.originalPrice,
      shortDescription: feedPost.description,
      description: feedPost.body,
      productType: feedPost.productType || 'other',
      sizes: feedPost.sizes,
      limitedQuantity: feedPost.limitedQuantity || false,
      dropDate: feedPost.dropDate,
      stock: feedPost.stock || 0,
      featured: feedPost.featured || false,
      publishedAt: feedPost.publishedAt || new Date().toISOString(),
      syncedFromFeedPost: {
        _type: 'reference',
        _ref: feedPostId,
      },
    };

    // Handle images
    const images: any[] = [];
    
    if (feedPost.productGallery && feedPost.productGallery.length > 0) {
      feedPost.productGallery.forEach((img: any) => {
        if (img.asset) {
          images.push({
            _type: 'image',
            _key: img._key || Math.random().toString(36).substring(7),
            asset: img.asset,
            alt: img.alt || feedPost.title,
          });
        }
      });
    } else if (feedPost.featuredImage?.asset) {
      images.push({
        _type: 'image',
        _key: Math.random().toString(36).substring(7),
        asset: feedPost.featuredImage.asset,
        alt: feedPost.featuredImage.alt || feedPost.title,
      });
    }
    
    if (images.length > 0) {
      productData.images = images;
    }

    let productId: string;
    let action: 'created' | 'updated';

    // Check if product already exists
    if (feedPost.syncedProduct?._ref) {
      // Update existing product
      productId = feedPost.syncedProduct._ref;
      await client
        .patch(productId)
        .set(productData)
        .commit();
      action = 'updated';
    } else {
      // Create new product
      const newProduct = await client.create(productData);
      productId = newProduct._id;
      action = 'created';
      
      // Update feedPost with reference to the new product
      await client
        .patch(feedPostId)
        .set({
          syncedProduct: {
            _type: 'reference',
            _ref: productId,
          },
        })
        .commit();
    }

    return NextResponse.json({
      success: true,
      action,
      productId,
      message: `Product ${action} successfully!`,
    });
  } catch (error) {
    console.error('Error syncing merch-drop to product:', error);
    return NextResponse.json(
      { error: 'Failed to sync product' },
      { status: 500 }
    );
  }
}
