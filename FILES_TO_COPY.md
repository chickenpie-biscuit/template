# Files to Copy to Your GitHub Repo

This file lists all the files you need to copy from this template to your Vercel/GitHub project.

## Required Files (Core Sanity Setup)

### 1. Sanity Configuration
```
sanity/
├── env.ts                    # Environment variables
├── sanity.cli.ts            # CLI configuration
├── sanity.config.ts          # Studio configuration
├── lib/
│   ├── client.ts            # Sanity client
│   ├── image.ts             # Image URL builder
│   └── queries.ts           # GROQ queries
└── schemas/
    ├── index.ts             # Schema exports
    ├── documents/
    │   ├── page.ts          # Page schema
    │   ├── post.ts          # Blog post schema
    │   ├── product.ts       # Product schema
    │   ├── category.ts      # Category schema
    │   └── adBanner.ts      # Ad banner schema
    └── objects/
        ├── seo.ts           # SEO object
        └── link.ts          # Link object
```

### 2. Sanity Studio Route
```
app/
└── studio/
    └── [[...index]]/
        └── page.tsx         # Studio page component
```

### 3. Sanity Components
```
components/
└── sanity/
    └── PortableText.tsx     # Portable text renderer
```

### 4. TypeScript Types
```
types/
└── sanity.ts                # Sanity type definitions
```

### 5. Root Configuration
```
sanity.config.ts             # Root config (for CLI)
```

## Optional Files (UI Components - Use if Needed)

```
components/
├── ui/
│   ├── Button.tsx
│   ├── Container.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   ├── BlogCard.tsx
│   └── AdBanner.tsx
└── cart/                    # If you need cart functionality
    ├── CartButton.tsx
    ├── CartDrawer.tsx
    └── CartProvider.tsx
```

## Configuration Files to Update

### 1. `package.json`
Add these dependencies:
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

### 2. `next.config.js`
Add Sanity image domain:
```javascript
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
```

### 3. `tsconfig.json`
Ensure path aliases are set (if using `@/` imports):
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## Environment Variables to Add in Vercel

Add these in your Vercel project settings → Environment Variables:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=0fg6ihzb
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=your-read-token-here
```

## Quick Copy Script

If you're on the same machine, you can use this PowerShell script:

```powershell
# Navigate to your GitHub repo
cd "path\to\chickenpie-web"

# Copy Sanity directory
Copy-Item -Path "..\NxtWebTemplate\sanity" -Destination "." -Recurse -Force

# Copy Studio route
New-Item -ItemType Directory -Path "app\studio\[[...index]]" -Force
Copy-Item -Path "..\NxtWebTemplate\app\studio\[[...index]]\page.tsx" -Destination "app\studio\[[...index]]\page.tsx"

# Copy Sanity components
New-Item -ItemType Directory -Path "components\sanity" -Force
Copy-Item -Path "..\NxtWebTemplate\components\sanity\*" -Destination "components\sanity\" -Recurse -Force

# Copy types
New-Item -ItemType Directory -Path "types" -Force
Copy-Item -Path "..\NxtWebTemplate\types\sanity.ts" -Destination "types\sanity.ts"

# Copy root config
Copy-Item -Path "..\NxtWebTemplate\sanity.config.ts" -Destination "sanity.config.ts"
```

## Files to Remove (Payload CMS)

Remove these if they exist:
- `payload.config.ts` or `payload.config.js`
- `src/collections/` directory
- `src/globals/` directory
- `app/api/payload/` directory
- Any Payload-related dependencies in `package.json`

## After Copying

1. Run `npm install` to install new dependencies
2. Remove Payload dependencies: `npm uninstall payload @payloadcms/*`
3. Update your pages to use Sanity queries
4. Add environment variables to Vercel
5. Test locally: `npm run dev`
6. Deploy to Vercel

