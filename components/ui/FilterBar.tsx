'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import Container from './Container';
import { ArrowDownAZ, ArrowUpAZ } from 'lucide-react';

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Design', value: 'design-work' },
  { label: 'Art', value: 'art' },
  { label: 'Merch', value: 'merch-drops' },
  { label: 'Prompts', value: 'prompt-week' },
  { label: 'Chronicles', value: 'chronicles' },
  { label: 'Tools', value: 'tool-tuesday' },
  { label: 'Journey', value: 'solopreneur' },
  { label: 'Swings', value: 'sunday-swings' },
  { label: 'Golf', value: 'course-review' },
  { label: 'Nom Nom', value: 'nom-nom' },
  { label: 'Quotes', value: 'quotes' },
];

export default function FilterBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeFilter = searchParams.get('filter') || 'all';
  const activeSort = searchParams.get('sort') || 'newest';
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all') {
      params.delete('filter');
    } else {
      params.set('filter', value);
    }
    
    // Preserve sort if it exists
    if (!params.has('sort')) {
        params.delete('sort'); // or set default? usually default is implied
    }

    router.push(`/?${params.toString()}`);
  };

  const toggleSort = () => {
    const newSort = activeSort === 'newest' ? 'oldest' : 'newest';
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', newSort);
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="sticky top-20 z-30 bg-cream/95 backdrop-blur-sm border-b-2 border-black py-4">
      <Container>
        <div className="flex justify-between items-center gap-4">
          <div className="flex gap-8 overflow-x-auto pb-2 scrollbar-hide flex-1">
            {categories.map((category) => {
              const count = postCounts[category.value] || 0;
              const isActive = activeFilter === category.value;
              
              return (
                <button
                  key={category.value}
                  onClick={() => handleFilterChange(category.value)}
                  className={`font-heading font-bold uppercase text-sm tracking-wider whitespace-nowrap transition-colors flex items-center gap-2 ${
                    isActive
                      ? 'text-black'
                      : 'text-black/40 hover:text-black'
                  }`}
                >
                  {category.label}
                  <sup className="text-[10px] font-mono">{count}</sup>
                </button>
              );
            })}
          </div>

          <button
            onClick={toggleSort}
            className="flex items-center gap-2 font-heading font-bold uppercase text-sm tracking-wider text-black/60 hover:text-black transition-colors pl-4 border-l-2 border-black/10"
            title={activeSort === 'newest' ? 'Sort by Oldest' : 'Sort by Newest'}
          >
            {activeSort === 'newest' ? (
              <>
                <ArrowDownAZ className="w-4 h-4" />
                <span className="hidden sm:inline">Newest</span>
              </>
            ) : (
              <>
                <ArrowUpAZ className="w-4 h-4" />
                <span className="hidden sm:inline">Oldest</span>
              </>
            )}
          </button>
        </div>
      </Container>
    </div>
  );
}
