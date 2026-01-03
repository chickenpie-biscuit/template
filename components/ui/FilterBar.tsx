'use client';

import { useSearchParams, useRouter } from 'next/navigation';

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

  const handleFilterChange = (value: string) => {
    if (value === 'all') {
      router.push('/');
    } else {
      router.push(`/?filter=${value}`);
    }
  };

  return (
    <div className="sticky top-0 z-40 bg-cream border-b-2 border-black py-4">
      <div className="w-full px-4">
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide justify-center flex-wrap">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => handleFilterChange(category.value)}
              className={`px-6 py-2 font-heading font-bold uppercase text-sm whitespace-nowrap border-2 border-black transition-all ${
                activeFilter === category.value
                  ? 'bg-red text-cream'
                  : 'bg-cream text-black hover:bg-black hover:text-cream'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
