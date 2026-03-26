'use client';

import { useState } from 'react';
import { Link2, Twitter, Linkedin, Check } from 'lucide-react';

interface ShareButtonsProps {
  url: string;
  title: string;
  className?: string;
}

export default function ShareButtons({ url, title, className = '' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const buttons = [
    {
      label: copied ? 'Copied!' : 'Copy Link',
      icon: copied ? <Check size={16} /> : <Link2 size={16} />,
      onClick: copyLink,
    },
    {
      label: 'Twitter',
      icon: <Twitter size={16} />,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      label: 'LinkedIn',
      icon: <Linkedin size={16} />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
  ];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="font-heading text-xs uppercase tracking-widest text-black/40">
        Share
      </span>
      {buttons.map((btn) =>
        'href' in btn && btn.href ? (
          <a
            key={btn.label}
            href={btn.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 border-2 border-black/20 text-black/60 font-body text-xs uppercase hover:border-black hover:text-black transition-colors"
            aria-label={btn.label}
          >
            {btn.icon}
          </a>
        ) : (
          <button
            key={btn.label}
            onClick={btn.onClick}
            className={`flex items-center gap-2 px-3 py-2 border-2 font-body text-xs uppercase transition-colors ${
              copied
                ? 'border-teal text-teal'
                : 'border-black/20 text-black/60 hover:border-black hover:text-black'
            }`}
            aria-label={btn.label}
          >
            {btn.icon}
          </button>
        )
      )}
    </div>
  );
}
