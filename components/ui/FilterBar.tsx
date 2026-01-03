'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const filters = [
  { value: 'all', label: 'All' },
  { value: 'design-work', label: 'Design Work' },
  { value: 'merch-drops', label: 'Merch Drops' },
  { value: 'food', label: 'Food' },
  { value: 'finds', label: 'Finds' },
  { value: 'thoughts', label: 'Thoughts' },
];

export default function FilterBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeFilter = searchParams.get('filter') || 'all';

  const handleFilterClick = (filterValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (filterValue === 'all') {
      params.delete('filter');
    } else {
      params.set('filter', filterValue);
    }

    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="sticky top-20 z-30 bg-cream border-b-2 border-black">
      <div className="container-custom">
        <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.value;
            return (
              <motion.button
                key={filter.value}
                onClick={() => handleFilterClick(filter.value)}
                className={`px-3 py-2 md:px-4 font-heading font-bold uppercase text-xs md:text-sm border-2 border-black whitespace-nowrap transition-colors flex-shrink-0 ${
                  isActive
                    ? 'bg-red-200 text-red-300'
                    : 'bg-cream text-black hover:bg-cream-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter.label}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

