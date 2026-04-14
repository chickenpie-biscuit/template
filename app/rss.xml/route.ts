import { client } from '@/sanity/lib/client';

export const revalidate = 3600;

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://template.dev';

  let posts: any[] = [];

  try {
    posts = await client?.fetch(`
      *[_type in ["feedPost", "post"]] | order(publishedAt desc)[0...50] {
        title,
        "slug": slug.current,
        description,
        excerpt,
        publishedAt,
        _type,
        category
      }
    `) ?? [];
  } catch {
    posts = [];
  }

  const items = posts
    .map((post) => {
      const link = post._type === 'post'
        ? `${siteUrl}/blog/${post.slug}`
        : `${siteUrl}/feed/${post.slug}`;
      const description = post.description || post.excerpt || post.title;
      const pubDate = post.publishedAt
        ? new Date(post.publishedAt).toUTCString()
        : new Date().toUTCString();

      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${link}</link>
      <description><![CDATA[${description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <guid isPermaLink="true">${link}</guid>
    </item>`;
    })
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>NXT Template</title>
    <link>${siteUrl}</link>
    <description>A creative studio and lifestyle brand blurring the lines between work and play.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
