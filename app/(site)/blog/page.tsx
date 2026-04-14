import Container from '@/components/ui/Container';

export default function BlogPage() {
  const posts = [
    { title: 'Template Post: Getting Started', excerpt: 'A quick guide to reskinning this template and deploying your first site.', date: '2026-04-01' },
    { title: 'Template Post: Connecting Sanity CMS', excerpt: 'How to set up your Sanity project and populate content across all pages.', date: '2026-03-28' },
    { title: 'Template Post: Customizing the Design', excerpt: 'Edit config/site.ts and globals.css to completely transform the visual identity.', date: '2026-03-20' },
  ];

  return (
    <main className="min-h-screen bg-[var(--color-bg)]">
      {/* HERO */}
      <section className="py-24 lg:py-32 border-b-2 border-black">
        <Container>
          <div className="flex items-baseline gap-6 mb-8">
            <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-black/40">Blog</span>
          </div>
          <h1 className="text-6xl lg:text-9xl font-heading font-bold uppercase mb-8 leading-[0.9] tracking-tight">
            Blog.
          </h1>
          <p className="font-body text-xl text-black/60 max-w-lg leading-relaxed">
            Template demo posts. Connect Sanity CMS to enable real blog content.
          </p>
        </Container>
      </section>

      {/* POSTS GRID */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <article key={i} className="border-2 border-black">
                <div className="aspect-[16/9] bg-cream-200 border-b-2 border-black flex items-center justify-center">
                  <span className="font-pixel text-[10px] text-black/20">NXT</span>
                </div>
                <div className="p-6">
                  <p className="font-body text-xs text-black/40 uppercase tracking-widest mb-3">{post.date}</p>
                  <h2 className="font-heading font-bold uppercase text-xl mb-3">{post.title}</h2>
                  <p className="font-body text-sm text-black/60 mb-6">{post.excerpt}</p>
                  <button className="px-6 py-3 bg-black text-white font-heading font-bold uppercase text-xs hover:bg-[var(--color-accent)] transition-colors">
                    Read More
                  </button>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* CMS PROMPT */}
      <section className="py-12 bg-white border-t-2 border-black">
        <Container>
          <div className="text-center">
            <p className="font-body text-sm text-black/40 uppercase tracking-widest">
              Add SANITY_PROJECT_ID to .env.local to populate real blog posts
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}