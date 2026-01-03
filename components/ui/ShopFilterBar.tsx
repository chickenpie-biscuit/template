'use client';

import { useRouter } from 'next/navigation';
import { Category } from '@/types/sanity';

interface ShopFilterBarProps {
  categories: Category[];
  activeFilter: string;
}

// Default product types (if no categories exist yet)
const defaultProductTypes = [
  { title: 'T-Shirts', slug: 't-shirts' },
  { title: 'Prints', slug: 'prints' },
  { title: 'Accessories', slug: 'accessories' },
  { title: 'Stickers', slug: 'stickers' },
];

export default function ShopFilterBar({ categories, activeFilter }: ShopFilterBarProps) {
  const router = useRouter();

  // Use categories from Sanity if available, otherwise use defaults
  const filterOptions = categories.length > 0 ? categories : defaultProductTypes;

  const handleFilterChange = (value: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (value === 'all') {
      router.push('/shop');
    } else {
      router.push(`/shop?category=${value}`);
    }
  };

  return (
    <div className="mb-8" id="products">
      <div className="flex flex-wrap gap-6 justify-center">
        <button
          onClick={() => handleFilterChange('all')}
          className={`font-heading font-bold uppercase text-sm tracking-widest transition-colors relative group ${
            activeFilter === 'all'
              ? 'text-black'
              : 'text-black/40 hover:text-black'
          }`}
        >
          All Products
          <span className={`absolute -bottom-1 left-0 w-full h-[2px] bg-black transform transition-transform duration-300 ${activeFilter === 'all' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
        </button>
        {filterOptions.map((option) => {
          const slug = 'slug' in option ? option.slug : '';
          const title = option.title;
          const isActive = activeFilter === slug;
          
          return (
            <button
              key={slug}
              onClick={() => handleFilterChange(slug)}
              className={`font-heading font-bold uppercase text-sm tracking-widest transition-colors relative group ${
                isActive
                  ? 'text-black'
                  : 'text-black/40 hover:text-black'
              }`}
            >
              {title}
              <span className={`absolute -bottom-1 left-0 w-full h-[2px] bg-black transform transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
