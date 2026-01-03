'use client';

import { useRouter } from 'next/navigation';
import { Category } from '@/types/sanity';

interface ShopFilterBarProps {
  categories: Category[];
  activeFilter: string;
}

// Default product types (if no categories exist yet)
const defaultProductTypes = [
  { title: 'T-Shirts', slug: 'tshirt' },
  { title: 'Art Prints', slug: 'art' },
  { title: 'Stickers', slug: 'sticker' },
  { title: 'Posters', slug: 'poster' },
  { title: 'Accessories', slug: 'accessory' },
];

export default function ShopFilterBar({ categories, activeFilter }: ShopFilterBarProps) {
  const router = useRouter();

  // Use categories from Sanity if available, otherwise use defaults
  const filterOptions = categories.length > 0 ? categories : defaultProductTypes;

  const handleFilterChange = (value: string) => {
    if (value === 'all') {
      router.push('/shop');
    } else {
      router.push(`/shop?category=${value}`);
    }
  };

  return (
    <div className="mb-8" id="products">
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
        {filterOptions.map((option) => {
          const slug = 'slug' in option ? option.slug : '';
          const title = option.title;
          
          return (
            <button
              key={slug}
              onClick={() => handleFilterChange(slug)}
              className={`px-6 py-3 font-heading font-bold uppercase text-sm border-2 border-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                activeFilter === slug
                  ? 'bg-red text-cream shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                  : 'bg-cream text-black'
              }`}
            >
              {title}
            </button>
          );
        })}
      </div>
    </div>
  );
}
