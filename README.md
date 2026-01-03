# Next.js 14 + Sanity CMS Template

A modern, production-ready template for building websites with Next.js 14 (App Router) and Sanity CMS. This template includes e-commerce functionality, blog capabilities, and a complete content management system.

## Features

- ✅ Next.js 14 with App Router
- ✅ TypeScript
- ✅ TailwindCSS for styling
- ✅ Sanity CMS integration
- ✅ E-commerce shop with cart functionality
- ✅ Blog system
- ✅ Dynamic pages
- ✅ Zustand for state management
- ✅ Stripe integration ready
- ✅ Responsive design
- ✅ SEO optimized
- ✅ Image optimization with next-sanity

## Project Structure

```
/app
  /studio          # Sanity Studio route
  /api             # API routes
  /(site)          # Main site pages
    /shop          # E-commerce pages
    /blog          # Blog pages
    /[slug]        # Dynamic pages

/sanity
  /lib             # Sanity client and utilities
  /schemas         # Sanity schemas

/components
  /ui              # UI components
  /cart            # Cart components
  /sanity          # Sanity-specific components

/lib               # Utilities and stores
/types             # TypeScript types
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A Sanity account (free tier works)

### Installation

1. **Clone or copy this template**

2. **Install dependencies**

```bash
npm install
```

3. **Set up Sanity**

First, create a new Sanity project:

```bash
npx sanity init
```

Follow the prompts to:
- Create a new project or link to existing
- Choose dataset name (default: `production`)
- Configure project

4. **Configure environment variables**

Create a `.env.local` file in the root directory with the following variables:

```env
# Required: Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=your-read-token

# Optional: Stripe Configuration (for e-commerce payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_SECRET_KEY=your-stripe-secret-key

# Optional: Sanity Revalidation (for draft mode)
SANITY_REVALIDATE_SECRET=your-revalidate-secret
```

**To get your Sanity credentials:**
- **Project ID**: Found in your [Sanity project dashboard](https://sanity.io/manage)
- **Read Token**: Go to Sanity Manage → API → Tokens → Create token with **Read** permissions
- **Dataset**: Usually `production` (or `development` if you're using a dev dataset)

**Note:** The `.env.local` file is automatically ignored by git. Never commit your actual tokens to version control.

5. **Deploy Sanity schemas**

The schemas are already configured. To deploy them to your Sanity project:

```bash
npx sanity schema deploy
```

Or use the Sanity Studio (see below).

6. **Run the development server**

```bash
npm run dev
```

7. **Access Sanity Studio**

Navigate to `http://localhost:3000/studio` to access the Sanity Studio and start adding content.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Sanity Schemas

The template includes the following content types:

- **Page** - Dynamic pages with SEO
- **Post** - Blog posts with categories
- **Product** - E-commerce products
- **Category** - Product/blog categories
- **Ad Banner** - Advertisement banners

All schemas are located in `/sanity/schemas/`.

## Content Management

### Adding Content

1. Access Sanity Studio at `/studio`
2. Create new documents for Pages, Posts, Products, etc.
3. Content will automatically appear on your site

### Preview Mode

The template includes draft mode support. To enable:

1. Set `SANITY_REVALIDATE_SECRET` in your environment
2. Access `/api/draft?secret=YOUR_SECRET&slug=page-slug`

## E-commerce Features

- Shopping cart with Zustand
- Product listings
- Product detail pages
- Category filtering
- Cart persistence (localStorage)
- Stripe integration ready

## Blog Features

- Blog post listings
- Individual post pages
- Category filtering
- Featured posts
- Related posts

## Styling

The template uses TailwindCSS with a custom color scheme:

- Primary: Blue (`#3b82f6`)
- Secondary: Purple (`#8b5cf6`)

Customize colors in `tailwind.config.ts`.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

1. Build the project: `npm run build`
2. Start the server: `npm start`
3. Ensure all environment variables are set

### Sanity Studio Deployment

The Sanity Studio is embedded in the Next.js app at `/studio`. No separate deployment needed.

## Customization

### Branding

- Update site name in `components/ui/Header.tsx`
- Update footer in `components/ui/Footer.tsx`
- Add your logo to `/public/images/logo.svg`
- Add a placeholder image to `/public/images/placeholder.jpg` (used when product/blog images are missing)

### Colors

Edit `tailwind.config.ts` to customize the color scheme.

### Content Types

Add new schemas in `/sanity/schemas/documents/` and export them in `/sanity/schemas/index.ts`.

## Troubleshooting

### Sanity Client Errors

- Verify your `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
- Check that your dataset name matches
- Ensure your API token has read permissions

### Image Issues

- Verify Sanity image domains in `next.config.js`
- Check that images are properly uploaded in Sanity Studio

### Build Errors

- Run `npm run lint` to check for issues
- Ensure all environment variables are set
- Check that all imports are correct

## Support

For issues and questions:
- Check the [Next.js documentation](https://nextjs.org/docs)
- Check the [Sanity documentation](https://www.sanity.io/docs)
- Review the code comments in the template

## License

This template is provided as-is for use in your projects.

## Next Steps

1. Customize the branding and colors
2. Add your content in Sanity Studio
3. Configure Stripe for payments
4. Add your own custom pages and components
5. Deploy to production

Happy building! 🚀

