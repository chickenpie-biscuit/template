'use client';

import { useState } from 'react';
import Container from '@/components/ui/Container';
import { Rss, ShoppingBag, Mail, Send, Users, Eye, Edit3, TrendingUp, Clock } from 'lucide-react';
import { siteConfig } from '@/config/site';

const tabs = [
  { id: 'publish', label: 'Publish', icon: Rss },
  { id: 'shop', label: 'Shop', icon: ShoppingBag },
  { id: 'newsletter', label: 'Newsletter', icon: Mail },
];

const mockPosts = [
  { id: 1, title: 'Getting Started with Next.js 14 App Router', status: 'Published', date: 'Apr 10, 2026', views: 1240, slug: 'getting-started-nextjs-14' },
  { id: 2, title: 'Tailwind CSS Variables for Rapid Reskinning', status: 'Published', date: 'Apr 8, 2026', views: 892, slug: 'tailwind-css-variables' },
  { id: 3, title: 'Setting Up Sanity CMS in 10 Minutes', status: 'Draft', date: 'Apr 12, 2026', views: 0, slug: 'sanity-cms-setup' },
  { id: 4, title: 'Deploy to Vercel Like a Pro', status: 'Draft', date: 'Apr 14, 2026', views: 0, slug: 'vercel-deploy-guide' },
];

const mockProducts = [
  { id: 1, name: 'NXT Web Template', price: 79, status: 'Active', stock: 99, slug: 'nxt-web-template' },
  { id: 2, name: 'UI Component Kit', price: 49, status: 'Active', stock: 99, slug: 'ui-component-kit' },
  { id: 3, name: 'GSAP Animation Pack', price: 39, status: 'Draft', stock: 0, slug: 'gsap-animation-pack' },
  { id: 4, name: 'Icon Bundle — 500+ Icons', price: 29, status: 'Active', stock: 99, slug: 'icon-bundle' },
];

const mockSubscribers = [
  { email: 'marcus@designstudio.io', joined: 'Apr 1, 2026' },
  { email: 'kei.tech@outlook.com', joined: 'Apr 3, 2026' },
  { email: 'anna@freelance.dev', joined: 'Apr 5, 2026' },
  { email: 'dev.pilar@gmail.com', joined: 'Apr 7, 2026' },
  { email: 'ray@webcraft.co', joined: 'Apr 9, 2026' },
];

