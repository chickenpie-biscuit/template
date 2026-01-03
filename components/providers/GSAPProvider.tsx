'use client';

import { useEffect } from 'react';

export default function GSAPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Dynamic import to avoid SSR issues
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        // Set up smooth scroll animations
        gsap.utils.toArray<HTMLElement>('.animate-on-scroll').forEach((element) => {
          gsap.fromTo(
            element,
            {
              opacity: 0,
              y: 50,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );
        });

        // Parallax effect for hero sections
        gsap.utils.toArray<HTMLElement>('.parallax').forEach((element) => {
          gsap.to(element, {
            yPercent: -50,
            ease: 'none',
            scrollTrigger: {
              trigger: element,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        });
      });
    });

    return () => {
      if (typeof window !== 'undefined') {
        import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        });
      }
    };
  }, []);

  return <>{children}</>;
}

