import Image from 'next/image';
import Link from 'next/link';
import { AdBanner } from '@/types/sanity';
import { urlFor } from '@/sanity/lib/image';

interface AdBannerProps {
  banners: AdBanner[];
  placement?: string;
}

export default function AdBannerComponent({ banners, placement }: AdBannerProps) {
  if (!banners || banners.length === 0) return null;

  // Filter by placement if provided
  const filteredBanners = placement
    ? banners.filter((banner) => banner.placement === placement)
    : banners;

  if (filteredBanners.length === 0) return null;

  // For now, show the first banner. Can be enhanced for rotation
  const banner = filteredBanners[0];
  const imageUrl = urlFor(banner.image).width(1200).height(400).url();

  if (banner.link) {
    return (
      <Link
        href={banner.link}
        className="block relative overflow-hidden rounded-lg"
        rel="noopener noreferrer"
      >
        <div className="relative w-full aspect-[3/1] bg-gray-100">
          <Image
            src={imageUrl}
            alt={banner.image.alt || banner.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </Link>
    );
  }

  return (
    <div className="relative w-full aspect-[3/1] overflow-hidden rounded-lg bg-gray-100">
      <Image
        src={imageUrl}
        alt={banner.image.alt || banner.title}
        fill
        className="object-cover"
        sizes="100vw"
      />
    </div>
  );
}

