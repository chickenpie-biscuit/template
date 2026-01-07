# New Feed Post Categories Guide

## 🎨 Overview

We've added 5 stunning new content categories to your Feed, each with custom schemas, unique layouts, and beautiful card designs that display perfectly in the feed grid.

---

## ✨ New Categories

### 1. **Prompt of the Week** (`prompt-week`)
**Purpose:** Showcase the best AI prompts for design/art/writing

**Layout Style:** Split-screen tech/cyberpunk aesthetic
- Left side: The actual prompt in a code block with copy button
- Right side: The AI-generated result
- Teal/black color scheme with glowing accents

**Custom Fields:**
- `promptText` (text) - The actual AI prompt used
- `promptResult` (image) - The AI-generated output image
- `aiTool` (string) - Which AI tool was used (e.g., "Midjourney", "ChatGPT")
- `body` (rich text) - Explain why the prompt works

**Feed Card:** Black background with teal border, tech aesthetic with pulsing indicator

---

### 2. **Chicken Chronicles** (`chronicles`)
**Purpose:** Weekly micro-stories featuring Chickenpie characters (200-300 words)

**Layout Style:** Storybook/illustrated narrative
- Goldenrod header banner
- Large illustration with decorative corners
- Drop-cap first letter
- Storybook typography with episode markers

**Custom Fields:**
- `characterName` (string) - The protagonist character
- `episodeNumber` (number) - Episode in the series
- `storyIllustration` (image) - Main story illustration
- `body` (rich text) - The story content

**Feed Card:** Cream background with thick black border, storybook aesthetic

---

### 3. **Tool Tuesday** (`tool-tuesday`)
**Purpose:** Actual tools you use, with affiliate link opportunities

**Layout Style:** Product review card
- Large product image/logo
- Star rating system (out of 5)
- Pros/Cons sections with icons
- Price display
- CTA button with affiliate link

**Custom Fields:**
- `toolName` (string) - Name of the tool
- `toolWebsite` (url) - Link to tool (can be affiliate)
- `toolRating` (number) - Your rating (0-5)
- `toolPrice` (string) - e.g., "Free", "$9/mo", "$99 one-time"
- `toolPros` (array of strings) - List of benefits
- `toolCons` (array of strings) - List of drawbacks
- `body` (rich text) - Your personal experience

**Feed Card:** White background with teal accent, product card style

---

### 4. **Solopreneur Sundays** (`solopreneur`)
**Purpose:** Weekly transparent journey updates with revenue, wins, losses

**Layout Style:** Dashboard/metrics aesthetic
- Gradient header (teal to goldenrod)
- Large revenue display
- Metrics grid with trend indicators
- Wins/Losses sections with icons
- Dark theme with data visualization feel

**Custom Fields:**
- `weekNumber` (number) - Week in your journey
- `revenue` (number) - $ earned this week
- `metrics` (array of objects) - Key metrics with:
  - `label` (string) - Metric name
  - `value` (string) - The value
  - `change` (string) - Change indicator (e.g., "+25%")
- `wins` (array of strings) - Achievements this week
- `losses` (array of strings) - Challenges/struggles
- `body` (rich text) - Detailed insights

**Feed Card:** Black background with gradient header, displays fake metrics preview

---

### 5. **Sunday Swings** (`sunday-swings`)
**Purpose:** Mini-essays, philosophical thoughts, random observations (300-500 words)

**Layout Style:** Editorial/magazine aesthetic
- Hero image with gradient overlay
- Drop-cap first letter
- Large, readable typography
- Minimal, elegant design
- Reading time indicator

**Custom Fields:**
- `featuredImage` (image) - Optional hero image
- `description` (text) - Pull quote/summary
- `body` (rich text) - The essay content

**Feed Card:** Clean white card with subtle border, editorial style with reading time

---

## 🎯 How to Use in Sanity Studio

1. **Create New Feed Post:**
   - Go to Sanity Studio
   - Create a new "Feed Post" document
   - Select one of the new categories from the dropdown

2. **Category-Specific Fields:**
   - Fields automatically show/hide based on selected category
   - Only fill out the fields relevant to your category

