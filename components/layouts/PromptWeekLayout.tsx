'use client';

import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Container from '@/components/ui/Container';
import PortableText from '@/components/sanity/PortableText';
import { Copy, Check, Sparkles, Zap } from 'lucide-react';
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
    <article className="min-h-screen bg-white">
      {/* Hero Section - Clean Tech Aesthetic */}
      <div className="relative border-b-4 border-black bg-cream overflow-hidden">
        <div className="absolute inset-0 opacity-5" 
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)',
          }}
        />
        
        <Container>
          <div className="relative py-20 lg:py-32">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-goldenrod" />
              <span className="font-heading font-bold uppercase text-xs tracking-[0.3em] text-black/60">
                Prompt of the Week
              </span>
              {post.aiTool && typeof post.aiTool === 'string' && (
                <>
                  <span className="text-black/20">/</span>
                  <span className="font-heading font-bold uppercase text-xs tracking-widest text-goldenrod">
                    {post.aiTool}
                  </span>
                </>
              )}
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-heading font-bold uppercase mb-8 leading-[0.9] max-w-4xl text-black">
              {post.title}
            </h1>

            {post.description && (
              <p className="text-xl lg:text-2xl text-black/70 leading-relaxed max-w-2xl font-body">
                {post.description}
              </p>
            )}
          </div>
        </Container>
      </div>

      {/* Split Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: The Prompt */}
        <div className="bg-white border-b-4 lg:border-b-0 lg:border-r-4 border-black p-8 lg:p-16 flex flex-col min-h-[600px]">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-0.5 bg-goldenrod" />
              <Zap className="w-5 h-5 text-goldenrod" />
            </div>
            <h2 className="font-heading font-bold uppercase text-3xl text-black">
              The Prompt
            </h2>
          </div>

          <div className="flex-1 relative mb-8">
            <div className="bg-black border-4 border-black p-6 font-mono text-sm lg:text-base text-cream leading-relaxed shadow-xl">
              <pre className="whitespace-pre-wrap">{typeof post.promptText === 'string' ? post.promptText : 'Prompt not available'}</pre>
            </div>

            <button
              onClick={copyPrompt}
              className="absolute top-4 right-4 p-3 bg-goldenrod text-black hover:bg-cream hover:text-black transition-colors border-2 border-black flex items-center gap-2 font-heading text-xs font-bold uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
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

          <div className="pt-8 border-t-2 border-black/10">
            <h3 className="font-heading font-bold uppercase text-sm mb-4 text-goldenrod tracking-widest flex items-center gap-2">
              <span className="w-6 h-0.5 bg-goldenrod" />
              Why It Works
            </h3>
            {post.body && (
              <div className="prose prose-lg max-w-none font-body text-black/80
                prose-headings:font-heading prose-headings:font-bold prose-headings:uppercase prose-headings:text-black
                prose-p:text-black/80 prose-p:leading-relaxed
                prose-a:text-goldenrod prose-a:font-bold hover:prose-a:underline
                prose-strong:text-black prose-strong:font-bold
                prose-ul:text-black/80 prose-ol:text-black/80">
                <PortableText content={post.body} />
              </div>
            )}
          </div>
        </div>

        {/* Right: The Result */}
        <div className="bg-cream p-8 lg:p-16 flex flex-col items-center justify-center min-h-[600px]">
          <div className="mb-8 w-full">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-0.5 bg-red" />
              <Sparkles className="w-5 h-5 text-red" />
            </div>
            <h2 className="font-heading font-bold uppercase text-3xl text-black">
              The Result
            </h2>
          </div>

          {resultImageUrl && (
            <div className="relative w-full max-w-2xl aspect-square bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-4">
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
            <div className="inline-block px-4 py-2 bg-black text-goldenrod border-2 border-black">
              <p className="text-xs font-heading uppercase tracking-widest font-bold">
                Generated with {post.aiTool || 'AI'}
              </p>
            </div>
          </div>

          {/* CTA Button */}
          {post.ctaLink && (
            <div className="mt-12 text-center">
              <a
                href={post.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-goldenrod text-black hover:bg-black hover:text-goldenrod border-2 border-black font-heading font-bold uppercase transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all"
              >
                {post.ctaText || 'Try This Tool'}
              </a>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

