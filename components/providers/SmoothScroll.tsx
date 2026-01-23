'use client';

import { ReactNode, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<any>(null);
  const rafRef = useRef<number | null>(null);
  const pathname = usePathname();
  const isStudio = pathname?.startsWith('/admin') || pathname?.startsWith('/studio');

  // Memoize RAF callback
  const raf = useCallback((time: number) => {
    lenisRef.current?.raf(time);
    rafRef.current = requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    // Don't initialize Lenis on Studio pages or mobile
    if (isStudio) return;
    
    // Check if mobile - disable smooth scroll on touch devices for better performance
    const isMobile = window.matchMedia('(max-width: 768px)').matches || 
                     'ontouchstart' in window;
    if (isMobile) return;

    // Dynamic import Lenis for code splitting
    import('lenis').then((LenisModule) => {
      const Lenis = LenisModule.default;
      
      const lenis = new Lenis({
        duration: 1.0, // Slightly faster for snappier feel
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        touchMultiplier: 2,
      });

      lenisRef.current = lenis;

      // Use native RAF instead of GSAP ticker for better performance
      rafRef.current = requestAnimationFrame(raf);
    });

    // Clean up
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      lenisRef.current?.destroy();
    };
  }, [isStudio, raf]);

  return <>{children}</>;
}