3. **Publishing:**
   - All feed posts follow the same publish workflow
   - Draft → Publish to make live

---

## 🎨 Design Highlights

### Feed Grid Display
Each category has a unique card design that stands out in the feed:

| Category | Card Style | Color Scheme |
|----------|-----------|--------------|
| Prompt of the Week | Tech/code aesthetic | Black + Teal |
| Chicken Chronicles | Storybook card | Cream + Goldenrod + Black |
| Tool Tuesday | Product review | White + Teal |
| Solopreneur Sundays | Dashboard preview | Black + Teal + Goldenrod |
| Sunday Swings | Editorial/clean | White + Goldenrod accents |

### Full Page Layouts
Each category gets a completely custom layout optimized for its content:

- **Prompt:** Split screen for prompt vs. result comparison
- **Chronicles:** Storybook with decorative elements
- **Tool:** Product review with rating and pros/cons
- **Solopreneur:** Dashboard with metrics grid
- **Swings:** Long-form reading experience

---

## 📊 Content Strategy

### Posting Frequency
- **Prompt of the Week:** Weekly (Mondays)
- **Chicken Chronicles:** Weekly episodes
- **Tool Tuesday:** Every Tuesday
- **Solopreneur Sundays:** Weekly updates
- **Sunday Swings:** Weekly essays (Sundays)

### AI-Assisted Workflow
All categories are designed to work with AI:

1. **Prompt of the Week:** You curate prompts, AI helps format
2. **Chronicles:** AI writes draft, you edit and add illustrations
3. **Tool Tuesday:** AI drafts structure, you add personal experience
4. **Solopreneur:** AI helps structure, you provide data
5. **Sunday Swings:** AI helps develop ideas, you finalize voice

---

## 🔧 Technical Notes

### Schema File
Updated: `/sanity/schemas/documents/feedPost.ts`

### Layout Components
Created:
- `/components/layouts/PromptWeekLayout.tsx`
- `/components/layouts/ChroniclesLayout.tsx`
- `/components/layouts/ToolTuesdayLayout.tsx`
- `/components/layouts/SolopreneurLayout.tsx`
- `/components/layouts/SundaySwingsLayout.tsx`

### Feed Cards
Updated: `/components/ui/FeedPostCard.tsx`

### Routing
Updated: `/app/(site)/feed/[slug]/page.tsx`

### Filter Bar
Updated: `/components/ui/FilterBar.tsx`

---

## 💡 Content Ideas

### Prompt of the Week
- "Best Midjourney Prompts for Abstract Art"
- "ChatGPT Prompt That Writes Perfect Cold Emails"
- "DALL-E Prompt for Vintage Poster Designs"

### Chicken Chronicles
- "The Great Egg Heist"
- "Chickenpie vs. The Rooster Mafia"
- "Midnight in the Coop"

### Tool Tuesday
- "Notion: My Second Brain"
- "Figma Plugins That Save Hours"
- "Stripe vs. Gumroad: What I Actually Use"

### Solopreneur Sundays
- "Week 12: First $1K Month"
- "Week 5: The Reality Check"
- "Week 20: Burn Out & Recovery"

### Sunday Swings
- "On Staying Small in a Scale-Obsessed World"
- "Why Golf is Like Building Products"
- "The Art of Doing Nothing"

---

## 🚀 Next Steps

1. **Deploy Schema Changes:**
   ```bash
   cd studio-chickenpie
   npx sanity schema deploy
   ```

2. **Create Sample Content:**
   - Create one post for each new category
   - Test all layouts and fields
   - Verify feed card display

3. **Set Up Content Calendar:**
   - Plan posting schedule
   - Prepare AI prompts for each category
   - Create templates for recurring posts

4. **Monitor Performance:**
   - Track engagement per category
   - Adjust layouts/fields as needed
   - Gather user feedback

---

## 🎉 What's Amazing About This

1. **Unique Visual Identity:** Each category looks completely different in the feed
2. **Optimized UX:** Layouts designed specifically for content type
3. **AI-Friendly:** All categories built to work with AI assistance
4. **Scalable:** Easy to add more categories following same pattern
5. **Professional:** Award-worthy designs with attention to detail

Enjoy creating awesome content! 🐔✨

