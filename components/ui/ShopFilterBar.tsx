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
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (value === 'all') {
      router.push('/shop');
    } else {
      router.push(`/shop?category=${value}`);
    }
  };

  // Define common product types that should always show
  const productTypes = [
    { title: 'T-Shirts', slug: 't-shirts' },
    { title: 'Prints', slug: 'prints' },
    { title: 'Accessories', slug: 'accessories' },
    { title: 'Stickers', slug: 'stickers' },
  ];

  return (
    <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => handleFilterChange('all')}
        className={`font-heading font-bold uppercase text-sm tracking-wider whitespace-nowrap transition-colors ${
          activeFilter === 'all'
            ? 'text-black'
            : 'text-black/40 hover:text-black'
        }`}
      >
        All
      </button>
      {productTypes.map((type) => (
        <button
          key={type.slug}
          onClick={() => handleFilterChange(type.slug)}
          className={`font-heading font-bold uppercase text-sm tracking-wider whitespace-nowrap transition-colors ${
            activeFilter === type.slug
              ? 'text-black'
              : 'text-black/40 hover:text-black'
          }`}
        >
          {type.title}
        </button>
      ))}
    </div>
  );
}
