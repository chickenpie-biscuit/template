'use client';

import { NextStudio } from 'next-sanity/studio';
import { Suspense, useEffect } from 'react';
import config from '@/sanity/sanity.config';

export default function StudioPage() {
  useEffect(() => {
    console.log('Studio page mounted');
    console.log('Config:', config);
    console.log('Project ID:', config.projectId);
    console.log('Dataset:', config.dataset);
  }, []);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen bg-cream">
          <div className="text-center">
            <p className="font-body text-lg mb-4">Loading Studio...</p>
            <p className="font-body text-sm text-black/60">Project: {config.projectId}</p>
            <p className="font-body text-sm text-black/60">Dataset: {config.dataset}</p>
          </div>
        </div>
      }>
        <NextStudio config={config} />
      </Suspense>
    </div>
  );
}

