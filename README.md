# NXT Web Template

A production-ready Next.js 14 + Sanity CMS template. Built for fast reskinning and easy deployment.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy env and fill in your values
cp .env.local.example .env.local

# 3. Run dev server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Reskinning (No Code Required)

Edit `config/site.ts` to change:
- **Brand name, tagline, description**
- **Navigation links**
- **Colors** (primary, accent, surface, etc.)
- **Fonts** (any Google Font)
- **Hero content**
- **Feature list**
- **Footer links**

The entire CSS variable system at `:root` in `app/globals.css` mirrors the config — change one, the other updates.

## Adding Content (Sanity CMS)

1. Create a project at [sanity.io](https://sanity.io)
2. Add your `SANITY_PROJECT_ID` to `.env.local`
3. Visit `/studio` to manage content

If Sanity is not configured, the site renders without dynamic content and all CMS calls fail gracefully.

## Tech Stack

- **Next.js 14** — App Router, TypeScript
- **Tailwind CSS** — Utility-first styling
- **GSAP + Lenis** — Scroll animations and smooth scroll
- **Framer Motion** — UI animations
- **Sanity CMS** — Optional headless CMS (graceful fallback)
- **Stripe + PayPal** — Optional e-commerce (requires env vars)
- **Resend** — Optional transactional email (requires env var)

## Deploy to Vercel

```bash
npm run build
vercel --prod
```

Or push to GitHub and connect to Vercel — the `vercel.json` is already configured.

## Project Structure

```
├── app/
│   ├── (site)/          # Main site pages (home, blog, shop, etc.)
│   ├── api/             # API routes (contact, subscribe, checkout)
│   └── layout.tsx       # Root layout
├── components/          # UI components (ui, cart, seo, etc.)
├── config/
│   └── site.ts          # ← Edit this file to reskin
├── lib/                 # Utilities (sanity client, stripe, resend, etc.)
├── public/              # Static assets
└── sanity/              # Sanity schema and studio
```

## Customizing Pages

Pages live in `app/(site)/`:
- `page.tsx` — Homepage
- `blog/page.tsx` — Blog listing
- `blog/[slug]/page.tsx` — Blog post
- `shop/page.tsx` — Shop listing
- `shop/[slug]/page.tsx` — Product page
- `about/page.tsx`, `contact/page.tsx`, etc.

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `SANITY_PROJECT_ID` | No | Sanity project ID (enables CMS) |
| `SANITY_DATASET` | No | Sanity dataset (default: production) |
| `RESEND_API_KEY` | No | Resend API key (enables transactional email) |
| `PAYPAL_CLIENT_ID` | No | PayPal client ID (enables PayPal checkout) |
| `STRIPE_SECRET_KEY` | No | Stripe secret key (enables Stripe checkout) |

Without any env vars, the template builds and runs in standalone static/ISR mode.