const statusColors: Record<string, string> = {
  Published: 'bg-green-100 text-green-700',
  Draft: 'bg-yellow-100 text-yellow-700',
  Active: 'bg-green-100 text-green-700',
};

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState('publish');

  return (
    <main className="min-h-screen bg-[var(--color-bg)]">
      {/* HERO */}
      <section className="py-24 lg:py-40 border-b-2 border-black">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="flex items-baseline gap-6 mb-12">
              <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-black/40">Studio</span>
              <h1 className="font-heading text-7xl md:text-9xl font-bold text-black">Feed Studio</h1>
            </div>
            <p className="text-xl text-black/60 max-w-2xl leading-relaxed">
              Central hub for managing all your content — posts, products, and subscriber communications. Connect your CMS to enable live data.
            </p>
          </div>
        </Container>
      </section>

      {/* RESTRICTED BANNER */}
      <section className="py-3 bg-yellow-100 border-b-2 border-black">
        <Container>
          <p className="text-center text-sm font-mono text-black/60">
            This page is part of a template demo — CMS content is illustrative placeholder data
          </p>
        </Container>
      </section>

      {/* TABS + CONTENT */}
      <section className="py-16">
        <Container>
          <div className="max-w-5xl mx-auto">

            {/* Tab bar */}
            <div className="flex gap-0 border-b-2 border-black mb-12">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-8 py-4 font-heading font-bold text-sm uppercase tracking-wider border-r-2 border-black transition-colors ${
                      activeTab === tab.id
                        ? 'bg-black text-white'
                        : 'bg-white text-black hover:bg-black/5'
                    }`}
                  >
                    <Icon size={16} strokeWidth={2.5} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* PUBLISH TAB */}
            {activeTab === 'publish' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-black mb-1">Blog Posts</h2>
                    <p className="text-black/50 text-sm">{mockPosts.length} total · {mockPosts.filter(p => p.status === 'Published').length} published</p>
                  </div>
                  <button className="flex items-center gap-2 bg-black text-white px-6 py-3 font-heading font-bold text-sm uppercase tracking-wider hover:bg-black/80 transition-colors">
                    <Edit3 size={14} />
                    New Post
                  </button>
                </div>

                <div className="overflow-x-auto -mx-6 px-6">
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr className="border-b-2 border-black bg-black/5">
                        <th className="text-left px-6 py-4 font-heading text-xs uppercase tracking-wider text-black/60">Title</th>
                        <th className="text-left px-6 py-4 font-heading text-xs uppercase tracking-wider text-black/60">Status</th>
                        <th className="text-left px-6 py-4 font-heading text-xs uppercase tracking-wider text-black/60">Date</th>
                        <th className="text-left px-6 py-4 font-heading text-xs uppercase tracking-wider text-black/60">Views</th>
                        <th className="text-right px-6 py-4 font-heading text-xs uppercase tracking-wider text-black/60">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockPosts.map((post) => (
                        <tr key={post.id} className="border-b border-black/10 hover:bg-black/5 transition-colors">
                          <td className="px-6 py-5">
                            <div className="font-bold text-black">{post.title}</div>
                            <div className="text-xs text-black/40 font-mono mt-1">/{post.slug}</div>
                          </td>
                          <td className="px-6 py-5">
                            <span className={`inline-block px-3 py-1 rounded-full font-heading text-xs font-bold uppercase ${statusColors[post.status]}`}>
                              {post.status}
                            </span>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-2 text-sm text-black/60">
                              <Clock size={12} />
                              {post.date}
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-2 text-sm text-black/60">
                              <Eye size={12} />
                              {post.views.toLocaleString()}
                            </div>
                          </td>
                          <td className="px-6 py-5 text-right">
                            <button className="text-xs font-bold uppercase tracking-wider hover:underline">Edit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="text-xs text-black/40 font-mono text-center">
                  Connect Sanity CMS to enable live post management
                </p>
              </div>
            )}

            {/* SHOP TAB */}
            {activeTab === 'shop' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-black mb-1">Products</h2>
                    <p className="text-black/50 text-sm">{mockProducts.length} products · {mockProducts.filter(p => p.status === 'Active').length} active</p>
                  </div>
                  <button className="flex items-center gap-2 bg-black text-white px-6 py-3 font-heading font-bold text-sm uppercase tracking-wider hover:bg-black/80 transition-colors">
                    <Edit3 size={14} />
                    Add Product
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockProducts.map((product) => (
                    <div key={product.id} className="border-2 border-black p-6 hover:bg-black/5 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-black text-lg">{product.name}</h3>
                          <p className="text-2xl font-mono font-bold text-black mt-1">${product.price}</p>
                        </div>
                        <span className={`inline-block px-3 py-1 rounded-full font-heading text-xs font-bold uppercase ${statusColors[product.status]}`}>
                          {product.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-black/50">
                        <TrendingUp size={12} />
                        <span>{product.stock === 99 ? 'Unlimited' : `${product.stock} in stock`}</span>
                        <span className="mx-2">·</span>
                        <span className="font-mono text-xs">/{product.slug}</span>
                      </div>
                      <div className="mt-4 pt-4 border-t border-black/10 flex gap-3">
                        <button className="text-xs font-bold uppercase tracking-wider hover:underline">Edit</button>
                        <button className="text-xs font-bold uppercase tracking-wider hover:underline text-black/40">Preview</button>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-black/40 font-mono text-center">
                  Add Stripe + PayPal env vars to enable checkout
                </p>
              </div>
            )}

            {/* NEWSLETTER TAB */}
            {activeTab === 'newsletter' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-black mb-1">Newsletter</h2>
                    <p className="text-black/50 text-sm">{mockSubscribers.length} subscribers</p>
                  </div>
                  <button className="flex items-center gap-2 bg-black text-white px-6 py-3 font-heading font-bold text-sm uppercase tracking-wider hover:bg-black/80 transition-colors">
                    <Send size={14} />
                    Send Broadcast
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 border-2 border-black">
                  <div className="p-8 border-r-2 border-black text-center">
                    <div className="flex items-center justify-center mb-3">
                      <Users size={24} className="text-black/40" />
                    </div>
                    <div className="text-4xl font-mono font-bold text-black">{mockSubscribers.length}</div>
                    <div className="text-xs uppercase tracking-wider text-black/40 font-heading mt-1">Subscribers</div>
                  </div>
                  <div className="p-8 border-r-2 border-black text-center">
                    <div className="flex items-center justify-center mb-3">
                      <Send size={24} className="text-black/40" />
                    </div>
                    <div className="text-4xl font-mono font-bold text-black">0</div>
                    <div className="text-xs uppercase tracking-wider text-black/40 font-heading mt-1">Sent</div>
                  </div>
                  <div className="p-8 text-center">
                    <div className="flex items-center justify-center mb-3">
                      <TrendingUp size={24} className="text-black/40" />
                    </div>
                    <div className="text-4xl font-mono font-bold text-black">—</div>
                    <div className="text-xs uppercase tracking-wider text-black/40 font-heading mt-1">Open Rate</div>
                  </div>
                </div>

                {/* Subscriber list */}
                <div className="border-2 border-black">
                  <div className="border-b-2 border-black bg-black/5 px-6 py-4">
                    <h3 className="font-heading text-xs uppercase tracking-wider text-black/60">Recent Subscribers</h3>
                  </div>
                  <div className="divide-y divide-black/10">
                    {mockSubscribers.map((sub, i) => (
                      <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-black/5 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center font-mono text-xs font-bold text-black/40">
                            {sub.email[0].toUpperCase()}
                          </div>
                          <span className="font-mono text-sm text-black">{sub.email}</span>
                        </div>
                        <span className="text-xs text-black/40 font-mono">Joined {sub.joined}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-black/40 font-mono text-center">
                  Add Resend API key to enable email broadcasts
                </p>
              </div>
            )}

          </div>
        </Container>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-20 border-t-2 border-black">
        <Container>
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-black/40 font-heading mb-2">Template Demo</p>
              <p className="text-2xl font-bold text-black">Connect your CMS to go live</p>
            </div>
            <button className="bg-black text-white px-8 py-4 font-heading font-bold text-sm uppercase tracking-wider hover:bg-black/80 transition-colors">
              Configure Sanity CMS
            </button>
          </div>
        </Container>
      </section>
    </main>
  );
}