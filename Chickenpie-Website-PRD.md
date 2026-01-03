# CHICKENPIE WEBSITE PRD

**Product Requirements Document**  
Version 1.0 | December 2024

---

## OVERVIEW

Chickenpie is a creative universe that functions as both a design studio and lifestyle brand. The website serves as a digital playground showcasing our multi-faceted approach: design services, merchandise, food content, affiliate recommendations, and original art.

**Mission:** Spread love, chickens, and art through playful design and responsible creative work.

**Target Audience:** The creatively restless—people who appreciate random art, quirky design, and experiences that balance professionalism with personality.

---

## COMPLETE SITEMAP

### Primary Navigation

- Feed (Homepage)
- Studio
- Shop
- About
- Contact

### Secondary Navigation (Mobile/Footer)

- Instagram
- Newsletter Signup
- Privacy Policy
- Terms of Service

---

## FEED PAGE (HOMEPAGE)

### Purpose

The Feed is the heart of Chickenpie—a dynamic, Tumblr-style content stream that showcases the full brand universe. It serves as the primary discovery mechanism and sets the tone for the entire experience.

### Layout Structure

#### Header

- Chickenpie logo (left)
- Primary navigation links (center/right)
- Cart icon with item count (if applicable)

#### Filter Bar

Horizontal filter tags displayed below header, sticky on scroll:

- All (default)
- Design Work
- Merch Drops
- Food
- Finds (affiliates)
- Thoughts (blog)

**Filter behavior:** Click to filter content, click again to deselect. Multiple filters not supported—one active filter at a time.

#### Content Stream

Masonry grid layout (Pinterest-style) with varying card heights based on content type.

**Post Card Components:**

- Featured Image/Visual (required)
- Category Tag (color-coded badge)
- Title/Headline
- Short Description (1-2 sentences)
- CTA Button (varies by type)

**CTA Button Variations:**

- Design Work: "View Project"
- Merch: "Shop Now"
- Food/Thoughts: "Read More"
- Finds: "Check It Out" (external link)

### Technical Requirements

- Infinite scroll pagination (load 12 posts per batch)
- Lazy loading for images
- Smooth filter transitions (fade in/out)
- URL parameters for filter state (shareable links)
- Responsive masonry grid (4 cols desktop, 2 cols tablet, 1 col mobile)

---

## STUDIO PAGE

### Purpose

The Studio page is the professional portfolio section designed specifically for client acquisition. It showcases design services, past work, and provides clear pathways for hiring Chickenpie for projects.

### Layout Structure

#### Hero Section

- Headline: "Design Studio" or "We Make Stuff Look Good"
- Subheadline: Brief description of services (1-2 sentences)
- Primary CTA: "Start a Project" (links to contact form)
- Featured work image carousel (3-5 hero shots)

#### Services Section

Grid of service cards (3 columns desktop, stack on mobile):

**Service 1: Branding & Identity**
- Logo design, brand guidelines, visual systems, print collateral

**Service 2: Web Design & Development**
- Websites, landing pages, e-commerce, web apps, responsive design

**Service 3: Illustration & Art**
- Custom illustrations, poster design, merchandise graphics, digital art

**Each service card includes:**

- Service name
- Brief description
- Icon or representative image
- "Learn More" link (expands inline or scrolls to work)

#### Portfolio Grid

Filterable project gallery showing work examples:

- Filter tags: All, Branding, Web, Illustration
- Grid layout: 3 columns desktop, 2 tablet, 1 mobile
- Hover state: Title overlay + "View Project" link
- Click: Opens project case study (modal or dedicated page)

**Project Card Components:**

- Featured image
- Project title
- Category tags
- Year completed

#### Process Section

Simple 3-step visual breakdown of working process:

- Step 1: Discovery - We learn about your project and goals
- Step 2: Creation - We design, iterate, and refine
- Step 3: Delivery - Final files and ongoing support

#### CTA Section

- Headline: "Ready to start?"
- Button: "Get in Touch" (links to Contact page)
- Alternative: "View Pricing" (if applicable)

### Technical Requirements

- Project case study modal or dedicated pages
- Smooth filtering animations
- Lazy loading for portfolio images
- SEO optimization for service pages

---

## SHOP PAGE

### Purpose

E-commerce storefront for Chickenpie merchandise including t-shirts, prints, and other branded products. Designed for easy browsing and streamlined checkout.

### Layout Structure

#### Hero Section

- Featured banner showcasing latest drop or seasonal collection
- "Shop Collection" CTA

#### Product Categories

Filter/category navigation:

- All Products
- T-Shirts
- Prints
- Accessories
- New Arrivals

#### Product Grid

Standard e-commerce grid (4 columns desktop, 3 tablet, 2 mobile):

**Product Card Components:**

- Product image (hover shows alternate view)
- Product name
- Price
- "New" or "Limited" badge (if applicable)
- Quick add to cart button (on hover)

#### Product Detail Page (PDP)

Accessed by clicking product card:

- Image gallery (3-5 images, zoomable)
- Product title and price
- Product description (2-3 paragraphs)
- Size selector (if applicable)
- Quantity selector
- "Add to Cart" CTA
- Material/care info (accordion)
- Size guide (accordion)
- Related products carousel

### Technical Requirements

- Shopping cart functionality (persistent across sessions)
- Checkout integration (Shopify, WooCommerce, or custom)
- Inventory management system
- Payment gateway integration (Stripe/PayPal)
- Shipping calculator
- Order confirmation emails

---

## ABOUT PAGE

### Purpose

Tell the Chickenpie story, establish brand personality, and connect with visitors on a human level. This page transforms curiosity into affinity.

### Layout Structure

#### Hero Section

- Large Chickenpie illustration or character artwork
- Headline: "What is Chickenpie?"

