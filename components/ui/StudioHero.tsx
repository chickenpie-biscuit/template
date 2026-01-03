'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Container from './Container';

interface StudioHeroProps {
  featuredProjects: any[];
}

export default function StudioHero({ featuredProjects }: StudioHeroProps) {
  return (
    <section className="relative bg-cream border-b-2 border-black py-20 lg:py-32">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl lg:text-7xl font-heading font-bold uppercase mb-6 text-black leading-tight">
              Design Studio
            </h1>
            <p className="font-body text-lg mb-8 text-black/80 leading-relaxed">
              We make stuff look good. From branding and identity to web design and
              illustration, we bring creative vision to life with playful professionalism.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-red-200 text-black border-2 border-black font-heading font-bold uppercase hover:bg-red-300 transition-colors"
            >
              Start a Project
            </Link>
          </motion.div>

          {/* Image Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {featuredProjects.length > 0 ? (
              <div className="relative aspect-[4/3] bg-black border-2 border-black">
                <Image
                  src={urlFor(featuredProjects[0].featuredImage).width(800).height(600).url()}
                  alt={featuredProjects[0].title}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="aspect-[4/3] bg-black border-2 border-black flex items-center justify-center">
                <p className="font-body text-cream">Featured work coming soon</p>
              </div>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

