'use client';

import Image from 'next/image';
import Container from '@/components/ui/Container';
import PortableText from '@/components/sanity/PortableText';
import { urlFor } from '@/sanity/lib/image';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Award, 
  AlertCircle, 
  Rocket,
  Calendar,
  DollarSign,
  ArrowUpRight,
  Zap,
  Coffee
} from 'lucide-react';

interface SolopreneurLayoutProps {
  post: any;
}

export default function SolopreneurLayout({ post }: SolopreneurLayoutProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const parseChange = (change: string) => {
    if (!change) return null;
    const isPositive = change.includes('+');
    const isNegative = change.includes('-');
    return { isPositive, isNegative, value: change };
  };

  return (
    <article className="min-h-screen bg-cream">
      {/* Hero Header - Gradient Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-teal via-teal-200 to-goldenrod">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-goldenrod/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-teal-300/40 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-cream/10 rounded-full blur-2xl" />
        </div>
        
        <Container>
          <div className="relative py-16 lg:py-24">
            {/* Category Badge */}
            <div className="inline-flex items-center gap-3 mb-6 bg-black/90 text-cream px-5 py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]">
              <Rocket className="w-5 h-5" />
              <span className="font-heading font-bold uppercase text-sm tracking-[0.2em]">
                Solopreneur Sundays
              </span>
            </div>
            
            {/* Week Number & Date */}
            <div className="flex flex-wrap items-end gap-6 mb-8">
              <h1 className="text-7xl lg:text-9xl font-heading font-bold uppercase leading-none text-black drop-shadow-sm">
                Week {post.weekNumber || '—'}
              </h1>
              {post.publishedAt && (
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-black/70" />
                  <time className="font-heading text-lg text-black/80 font-bold uppercase tracking-wide">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </time>
                </div>
              )}
            </div>

            {/* Title */}
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-black max-w-4xl leading-tight">
              {post.title}
            </h2>

            {/* Description */}
            {post.description && (
              <p className="mt-6 text-xl font-body text-black/80 max-w-2xl leading-relaxed">
                {post.description}
              </p>
            )}
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-16 lg:py-20 max-w-6xl mx-auto">
          
          {/* Revenue Highlight Card */}
          {post.revenue !== undefined && post.revenue !== null && (
            <div className="mb-16 relative">
              <div className="bg-black text-cream p-10 lg:p-16 border-4 border-black shadow-[8px_8px_0px_0px_rgba(78,205,196,1)]">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <DollarSign className="w-10 h-10 text-teal" />
                  <p className="font-heading uppercase text-sm tracking-[0.3em] text-teal font-bold">
                    This Week&apos;s Revenue
                  </p>
                </div>
                <p className="text-7xl lg:text-9xl font-heading font-bold text-cream text-center">
                  {formatCurrency(post.revenue)}
                </p>
                <div className="flex justify-center mt-6">
                  <div className="w-32 h-1 bg-gradient-to-r from-teal to-goldenrod" />
                </div>
              </div>
            </div>
          )}

          {/* Metrics Grid */}
          {post.metrics && post.metrics.length > 0 && (
            <div className="mb-16">
              <h3 className="font-heading font-bold uppercase text-2xl mb-8 flex items-center gap-3 text-black">
                <Zap className="w-7 h-7 text-goldenrod" />
                Key Metrics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {post.metrics.map((metric: any, i: number) => {
                  const changeInfo = parseChange(metric.change);
                  const colors = [
                    { bg: 'bg-teal', border: 'border-teal', shadow: 'shadow-[4px_4px_0px_0px_rgba(78,205,196,1)]' },
                    { bg: 'bg-goldenrod', border: 'border-goldenrod', shadow: 'shadow-[4px_4px_0px_0px_rgba(244,162,97,1)]' },
                    { bg: 'bg-red', border: 'border-red', shadow: 'shadow-[4px_4px_0px_0px_rgba(231,76,60,1)]' },
                  ];
                  const color = colors[i % colors.length];
                  
                  return (
                    <div
                      key={i}
                      className={`bg-cream border-4 border-black p-8 ${color.shadow} hover:-translate-y-1 transition-transform`}
                    >
                      <p className="font-heading uppercase text-xs tracking-[0.2em] text-black/60 mb-4 font-bold">
                        {typeof metric.label === 'string' ? metric.label : ''}
                      </p>
                      <p className="text-5xl font-heading font-bold text-black mb-3">
                        {typeof metric.value === 'string' || typeof metric.value === 'number' ? metric.value : ''}
                      </p>
                      {changeInfo && (
                        <div className={`inline-flex items-center gap-2 text-sm font-heading font-bold px-3 py-1 ${
                          changeInfo.isPositive ? 'bg-teal/20 text-teal-300' :
                          changeInfo.isNegative ? 'bg-red/20 text-red-300' : 'bg-black/10 text-black/60'
                        }`}>
                          {changeInfo.isPositive && <TrendingUp className="w-4 h-4" />}
                          {changeInfo.isNegative && <TrendingDown className="w-4 h-4" />}
                          <span>{changeInfo.value}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Wins & Challenges Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Wins */}
            {post.wins && post.wins.length > 0 && (
              <div className="bg-teal border-4 border-black p-8 lg:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-black flex items-center justify-center">
                    <Award className="w-8 h-8 text-teal" />
                  </div>
                  <h3 className="font-heading font-bold uppercase text-3xl text-black">
                    Wins
                  </h3>
                </div>
                <ul className="space-y-5">
                  {post.wins.map((win: any, i: number) => (
                    typeof win === 'string' && (
                      <li key={i} className="flex items-start gap-4 group">
                        <div className="w-8 h-8 bg-black flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-goldenrod transition-colors">
                          <Target className="w-4 h-4 text-cream" />
                        </div>
                        <span className="font-body text-lg text-black leading-relaxed">{win}</span>
                      </li>
                    )
                  ))}
                </ul>
              </div>
            )}

            {/* Challenges */}
            {post.losses && post.losses.length > 0 && (
              <div className="bg-goldenrod border-4 border-black p-8 lg:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-black flex items-center justify-center">
                    <AlertCircle className="w-8 h-8 text-goldenrod" />
                  </div>
                  <h3 className="font-heading font-bold uppercase text-3xl text-black">
                    Challenges
                  </h3>
                </div>
                <ul className="space-y-5">
                  {post.losses.map((loss: any, i: number) => (
                    typeof loss === 'string' && (
                      <li key={i} className="flex items-start gap-4 group">
                        <div className="w-8 h-8 bg-black flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-red transition-colors">
                          <Coffee className="w-4 h-4 text-cream" />
                        </div>
                        <span className="font-body text-lg text-black leading-relaxed">{loss}</span>
                      </li>
                    )
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Body Content / Insights Section */}
          {post.body && (
            <div className="mb-16 bg-cream border-4 border-black p-8 lg:p-12 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="font-heading font-bold uppercase text-3xl mb-10 text-black flex items-center gap-4">
                <span className="w-2 h-10 bg-gradient-to-b from-teal to-goldenrod" />
                Insights & Lessons
              </h3>
              <div className="
                font-body text-lg text-black/90 leading-relaxed
                [&_h1]:font-heading [&_h1]:font-bold [&_h1]:uppercase [&_h1]:text-4xl [&_h1]:text-black [&_h1]:mt-10 [&_h1]:mb-6
                [&_h2]:font-heading [&_h2]:font-bold [&_h2]:uppercase [&_h2]:text-3xl [&_h2]:text-black [&_h2]:mt-10 [&_h2]:mb-6
                [&_h3]:font-heading [&_h3]:font-bold [&_h3]:uppercase [&_h3]:text-2xl [&_h3]:text-black [&_h3]:mt-8 [&_h3]:mb-4
                [&_h4]:font-heading [&_h4]:font-bold [&_h4]:uppercase [&_h4]:text-xl [&_h4]:text-black [&_h4]:mt-6 [&_h4]:mb-4
                [&_p]:mb-6 [&_p]:leading-relaxed
                [&_a]:text-teal-300 [&_a]:font-bold [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-red
                [&_strong]:text-black [&_strong]:font-bold
                [&_em]:italic
                [&_code]:bg-black [&_code]:text-teal [&_code]:px-2 [&_code]:py-1 [&_code]:font-body [&_code]:text-sm
                [&_blockquote]:border-l-4 [&_blockquote]:border-teal [&_blockquote]:pl-6 [&_blockquote]:py-2 [&_blockquote]:my-8 [&_blockquote]:bg-teal/10 [&_blockquote]:italic [&_blockquote]:text-black/80
                [&_ul]:my-6 [&_ul]:ml-0 [&_ul]:space-y-3
                [&_ol]:my-6 [&_ol]:ml-0 [&_ol]:space-y-3 [&_ol]:list-decimal [&_ol]:list-inside
                [&_li]:flex [&_li]:items-start [&_li]:gap-3
                [&_ul_li]:before:content-['→'] [&_ul_li]:before:text-teal [&_ul_li]:before:font-bold [&_ul_li]:before:flex-shrink-0
                [&_img]:my-8 [&_img]:border-4 [&_img]:border-black [&_img]:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
              ">
                <PortableText content={post.body} />
              </div>
            </div>
          )}

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="mb-16">
              <div className="relative border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden aspect-video">
                <Image
                  src={urlFor(post.featuredImage).width(1200).height(675).url()}
                  alt={post.featuredImage.alt || post.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* CTA Button */}
          {post.ctaLink && (
            <div className="text-center mb-16">
              <a
                href={post.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-5 bg-black text-cream hover:bg-teal hover:text-black border-4 border-black font-heading font-bold uppercase text-xl shadow-[6px_6px_0px_0px_rgba(78,205,196,1)] hover:shadow-[6px_6px_0px_0px_rgba(244,162,97,1)] hover:-translate-y-1 transition-all"
              >
                {post.ctaText || 'Learn More'}
                <ArrowUpRight className="w-6 h-6" />
              </a>
            </div>
          )}

          {/* Footer Note */}
          <div className="pt-10 border-t-4 border-black text-center">
            <div className="inline-flex items-center gap-4 bg-gradient-to-r from-teal to-goldenrod px-8 py-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Rocket className="w-6 h-6 text-black" />
              <p className="font-heading font-bold uppercase text-sm tracking-widest text-black">
                Building in public, one week at a time
              </p>
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
}
