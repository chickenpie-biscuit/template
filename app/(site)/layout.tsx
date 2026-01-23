import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import { client } from '@/sanity/lib/client';
import { getActiveBanners } from '@/sanity/lib/queries';
import { AdBanner } from '@/types/sanity';
import AdBannerComponent from '@/components/ui/AdBanner';

export const revalidate = 60;

async function getBanners(): Promise<AdBanner[]> {
  try {
    return await client?.fetch<AdBanner[]>(getActiveBanners).catch(() => []) ?? [];
  } catch {
    return [];
  }
}

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const banners = await getBanners();

  return (
    <>
      {/* Announcement Bar - Header Placement */}
      <AdBannerComponent
        banners={banners}
        placement="header"
        variant="sticky"
        dismissible
      />
      
      <Header />
      <main className="min-h-screen">{children}</main>
      
      {/* Footer Banner - Above Footer */}
      <AdBannerComponent
        banners={banners}
        placement="footer"
        variant="full"
        className="border-t-2 border-black"
      />
      
      <Footer />
    </>
  );
}
