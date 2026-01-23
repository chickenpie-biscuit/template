'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Container from './Container';
import { ArrowUpRight } from 'lucide-react';

interface PortfolioGridProps {
  projects: any[];
}

const categories = [
  { value: 'all', label: 'All Work' },
  { value: 'branding', label: 'Branding' },
  { value: 'web', label: 'Web' },
  { value: 'illustration', label: 'Art Direction' },
];

export default function PortfolioGrid({ projects }: PortfolioGridProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section className="bg-cream relative">
      {/* Sticky Filter Bar */}
      <div className="sticky top-20 z-40 border-b-2 border-black py-4 bg-cream/95 backdrop-blur-sm">
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

      {/* Project List */}
      <div className="border-b-2 border-black relative z-10 bg-cream">
        {filteredProjects.length > 0 ? (
          <div>
            {filteredProjects.map((project, index) => {
              const isHovered = hoveredProject === project._id;
              const imageUrl = project.featuredImage
                ? urlFor(project.featuredImage).width(800).height(500).url()
                : null;
              
              return (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Link
                    href={`/studio/${project.slug}`}
                    className="group block"
                    onMouseEnter={() => setHoveredProject(project._id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <div className="border-b border-black/20 last:border-b-0 transition-all duration-300 hover:bg-black relative overflow-hidden">
                      {/* Section Background Image - Only shows on hover within this section */}
                      <AnimatePresence>
                        {isHovered && imageUrl && (
                          <motion.div
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0 z-0"
                          >
                            <Image
                              src={imageUrl}
                              alt=""
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/70" />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <Container>
                        <div className="py-12 lg:py-20 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
                          {/* Project Number */}
                          <div className={`font-heading font-bold text-6xl lg:text-8xl transition-colors duration-300 ${
                            isHovered ? 'text-cream/30' : 'text-black/10 group-hover:text-cream/30'
                          }`}>
                            {String(index + 1).padStart(2, '0')}
                          </div>

                          {/* Project Info */}
                          <div className="flex-1 lg:px-12">
                            <span className={`block font-heading text-xs font-bold uppercase tracking-[0.3em] mb-3 transition-colors duration-300 ${
                              isHovered ? 'text-cream/60' : 'text-black/40 group-hover:text-cream/60'
                            }`}>
                              {project.category || 'Project'}
                            </span>
                            <h3 className={`text-3xl lg:text-5xl font-heading font-bold uppercase leading-[0.95] tracking-tight transition-colors duration-300 ${
                              isHovered ? 'text-cream' : 'text-black group-hover:text-cream'
                            }`}>
                              {project.title}
                            </h3>
                            {project.client && (
                              <p className={`mt-3 font-body text-base transition-colors duration-300 ${
                                isHovered ? 'text-cream/70' : 'text-black/50 group-hover:text-cream/70'
                              }`}>
                                {project.client}
                              </p>
                            )}
                          </div>

                          {/* Arrow */}
                          <div className={`flex items-center gap-4 transition-all duration-300 ${
                            isHovered
                              ? 'opacity-100 translate-x-0'
                              : 'opacity-0 group-hover:opacity-100 translate-x-[-20px] group-hover:translate-x-0'
                          }`}>
                            <span className={`font-heading font-bold uppercase tracking-wider text-sm ${
                              isHovered ? 'text-cream' : 'text-cream'
                            }`}>
                              View
                            </span>
                            <div className={`w-12 h-12 border-2 flex items-center justify-center transition-colors ${
                              isHovered
                                ? 'border-cream bg-cream text-black'
                                : 'border-cream bg-cream text-black'
                            }`}>
                              <ArrowUpRight size={20} />
                            </div>
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
