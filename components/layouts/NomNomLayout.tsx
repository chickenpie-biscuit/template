'use client';

import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import Container from '@/components/ui/Container';
import { Clock, Users, ChefHat, Flame } from 'lucide-react';

interface Ingredient {
  amount?: string;
  ingredient?: string;
}

interface GalleryImage {
  _key?: string;
  asset?: any;
  alt?: string;
  caption?: string;
}

interface NomNomPost {
  title: string;
  slug: { current: string };
  featuredImage?: {
    asset?: any;
    alt?: string;
  };
  description?: string;
  body?: any[];
  recipeGallery?: GalleryImage[];
  recipeVideo?: string;
  ingredients?: Ingredient[];
  prepTime?: string;
  cookTime?: string;
  servings?: string;
  difficulty?: string;
  cuisine?: string;
  publishedAt?: string;
}

interface NomNomLayoutProps {
  post: NomNomPost;
}

const difficultyColors: Record<string, string> = {
  easy: 'bg-green-500',
  medium: 'bg-yellow-500',
  hard: 'bg-orange-500',
  expert: 'bg-red-500',
};

// Extract YouTube/Vimeo video ID
function getVideoEmbed(url: string): string | null {
  if (!url) return null;
  
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  
  return null;
}

export default function NomNomLayout({ post }: NomNomLayoutProps) {
  const heroImage = post.featuredImage?.asset
    ? urlFor(post.featuredImage).width(1600).height(900).url()
    : null;

  const videoEmbed = post.recipeVideo ? getVideoEmbed(post.recipeVideo) : null;

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] bg-black overflow-hidden">
        {heroImage && (
          <>
            <Image
              src={heroImage}
              alt={post.featuredImage?.alt || post.title}
              fill
              className="object-cover opacity-70"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          </>
        )}

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-end">
          <Container>
            <div className="pb-12 max-w-4xl">
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 mb-6 border-2 border-white">
                <span className="text-xl">🍳</span>
                <span className="font-heading font-bold uppercase text-sm tracking-widest">
                  Nom Nom
                </span>
              </div>

              {/* Title */}
              <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold uppercase text-white leading-[0.9] mb-6">
                {post.title}
              </h1>

              {/* Recipe Meta */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6">
                {post.prepTime && (
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 border border-white/20">
                    <Clock className="w-4 h-4 text-orange-400" />
                    <div>
                      <p className="text-[10px] font-heading uppercase text-white/60">Prep</p>
                      <p className="text-sm font-heading font-bold text-white">{post.prepTime}</p>
                    </div>
                  </div>
                )}
                {post.cookTime && (
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 border border-white/20">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <div>
                      <p className="text-[10px] font-heading uppercase text-white/60">Cook</p>
                      <p className="text-sm font-heading font-bold text-white">{post.cookTime}</p>
                    </div>
                  </div>
                )}
                {post.servings && (
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 border border-white/20">
                    <Users className="w-4 h-4 text-orange-400" />
                    <div>
                      <p className="text-[10px] font-heading uppercase text-white/60">Serves</p>
                      <p className="text-sm font-heading font-bold text-white">{post.servings}</p>
                    </div>
                  </div>
                )}
                {post.difficulty && (
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 border border-white/20">
                    <ChefHat className="w-4 h-4 text-orange-400" />
                    <div>
                      <p className="text-[10px] font-heading uppercase text-white/60">Level</p>
                      <p className="text-sm font-heading font-bold text-white capitalize">{post.difficulty}</p>
                    </div>
                  </div>
                )}
                {post.cuisine && (
                  <div className="bg-orange-500 text-white px-4 py-2 font-heading font-bold uppercase text-xs tracking-wider">
                    {post.cuisine}
                  </div>
                )}
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Sidebar - Ingredients */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-white border-4 border-black p-6">
                <h2 className="font-heading text-2xl font-bold uppercase text-black mb-6 pb-4 border-b-2 border-black flex items-center gap-2">
                  <span>🥘</span> Ingredients
                </h2>
                
                {post.ingredients && post.ingredients.length > 0 ? (
                  <ul className="space-y-3">
                    {post.ingredients.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 group">
                        <span className="w-2 h-2 bg-orange-500 mt-2 flex-shrink-0 group-hover:bg-black transition-colors" />
                        <span className="font-body text-black/80">
                          {item.amount && (
                            <span className="font-bold text-black">{item.amount} </span>
                          )}
                          {item.ingredient}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="font-body text-black/60 italic">
                    Ingredients will be listed here
                  </p>
                )}

                {/* Difficulty Badge */}
                {post.difficulty && (
                  <div className="mt-8 pt-6 border-t-2 border-black/10">
                    <p className="font-heading text-xs uppercase tracking-wider text-black/50 mb-2">Difficulty</p>
                    <div className={`inline-block px-4 py-2 ${difficultyColors[post.difficulty] || 'bg-gray-500'} text-white font-heading font-bold uppercase text-sm`}>
                      {post.difficulty}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Main Content - Instructions */}
            <div className="lg:col-span-2">
              {/* Description */}
              {post.description && (
                <div className="mb-12 p-6 bg-orange-50 border-l-4 border-orange-500">
                  <p className="font-body text-lg text-black/80 leading-relaxed italic">
                    {post.description}
                  </p>
                </div>
              )}

              {/* Video Section */}
              {videoEmbed && (
                <div className="mb-12">
                  <h2 className="font-heading text-2xl font-bold uppercase text-black mb-6 flex items-center gap-2">
                    <span>🎬</span> Watch How It's Made
                  </h2>
                  <div className="relative w-full aspect-video bg-black border-4 border-black overflow-hidden">
                    <iframe
                      src={videoEmbed}
                      title={`How to make ${post.title}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                </div>
              )}

              {/* Instructions */}
              <div className="mb-12">
                <h2 className="font-heading text-2xl font-bold uppercase text-black mb-6 flex items-center gap-2">
                  <span>📝</span> Instructions
                </h2>
                
                {post.body ? (
                  <div className="prose prose-lg max-w-none">
                    <div className="font-body text-black/80 leading-relaxed space-y-4 [&>p]:mb-4 [&>h2]:font-heading [&>h2]:text-xl [&>h2]:font-bold [&>h2]:uppercase [&>h2]:mt-8 [&>h2]:mb-4 [&>h3]:font-heading [&>h3]:text-lg [&>h3]:font-bold [&>h3]:mt-6 [&>h3]:mb-3 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2 [&>blockquote]:border-l-4 [&>blockquote]:border-orange-500 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-black/60">
                      <PortableText value={post.body} />
                    </div>
                  </div>
                ) : (
                  <p className="font-body text-black/60 italic">
                    Step-by-step instructions will appear here
                  </p>
                )}
              </div>

              {/* Recipe Gallery */}
              {post.recipeGallery && post.recipeGallery.length > 0 && (
                <div>
                  <h2 className="font-heading text-2xl font-bold uppercase text-black mb-6 flex items-center gap-2">
                    <span>📸</span> Gallery
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {post.recipeGallery.map((image, index) => {
                      if (!image.asset) return null;
                      const imgUrl = urlFor(image).width(600).height(600).url();
                      return (
                        <div 
                          key={image._key || index} 
                          className="relative aspect-square bg-black border-2 border-black overflow-hidden group"
                        >
                          <Image
                            src={imgUrl}
                            alt={image.alt || `${post.title} - Image ${index + 1}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {image.caption && (
                            <div className="absolute inset-x-0 bottom-0 bg-black/80 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <p className="text-xs font-body text-white text-center">
                                {image.caption}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-orange-500 border-t-4 border-black">
        <Container>
          <div className="text-center">
            <p className="font-heading text-3xl font-bold uppercase text-white mb-4">
              🍳 Made This Recipe?
            </p>
            <p className="font-body text-white/80 mb-6">
              Tag us on social media and share your creation!
            </p>
            <div className="inline-block bg-black text-white px-8 py-3 font-heading font-bold uppercase text-sm border-2 border-black hover:bg-white hover:text-black transition-colors cursor-pointer">
              #ChickenpieNomNom
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
