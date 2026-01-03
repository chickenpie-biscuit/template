# Chickenpie Standalone Studio

This is a standalone Sanity Studio for managing Chickenpie content.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Authenticate with Sanity:
```bash
npx sanity login
```

3. Start the development server:
```bash
npm run dev
```

The studio will be available at http://localhost:3333

## Deploy

To deploy to studio.chickenpie.co (when subdomain is ready):

```bash
npm run deploy
```

This will deploy to Sanity's hosted studio. You can then point your subdomain to the Sanity Studio URL.

## Content Types

- Feed Post
- Studio Project
- Blog Post
- Product
- Page
- Category
- Ad Banner

