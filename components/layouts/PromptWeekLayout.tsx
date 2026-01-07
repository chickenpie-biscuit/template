'use client';

import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Container from '@/components/ui/Container';
import PortableText from '@/components/sanity/PortableText';
import { Copy, Check, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface PromptWeekLayoutProps {
  post: any;
}

export default function PromptWeekLayout({ post }: PromptWeekLayoutProps) {
  const [copied, setCopied] = useState(false);
  const resultImageUrl = post.promptResult
    ? urlFor(post.promptResult).width(1200).url()
    : null;

  const copyPrompt = () => {
    navigator.clipboard.writeText(post.promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="min-h-screen bg-black text-cream">
      {/* Hero Section - Cyberpunk/Tech Aesthetic */}
      <div className="relative border-b-2 border-teal overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal/10 via-transparent to-red/10" />
        <div className="absolute inset-0" 
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
          }}
        />
        
        <Container>
          <div className="relative py-20 lg:py-32">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-teal" />
              <span className="font-heading font-bold uppercase text-xs tracking-[0.3em] text-teal">
                Prompt of the Week
              </span>
              {post.aiTool && (
                <>
                  <span className="text-teal">/</span>
                  <span className="font-heading font-bold uppercase text-xs tracking-widest text-cream/60">
                    {post.aiTool}
                  </span>
                </>
              )}
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-heading font-bold uppercase mb-8 leading-[0.9] max-w-4xl">
              {post.title}
            </h1>

            {post.description && (
              <p className="text-xl lg:text-2xl text-cream/80 leading-relaxed max-w-2xl font-body">
                {post.description}
              </p>
            )}
          </div>
        </Container>
      </div>

      {/* Split Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        {/* Left: The Prompt */}
        <div className="bg-black border-b-2 lg:border-b-0 lg:border-r-2 border-teal p-8 lg:p-16 flex flex-col">
          <div className="mb-8">
            <h2 className="font-heading font-bold uppercase text-2xl mb-4 text-teal flex items-center gap-3">
              <span className="w-2 h-2 bg-teal rounded-full animate-pulse" />
              The Prompt
            </h2>
          </div>

          <div className="flex-1 relative">
            <div className="bg-cream/5 border-2 border-teal/30 rounded-sm p-6 font-mono text-sm lg:text-base text-cream/90 leading-relaxed">
              <pre className="whitespace-pre-wrap">{post.promptText}</pre>
            </div>

            <button
              onClick={copyPrompt}
              className="absolute top-4 right-4 p-2 bg-teal text-black hover:bg-cream transition-colors rounded-sm flex items-center gap-2 font-heading text-xs font-bold uppercase"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </button>
          </div>

          <div className="mt-8 pt-8 border-t-2 border-cream/10">
            <h3 className="font-heading font-bold uppercase text-sm mb-4 text-cream/60 tracking-widest">
              Why It Works
            </h3>
            {post.body && (
              <div className="prose prose-invert prose-sm max-w-none font-body text-cream/80">
                <PortableText content={post.body} />
              </div>
            )}
          </div>
        </div>

        {/* Right: The Result */}
        <div className="bg-gradient-to-br from-teal/5 to-red/5 p-8 lg:p-16 flex flex-col items-center justify-center">
          <div className="mb-8 w-full">
            <h2 className="font-heading font-bold uppercase text-2xl text-cream flex items-center gap-3">
              <span className="w-2 h-2 bg-red rounded-full animate-pulse" />
              The Result
            </h2>
          </div>

          {resultImageUrl && (
            <div className="relative w-full max-w-2xl aspect-square bg-black border-2 border-cream/20 shadow-2xl">
              <Image
                src={resultImageUrl}
                alt={post.promptResult?.alt || 'AI Generated Result'}
                fill
                className="object-contain p-4"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-xs font-heading uppercase tracking-widest text-cream/40">
              Generated with {post.aiTool || 'AI'}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

