# Migration Guide: Payload CMS → Sanity CMS

This guide will help you migrate your Vercel project from Payload CMS to Sanity CMS.

## Prerequisites

- Access to your GitHub repo: https://github.com/chickenpie-three/chickenpie-web
- Access to your Vercel project dashboard
- Your Sanity project ID: `0fg6ihzb`
- Your Sanity API token

## Step 1: Backup Your Current Project

Before making changes, create a backup branch:

```bash
git checkout -b backup-payload-cms
git push origin backup-payload-cms
git checkout main  # or your main branch
```

## Step 2: Remove Payload CMS

### 2.1 Remove Payload Dependencies

In your `package.json`, remove Payload-related packages:

```bash
# Remove these packages:
- payload
- @payloadcms/db-mongodb (or your database adapter)
- @payloadcms/plugin-cloud-storage (if used)
- Any other @payloadcms/* packages
```

### 2.2 Remove Payload Configuration Files

Delete or remove:
- `payload.config.ts` or `payload.config.js`
- `src/payload.config.ts` (if exists)
- Any Payload-specific directories like `src/collections/`, `src/globals/`, etc.

### 2.3 Remove Payload API Routes

Remove Payload API routes:
- `app/api/payload/` directory
- Any routes that import or use Payload

## Step 3: Add Sanity CMS

### 3.1 Install Sanity Dependencies

Add these to your `package.json`:

```json
{
  "dependencies": {
    "next-sanity": "^7.0.0",
    "@sanity/image-url": "^1.0.2",
    "@sanity/vision": "^3.0.0",
    "@portabletext/react": "^3.0.0",
    "@portabletext/types": "^3.0.0"
  },
  "devDependencies": {
    "@sanity/cli": "^3.0.0"
  }
}
```

Then run:
```bash
npm install
```

### 3.2 Copy Sanity Configuration

Copy these directories/files from this template to your GitHub repo:

**Required files:**
- `/sanity/` - Entire directory (config, schemas, client, queries)
- `/app/studio/` - Sanity Studio route
- `/components/sanity/` - Sanity components (PortableText)
- `/types/sanity.ts` - TypeScript types

**Optional but recommended:**
- `/components/ui/` - UI components (if you want to use them)
- `/lib/store.ts` - Zustand store (if you need cart functionality)

### 3.3 Update Environment Variables

In your Vercel project dashboard, add these environment variables:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=0fg6ihzb
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=your-read-token-here
```

## Step 4: Update Your Pages

### 4.1 Replace Payload Queries with Sanity

Find all places where you query Payload data and replace with Sanity queries:

**Before (Payload):**
```typescript
import { getPayload } from 'payload'
const payload = await getPayload({ config })
const pages = await payload.find({ collection: 'pages' })
```

**After (Sanity):**
```typescript
import { client } from '@/sanity/lib/client'
const pages = await client.fetch('*[_type == "page"]')
```

### 4.2 Update Component Imports

Replace Payload-specific imports:
- Remove: `import { PayloadAdminBar } from '@payloadcms/ui'`
- Add: `import { client } from '@/sanity/lib/client'`

## Step 5: Update Next.js Configuration

### 5.1 Update `next.config.js`

Add Sanity image domains:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

module.exports = nextConfig;
```

## Step 6: Deploy Schemas to Sanity

After pushing to GitHub, your schemas will be available. You can:

1. **Via Studio (Recommended):**
   - Deploy to Vercel
   - Visit `https://your-domain.com/studio`
   - Schemas will be automatically available

2. **Via CLI:**
   ```bash
   npx sanity schema deploy
   ```

## Step 7: Migrate Content (If Needed)

If you have existing content in Payload, you'll need to:

1. Export data from Payload (if possible)
2. Import into Sanity Studio manually, or
3. Use Sanity's import API

## Step 8: Test Everything

1. ✅ Test homepage loads
2. ✅ Test Sanity Studio at `/studio`
3. ✅ Test content pages
4. ✅ Test API routes (if any)
5. ✅ Verify images load correctly
6. ✅ Check build succeeds on Vercel

## Common Issues & Solutions

### Issue: Build fails on Vercel
**Solution:** Ensure all environment variables are set in Vercel dashboard

### Issue: Studio shows "Loading..." forever
**Solution:** Check that `NEXT_PUBLIC_SANITY_PROJECT_ID` is set correctly

### Issue: Images not loading
**Solution:** Verify `next.config.js` has Sanity CDN configured

### Issue: Type errors
**Solution:** Update TypeScript types to match Sanity schema structure

## Next Steps

1. Review your current Payload setup
2. Map Payload collections to Sanity document types
3. Create corresponding Sanity schemas
4. Test locally before deploying
5. Deploy to Vercel

## Need Help?

- Check Sanity docs: https://www.sanity.io/docs
- Check Next.js docs: https://nextjs.org/docs
- Review the template code in this repository

