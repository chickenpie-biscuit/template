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
    <div className="sticky top-0 z-40 bg-cream border-b-2 border-black py-4 backdrop-blur-sm bg-cream/95">
      <div className="w-full px-4">
        {/* Desktop: Centered buttons */}
        <div className="hidden md:flex gap-4 justify-center flex-wrap">
          {categories.map((category) => {
            const count = postCounts[category.value] || 0;
            const isActive = activeFilter === category.value;
            
            return (
              <button
                key={category.value}
                onClick={() => handleFilterChange(category.value)}
                className={`px-6 py-3 font-heading font-bold uppercase text-sm whitespace-nowrap border-2 border-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none ${
                  isActive
                    ? 'bg-red text-cream shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                    : 'bg-cream text-black'
                }`}
              >
                {category.label}
                {count > 0 && (
                  <span className={`ml-2 text-xs ${isActive ? 'text-cream/80' : 'text-black/60'}`}>
                    ({count})
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile: Swipeable carousel */}
        <div className="md:hidden overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          <div className="flex gap-3 min-w-max">
            {categories.map((category) => {
              const count = postCounts[category.value] || 0;
              const isActive = activeFilter === category.value;
              
              return (
                <button
                  key={category.value}
                  onClick={() => handleFilterChange(category.value)}
                  className={`px-6 py-3 font-heading font-bold uppercase text-sm whitespace-nowrap border-2 border-black transition-all duration-300 min-w-[120px] ${
                    isActive
                      ? 'bg-red text-cream'
                      : 'bg-cream text-black active:bg-black active:text-cream'
                  }`}
                >
                  {category.label}
                  {count > 0 && (
                    <span className={`ml-2 text-xs block ${isActive ? 'text-cream/80' : 'text-black/60'}`}>
                      ({count})
                    </span>
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
