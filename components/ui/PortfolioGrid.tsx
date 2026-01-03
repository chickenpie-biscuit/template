'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Container from './Container';
import { ArrowRight } from 'lucide-react';

interface PortfolioGridProps {
  projects: any[];
}

const categories = [
  { value: 'all', label: 'All Work' },
  { value: 'branding', label: 'Branding' },
  { value: 'web', label: 'Digital' },
  { value: 'illustration', label: 'Art Direction' },
];

export default function PortfolioGrid({ projects }: PortfolioGridProps) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section className="bg-cream">
      {/* Sticky Filter Bar */}
      <div className="sticky top-20 z-30 bg-cream/95 backdrop-blur-sm border-b-2 border-black py-4">
        <Container>
          <div className="flex gap-8 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveFilter(cat.value)}
                className={`font-heading font-bold uppercase text-sm tracking-wider whitespace-nowrap transition-colors ${
                  activeFilter === cat.value
                    ? 'text-black'
                    : 'text-black/40 hover:text-black'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </Container>
      </div>

      <div className="border-b-2 border-black">
        {filteredProjects.length > 0 ? (
          <div>
            {filteredProjects.map((project, index) => {
              const imageUrl = project.featuredImage
                ? urlFor(project.featuredImage).width(800).height(600).url()
                : null;

              return (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Link href={`/studio/${project.slug}`} className="group block">
                    <div className="border-b-2 border-black last:border-b-0 hover:bg-black hover:text-cream transition-colors duration-500">
                      <Container>
                        <div className="py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                          {/* Project Info */}
                          <div className="lg:col-span-5 relative z-10">
                            <span className="block font-heading text-xs font-bold uppercase tracking-widest mb-4 opacity-60">
                              {project.category || 'Project'}
                            </span>
                            <h3 className="text-4xl lg:text-6xl font-heading font-bold uppercase mb-6 leading-none">
                              {project.title}
                            </h3>
                            <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-x-[-20px] group-hover:translate-x-0">
                              <span className="font-heading font-bold uppercase tracking-wider text-sm">
                                View Case Study
                              </span>
                              <ArrowRight size={20} />
                            </div>
                          </div>

                          {/* Hover Image Reveal (Desktop) */}
                          <div className="hidden lg:block lg:col-span-7 relative h-[400px] overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            {imageUrl && (
                              <Image
                                src={imageUrl}
                                alt={project.title}
                                fill
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform scale-110 group-hover:scale-100"
                              />
                            )}
                          </div>

                          {/* Mobile Image (Always Visible) */}
                          <div className="lg:hidden relative aspect-[16/9] w-full border-2 border-current">
                            {imageUrl && (
                              <Image
                                src={imageUrl}
                                alt={project.title}
                                fill
                                className="object-cover"
                              />
                            )}
                          </div>
                        </div>
                      </Container>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <Container>
            <div className="py-32 text-center">
              <p className="font-body text-xl text-black/60">
                No projects found in this category.
              </p>
            </div>
          </Container>
        )}
      </div>
    </section>
  );
}
