'use client';

import { useState } from 'react';

interface NewsletterSignupProps {
  source: 'header' | 'feed-banner' | 'contact' | 'footer';
  variant?: 'inline' | 'banner' | 'card';
  className?: string;
}

export default function NewsletterSignup({ source, variant = 'inline', className = '' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'exists'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      });

      const data = await response.json();

      if (response.status === 409) {
        setStatus('exists');
      } else if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }

      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  if (variant === 'banner') {
    return (
      <section className={`bg-black text-cream border-y-2 border-black ${className}`}>
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-16 text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold uppercase mb-4 tracking-tight">
            Join the Flock 🐔
          </h2>
          <p className="font-body text-sm md:text-base text-cream/70 max-w-lg mx-auto mb-8">
            Get weekly updates on our journey with AI — what we&apos;re building, breaking, and learning along the way.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-4 py-3 bg-cream/10 border-2 border-cream/30 text-cream font-body text-sm placeholder:text-cream/40 focus:outline-none focus:border-cream transition-colors"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3 bg-red text-cream border-2 border-red font-heading font-bold uppercase text-sm hover:bg-red-300 transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              {status === 'loading' ? '...' : 'Subscribe'}
            </button>
          </form>
          <StatusMessage status={status} />
        </div>
      </section>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`bg-cream border-2 border-black p-8 ${className}`}>
        <h3 className="text-xl font-heading font-bold uppercase mb-2">
          Join the Flock 🐔
        </h3>
        <p className="font-body text-sm text-black/60 mb-6">
          Weekly updates on our AI journey. No spam.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="w-full px-0 py-3 bg-transparent border-b-2 border-black font-body text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-red transition-colors"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full px-6 py-3 bg-black text-cream border-2 border-black font-heading font-bold uppercase text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50"
          >
            {status === 'loading' ? 'Joining...' : 'Subscribe'}
          </button>
        </form>
        <StatusMessage status={status} />
      </div>
    );
  }

  // inline variant (for header)
  return (
    <form onSubmit={handleSubmit} className={`flex items-center gap-2 ${className}`}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="w-40 lg:w-48 px-3 py-2 bg-transparent border-2 border-black font-body text-xs text-black placeholder:text-black/40 focus:outline-none focus:border-red transition-colors"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-4 py-2 bg-red text-cream border-2 border-red font-heading font-bold uppercase text-xs hover:bg-red-300 transition-colors disabled:opacity-50 whitespace-nowrap"
      >
        {status === 'loading' ? '...' : 'Join'}
      </button>
      {status !== 'idle' && status !== 'loading' && (
        <span className={`text-xs font-body ${status === 'success' ? 'text-teal-300' : status === 'exists' ? 'text-goldenrod' : 'text-red'}`}>
          {status === 'success' ? '✓' : status === 'exists' ? '♥' : '✗'}
        </span>
      )}
    </form>
  );
}

function StatusMessage({ status }: { status: string }) {
  if (status === 'idle' || status === 'loading') return null;

  const messages: Record<string, { text: string; color: string }> = {
    success: { text: "You're in! Check your inbox for a welcome from the flock.", color: 'text-teal' },
    exists: { text: "You're already part of the flock! ♥", color: 'text-goldenrod' },
    error: { text: 'Something went wrong. Try again?', color: 'text-red' },
  };

  const msg = messages[status];
  if (!msg) return null;

  return (
    <p className={`font-body text-sm mt-3 ${msg.color}`}>
      {msg.text}
    </p>
  );
}
