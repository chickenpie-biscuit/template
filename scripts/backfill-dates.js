#!/usr/bin/env node

/**
 * One-time script to backfill `publishedAt` on existing feedPost documents.
 * Sets publishedAt to the document's _createdAt for any post missing the field.
 *
 * Usage:
 *   SANITY_TOKEN=<your-write-token> node scripts/backfill-dates.js
 */

const { createClient } = require('@sanity/client');

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '0fg6ihzb';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_TOKEN;

if (!token) {
  console.error('Error: SANITY_TOKEN environment variable is required.');
  console.error('Usage: SANITY_TOKEN=<your-write-token> node scripts/backfill-dates.js');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

async function backfillDates() {
  console.log(`Connecting to Sanity project "${projectId}" dataset "${dataset}"...\n`);

  // Fetch all feedPost documents where publishedAt is not set
  const posts = await client.fetch(
    `*[_type == "feedPost" && !defined(publishedAt)]{ _id, _createdAt, title }`
  );

  if (posts.length === 0) {
    console.log('All feedPost documents already have publishedAt set. Nothing to do.');
    return;
  }

  console.log(`Found ${posts.length} feedPost document(s) without publishedAt.\n`);

  let success = 0;
  let failed = 0;

  for (const post of posts) {
    try {
      await client
        .patch(post._id)
        .set({ publishedAt: post._createdAt })
        .commit();
      console.log(`  ✓ "${post.title}" → ${post._createdAt}`);
      success++;
    } catch (err) {
      console.error(`  ✗ "${post.title}" — ${err.message}`);
      failed++;
    }
  }

  console.log(`\nDone. ${success} patched, ${failed} failed.`);
}

backfillDates().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