#### Brand Story

3-4 paragraph narrative explaining:

- How Chickenpie started
- The mission and philosophy
- What makes the brand unique
- Why chickens? (lean into the absurdity)

#### Values Section

Visual presentation of core values:

- Playful but Professional
- Creatively Responsible
- Embrace the Random
- Love, Chickens & Art

Each value paired with supporting icon and 1-sentence explanation.

#### Meet the Team (Optional)

If team members want to be featured:

- Photo/illustration of team member
- Name and role
- Fun fact or personality tidbit

#### CTA Section

- "Want to work together?" with link to Studio or Contact
- "Join the flock" newsletter signup

---

## CONTACT PAGE

### Purpose

Provide clear pathways for inquiries, collaboration requests, and general communication. Minimize friction in getting in touch.

### Layout Structure

#### Contact Form

**Form Fields:**

- Name (required)
- Email (required)
- Inquiry Type (dropdown: Project Inquiry, Shop Question, General, Press)
- Message (textarea, required)
- Budget Range (optional, for project inquiries)
- Submit button: "Send Message"

#### Alternative Contact Methods

- Email: hello@chickenpie.co
- Instagram: @chickenpie

#### FAQ Section (Optional)

Accordion-style common questions:

- What's your typical turnaround time?
- Do you ship internationally?
- Can I commission custom work?

### Technical Requirements

- Form validation (client and server-side)
- Spam protection (reCAPTCHA or honeypot)
- Email notification system
- Auto-reply confirmation email to submitter
- Success state with custom message

---

## GLOBAL COMPONENTS

### Navigation Bar

**Desktop:**

- Logo (left, links to Feed)
- Primary links centered: Feed | Studio | Shop | About | Contact
- Cart icon (right, with item count badge)

**Mobile:**

- Logo (left)
- Hamburger menu (right)
- Cart icon (right)
- Full-screen menu overlay on click

### Footer

**4-Column Layout (Desktop):**

**Column 1 - Brand**
- Chickenpie logo
- Tagline: "Spreading love, chickens & art"

**Column 2 - Quick Links**
- Studio
- Shop
- About
- Contact

**Column 3 - Social**
- Instagram
- Twitter/X
- Pinterest

**Column 4 - Newsletter**
- "Join the flock" heading
- Email signup form (inline)

**Bottom Bar:**
- Copyright notice
- Privacy Policy link
- Terms of Service link

---

## TECHNICAL STACK & IMPLEMENTATION

### Frontend Framework

- React or Next.js for component-based architecture
- Tailwind CSS for styling (matches Chickenpie aesthetic)
- Framer Motion for animations

### Backend & CMS

- Headless CMS (Sanity, Contentful, or Strapi) for content management
- Feed posts, portfolio projects, blog articles managed via CMS

### E-commerce

- Shopify for shop functionality (or WooCommerce if WordPress-based)
- Stripe integration for payments

### Hosting & Deployment

- Vercel or Netlify for frontend hosting
- CDN for image optimization
- Git-based deployment workflow

### Performance Requirements

- Page load time under 3 seconds
- Mobile-first responsive design
- Lighthouse score: 90+ across all metrics
- Lazy loading for all images
- Optimized fonts and assets

---

## CONTENT STRATEGY

### Feed Content Types

#### Design Work Posts
- Showcase completed client projects
- Personal design experiments
- Before/after transformations

#### Merch Drops
- New product announcements
- Limited edition releases
- Behind-the-scenes design process

#### Food Content
- Restaurant reviews and recommendations
- Food photography
- Culinary adventures and travel

#### Finds (Affiliates)
- Product recommendations
- Tools and resources for creatives
- Gear reviews

#### Thoughts (Blog)
- Creative process essays
- Design philosophy and insights
- Personal reflections and stories

### Publishing Cadence

- Minimum 2-3 Feed posts per week
- 1 blog post per month
- Product drops as available

---

## DESIGN SYSTEM

### Typography

**Headings:**
- Bold, all-caps sans-serif (similar to uploaded artwork)
- Font suggestion: Space Grotesk Bold or similar

**Body Text:**
- Monospace font (Space Mono as requested)
- Regular weight for paragraphs
- Medium/Bold for emphasis

### Color Palette

Based on uploaded artwork (vintage poster aesthetic):

- Primary: Cream/Beige (#F5F1E8)
- Accent 1: Warm Red (#E74C3C or similar)
- Accent 2: Teal/Turquoise (#4ECDC4)
- Accent 3: Goldenrod (#F4A261)
- Text: Black (#000000)

### Visual Style

- Vintage poster aesthetic with modern execution
- Line art illustrations (similar to uploaded chicken characters)
- Bold outlines and simplified shapes
- Playful compositions with unexpected juxtapositions
- Limited color palettes per piece

---

## PRE-LAUNCH CHECKLIST

### Content

- [ ] 10-15 Feed posts ready across all categories
- [ ] 5+ portfolio projects with case studies
- [ ] About page copy finalized
- [ ] Initial shop inventory (3-5 products minimum)

### Technical

- [ ] All pages responsive and tested on mobile/tablet/desktop
- [ ] Forms functional with email notifications
- [ ] Shopping cart and checkout tested
- [ ] SSL certificate installed
- [ ] Analytics installed (Google Analytics or similar)

### SEO & Marketing

- [ ] Meta titles and descriptions for all pages
- [ ] Open Graph images configured
- [ ] Sitemap.xml generated
- [ ] Social media accounts created and linked
- [ ] Newsletter signup functional

### Legal

- [ ] Privacy Policy page
- [ ] Terms of Service page
- [ ] Shipping and Returns policy (for shop)
- [ ] Cookie consent banner (if applicable)

---

**END OF DOCUMENT**
