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
    const { postId, action } = body;

    if (!postId) {
      return NextResponse.json(
        { error: 'postId is required' },
        { status: 400 }
      );
    }

    // Fetch current likes count
    const post = await client.fetch(
      `*[_type == "feedPost" && _id == $id][0]{ likes }`,
      { id: postId }
    );

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    const currentLikes = post.likes || 0;
    const newLikes = action === 'unlike' 
      ? Math.max(0, currentLikes - 1) 
      : currentLikes + 1;

    // Update likes count
    await client
      .patch(postId)
      .set({ likes: newLikes })
      .commit();

    return NextResponse.json({
      success: true,
      likes: newLikes,
    });
  } catch (error) {
    console.error('Error updating likes:', error);
    return NextResponse.json(
      { error: 'Failed to update likes' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');

    if (!postId) {
      return NextResponse.json(
        { error: 'postId is required' },
        { status: 400 }
      );
    }

    const post = await client.fetch(
      `*[_type == "feedPost" && _id == $id][0]{ likes }`,
      { id: postId }
    );

    return NextResponse.json({
      likes: post?.likes || 0,
    });
  } catch (error) {
    console.error('Error fetching likes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch likes' },
      { status: 500 }
    );
  }
}
