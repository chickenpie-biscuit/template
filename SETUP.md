# Quick Setup Guide

Follow these steps to get your template up and running:

## 1. Install Dependencies

```bash
npm install
```

## 2. Set Up Sanity

### Option A: New Sanity Project

```bash
npx sanity init
```

- Choose "Create new project"
- Enter project name
- Use default dataset: `production`
- Choose project template: "Clean project with no predefined schemas"

### Option B: Link Existing Project

```bash
npx sanity init
```

- Choose "Use existing project"
- Select your project

## 3. Get Your Sanity Credentials

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Copy the **Project ID**
4. Go to **API** → **Tokens**
5. Create a new token with **Read** permissions
6. Copy the token

## 4. Configure Environment Variables

Create `.env.local` file:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=your-read-token-here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

## 5. Deploy Sanity Schemas

```bash
npx sanity schema deploy
```

Or use the Studio interface at `/studio` after starting the dev server.

## 6. Add Placeholder Image (Optional)

Add a placeholder image to `/public/images/placeholder.jpg` for products/posts without images.

## 7. Start Development Server

```bash
npm run dev
```

## 8. Access Sanity Studio

Navigate to [http://localhost:3000/studio](http://localhost:3000/studio) to start adding content.

## Next Steps

1. Add your logo to `/public/images/logo.svg`
2. Customize colors in `tailwind.config.ts`
3. Update site name in `components/ui/Header.tsx`
4. Add content in Sanity Studio
5. Configure Stripe for payments (if needed)

## Troubleshooting

### "Project ID not found"
- Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local`
- Restart the dev server after changing env variables

### "Cannot read properties of undefined"
- Check that your Sanity schemas are deployed
- Verify your dataset name matches

### Images not loading
- Ensure images are uploaded in Sanity Studio
- Check `next.config.js` has correct image domains

## Need Help?

- Check the main [README.md](./README.md)
- Review Sanity docs: https://www.sanity.io/docs
- Review Next.js docs: https://nextjs.org/docs

