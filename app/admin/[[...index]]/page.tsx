'use client';

import { NextStudio } from 'next-sanity/studio';
import { Suspense } from 'react';
import config from '@/sanity/sanity.config';

export default function StudioPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading Studio...</div>}>
      <NextStudio config={config} />
    </Suspense>
  );
}

