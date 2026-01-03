'use client';

export default function SkeletonCard() {
  return (
    <div className="border-2 border-black bg-cream overflow-hidden animate-pulse">
      <div className="relative w-full aspect-[3/4] bg-cream-200">
        <div className="absolute inset-0 bg-gradient-to-r from-cream-200 via-white to-cream-200 shimmer" />
      </div>
      <div className="p-4">
        <div className="h-4 bg-cream-200 rounded w-20 mb-3" />
        <div className="h-6 bg-cream-200 rounded w-3/4 mb-2" />
        <div className="h-4 bg-cream-200 rounded w-full mb-2" />
        <div className="h-4 bg-cream-200 rounded w-2/3 mb-4" />
        <div className="h-10 bg-cream-200 rounded w-32" />
      </div>
    </div>
  );
}

