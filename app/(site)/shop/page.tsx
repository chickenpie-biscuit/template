import Container from '@/components/ui/Container';
import Link from 'next/link';
import { ArrowRight, Package, ShoppingBag } from 'lucide-react';

const categories = ['All', 'Digital', 'Merchandise', 'Print', 'Download'];

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)]">
      {/* HERO */}
      <section className="py-24 lg:py-32 border-b-2 border-black">
        <Container>
          <div className="flex items-baseline gap-6 mb-8">
            <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-black/40">Shop</span>
          </div>
          <h1 className="text-6xl lg:text-9xl font-heading font-bold uppercase mb-8 leading-[0.9] tracking-tight">
            Shop.
          </h1>
          <p className="font-body text-xl text-black/60 max-w-lg leading-relaxed">
            This page is for template demo purposes. Connect Sanity CMS + Stripe to enable real products.
          </p>
        </Container>
      </section>

      {/* CATEGORY FILTERS */}
      <div className="sticky top-20 z-30 bg-[var(--color-bg)]/95 backdrop-blur-sm border-b-2 border-black py-4">
        <Container>
          <div className="flex gap-6 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <span
                key={cat}
                className="font-heading font-bold uppercase text-sm tracking-wider whitespace-nowrap text-black/40 hover:text-black transition-colors cursor-pointer"
              >
                {cat}
              </span>
            ))}
          </div>
        </Container>
      </div>

      {/* PLACEHOLDER GRID */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="border-2 border-black bg-white">
                <div className="aspect-[3/4] bg-cream-200 flex items-center justify-center border-b-2 border-black relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-cream-200 via-white to-cream-200 shimmer" />
                  <div className="relative z-10 flex flex-col items-center text-center">
                    {i % 3 === 0 ? (
                      <Package size={32} className="text-black/20 mb-2" />
                    ) : (
                      <ShoppingBag size={32} className="text-black/20 mb-2" />
                    )}
                    <span className="font-pixel text-[8px] text-black/30">NXT</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="h-3 bg-cream-200 rounded w-20 mb-2" />
                  <div className="h-5 bg-cream-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-cream-200 rounded w-1/3 mb-4" />
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-black text-white font-heading font-bold uppercase text-xs flex-1">
                      View
                    </button>
                    <button className="px-4 py-2 border-2 border-black font-heading font-bold uppercase text-xs">
                      Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center font-body text-sm text-black/40 mt-12 uppercase tracking-widest">
            Connect Sanity CMS to enable real products
          </p>
        </Container>
      </section>

      {/* CMS PROMPT */}
      <section className="py-16 bg-black text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading font-bold uppercase text-3xl mb-4">Enable the Shop</h2>
            <p className="font-body text-white/60 mb-8">
              Add your Sanity project ID to .env.local to populate products. Add Stripe keys to enable checkout.
            </p>
            <div className="border border-white/20 p-6 text-left font-mono text-sm space-y-2">
              <div className="text-white/40"># .env.local</div>
              <div><span className="text-[var(--color-accent)]">SANITY_PROJECT_ID</span>=your_id</div>
              <div><span className="text-[var(--color-accent)]">STRIPE_SECRET_KEY</span>=sk_...</div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}