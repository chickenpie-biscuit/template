'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';

const categories = [
  { label: 'ALL', value: 'all' },
  { label: 'DESIGN WORK', value: 'design-work' },
  { label: 'MERCH DROPS', value: 'merch-drops' },
  { label: 'FOOD', value: 'food' },
  { label: 'FINDS', value: 'finds' },
  { label: 'THOUGHTS', value: 'thoughts' },
];

export default function FilterBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeFilter = searchParams.get('filter') || 'all';
  const [postCounts, setPostCounts] = useState<Record<string, number>>({});

  // Fetch post counts for each category
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const counts: Record<string, number> = {};
        
        // Get total count
        const totalQuery = groq`count(*[_type == "feedPost" || _type == "post"])`;
        counts.all = await client?.fetch(totalQuery).catch(() => 0) ?? 0;
        
        // Get counts per category
        for (const cat of categories.slice(1)) {
          const categoryQuery = groq`count(*[(_type == "feedPost" && category == $category) || (_type == "post")])`;
          counts[cat.value] = await client?.fetch(categoryQuery, { category: cat.value }).catch(() => 0) ?? 0;
        }
        
        setPostCounts(counts);
      } catch (error) {
        console.error('Error fetching post counts:', error);
      }
    };
    
    fetchCounts();
  }, []);

  const handleFilterChange = (value: string) => {
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (value === 'all') {
      router.push('/');
    } else {
      router.push(`/?filter=${value}`);
    }
  };

  return (
    <div className="sticky top-0 z-40 bg-cream/95 backdrop-blur-md border-b-2 border-black py-6">
      <div className="w-full px-4">
        {/* Desktop: Centered text links */}
        <div className="hidden md:flex gap-8 justify-center flex-wrap">
          {categories.map((category) => {
            const count = postCounts[category.value] || 0;
            const isActive = activeFilter === category.value;
            
            return (
              <button
                key={category.value}
                onClick={() => handleFilterChange(category.value)}
                className={`font-heading font-bold uppercase text-sm tracking-widest transition-colors relative group flex items-start gap-1 ${
                  isActive
                    ? 'text-black'
                    : 'text-black/40 hover:text-black'
                }`}
              >
                {category.label}
                {count > 0 && (
                  <span className="text-[10px] -mt-1 opacity-60">
                    {count}
                  </span>
                )}
                <span className={`absolute -bottom-1 left-0 w-full h-[2px] bg-black transform transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </button>
            );
          })}
        </div>

        {/* Mobile: Swipeable carousel (kept as text links) */}
        <div className="md:hidden overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          <div className="flex gap-6 min-w-max">
            {categories.map((category) => {
              const count = postCounts[category.value] || 0;
              const isActive = activeFilter === category.value;
              
              return (
                <button
                  key={category.value}
                  onClick={() => handleFilterChange(category.value)}
                  className={`font-heading font-bold uppercase text-sm tracking-widest transition-colors relative flex items-start gap-1 ${
                    isActive
                      ? 'text-black'
                      : 'text-black/40'
                  }`}
                >
                  {category.label}
                  {count > 0 && (
                    <span className="text-[10px] -mt-1 opacity-60">
                      {count}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-black" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
