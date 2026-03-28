import { createClient, SanityClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '../env';

// Check if Sanity is configured
const isConfigured = Boolean(projectId && projectId.trim() !== '');

// Create clients only if configured
export const client: SanityClient | null = isConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

export const previewClient: SanityClient | null = isConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token: process.env.SANITY_API_READ_TOKEN,
    })
  : null;

// Write client for mutations (subscribe, contact, orders)
export const writeClient: SanityClient | null = isConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token: process.env.SANITY_API_WRITE_TOKEN,
    })
  : null;

export async function getClient(preview?: boolean): Promise<SanityClient | null> {
  if (!isConfigured) {
    return null;
  }
  if (preview) {
    return previewClient;
  }
  return client;
}

export async function getPreviewClient(): Promise<SanityClient | null> {
  return previewClient;
}

// Helper to check if Sanity is configured
export function isSanityConfigured(): boolean {
  return isConfigured;
}

