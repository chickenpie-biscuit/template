'use client';

import Container from '@/components/ui/Container';
import PortableText from '@/components/sanity/PortableText';
import { TrendingUp, TrendingDown, Target, Award, AlertCircle, BarChart3 } from 'lucide-react';

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
    <article className="min-h-screen bg-black text-cream">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal to-goldenrod border-b-2 border-cream">
        <Container>
          <div className="py-12 lg:py-16">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-8 h-8 text-black" />
              <span className="font-heading font-bold uppercase text-sm tracking-[0.3em] text-black">
                Solopreneur Sundays
              </span>
            </div>
            
            <div className="flex items-baseline gap-4 mb-6">
              <h1 className="text-5xl lg:text-7xl font-heading font-bold uppercase leading-none text-black">
                Week {post.weekNumber || '—'}
              </h1>
              {post.publishedAt && (
                <time className="font-heading text-lg text-black/70">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </time>
              )}
            </div>

            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-black/90 max-w-3xl">
              {post.title}
            </h2>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-16 lg:py-24 max-w-6xl mx-auto">
          {/* Revenue Highlight */}
          {post.revenue !== undefined && post.revenue !== null && (
            <div className="mb-16 bg-gradient-to-br from-teal/20 to-goldenrod/20 border-2 border-teal p-12 text-center">
              <p className="font-heading uppercase text-xs tracking-[0.3em] text-teal mb-4">
                This Week&apos;s Revenue
              </p>
              <p className="text-7xl lg:text-8xl font-heading font-bold text-cream mb-2">
                {formatCurrency(post.revenue)}
              </p>
              <div className="w-24 h-1 bg-teal mx-auto" />
            </div>
          )}

          {/* Metrics Grid */}
          {post.metrics && post.metrics.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {post.metrics.map((metric: any, i: number) => {
                const changeInfo = parseChange(metric.change);
                return (
                  <div
                    key={i}
                    className="bg-cream/5 border-2 border-cream/20 p-6 hover:border-teal transition-colors"
                  >
                    <p className="font-heading uppercase text-xs tracking-widest text-cream/60 mb-3">
                      {metric.label}
                    </p>
                    <p className="text-4xl font-heading font-bold text-cream mb-2">
                      {metric.value}
                    </p>
                    {changeInfo && (
                      <div className={`flex items-center gap-2 text-sm font-heading ${
                        changeInfo.isPositive ? 'text-teal' :
                        changeInfo.isNegative ? 'text-red' : 'text-cream/60'
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
          )}

          {/* Wins & Losses */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Wins */}
            {post.wins && post.wins.length > 0 && (
              <div className="bg-teal/10 border-2 border-teal p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Award className="w-8 h-8 text-teal" />
                  <h3 className="font-heading font-bold uppercase text-2xl text-cream">
                    Wins
                  </h3>
                </div>
                <ul className="space-y-4">
                  {post.wins.map((win: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <Target className="w-5 h-5 text-teal mt-1 flex-shrink-0" />
                      <span className="font-body text-lg text-cream/90">{win}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Losses/Challenges */}
            {post.losses && post.losses.length > 0 && (
              <div className="bg-red/10 border-2 border-red p-8">
                <div className="flex items-center gap-3 mb-6">
                  <AlertCircle className="w-8 h-8 text-red" />
                  <h3 className="font-heading font-bold uppercase text-2xl text-cream">
                    Challenges
                  </h3>
                </div>
                <ul className="space-y-4">
                  {post.losses.map((loss: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red rounded-full mt-3 flex-shrink-0" />
                      <span className="font-body text-lg text-cream/90">{loss}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Insights & Story */}
          {post.body && (
            <div className="bg-cream/5 border-2 border-cream/20 p-8 lg:p-12">
              <h3 className="font-heading font-bold uppercase text-3xl mb-8 text-cream flex items-center gap-3">
                <span className="w-1 h-8 bg-goldenrod" />
                Insights & Lessons
              </h3>
              <div className="prose prose-lg prose-invert max-w-none font-body
                prose-headings:font-heading prose-headings:font-bold prose-headings:uppercase prose-headings:text-cream
                prose-p:text-cream/80 prose-p:leading-relaxed
                prose-a:text-teal prose-a:font-bold hover:prose-a:underline
                prose-strong:text-cream prose-strong:font-bold
                prose-ul:text-cream/80 prose-ol:text-cream/80">
                <PortableText content={post.body} />
              </div>
            </div>
          )}

          {/* CTA Button */}
          {post.ctaLink && (
            <div className="mt-16 text-center">
              <a
                href={post.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-4 bg-teal text-black hover:bg-goldenrod hover:text-black border-2 border-teal hover:border-goldenrod font-heading font-bold uppercase text-lg shadow-[4px_4px_0px_0px_rgba(0,221,221,0.3)] hover:shadow-[6px_6px_0px_0px_rgba(218,165,32,0.3)] hover:-translate-y-0.5 transition-all"
              >
                {post.ctaText || 'Learn More'}
              </a>
            </div>
          )}

          {/* Footer Note */}
          <div className="mt-12 pt-8 border-t-2 border-cream/10 text-center">
            <p className="font-body text-cream/60 italic">
              Building in public, one week at a time. Follow the journey.
            </p>
          </div>
        </div>
      </Container>
    </article>
  );
}

