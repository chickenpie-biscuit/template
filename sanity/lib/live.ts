// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { client } from './client'

// Try to use defineLive if available (next-sanity v11+), otherwise provide fallback
let defineLive: any;
try {
  // Dynamic import to handle cases where the module might not exist
  defineLive = require("next-sanity/live").defineLive;
} catch {
  // defineLive not available (e.g., in next-sanity v10)
  defineLive = null;
}

let sanityFetch: any;
let SanityLive: any;

if (defineLive && client) {
  const live = defineLive({
    client,
  });
  sanityFetch = live.sanityFetch;
  SanityLive = live.SanityLive;
} else {
  // Fallback for versions without defineLive (e.g., next-sanity v10)
  // If live preview is needed, consider upgrading to next-sanity v11+ with Next.js 15+
  sanityFetch = async (query: string, params?: any) => {
    if (!client) return null;
    return client.fetch(query, params);
  };
  SanityLive = () => null; // No-op component
}

export { sanityFetch, SanityLive };
