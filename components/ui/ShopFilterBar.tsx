'use client';

import { useRouter } from 'next/navigation';
import { Category } from '@/types/sanity';

interface ShopFilterBarProps {
  categories: Category[];
  activeFilter: string;
}

export default function ShopFilterBar({ categories, activeFilter }: ShopFilterBarProps) {
  const router = useRouter();

  const handleFilterChange = (value: string) => {
    if (value === 'all') {
      router.push('/shop');
    } else {
      router.push(`/shop?category=${value}`);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => handleFilterChange('all')}
          className={`px-6 py-3 font-heading font-bold uppercase text-sm border-2 border-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
            activeFilter === 'all'
              ? 'bg-red text-cream shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
              : 'bg-cream text-black'
          }`}
        >
          All Products
        </button>
        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => handleFilterChange(category.slug)}
            className={`px-6 py-3 font-heading font-bold uppercase text-sm border-2 border-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
              activeFilter === category.slug
                ? 'bg-red text-cream shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                : 'bg-cream text-black'
            }`}
          >
            {category.title}
          </button>
        ))}
      </div>
    </div>
  );
}

