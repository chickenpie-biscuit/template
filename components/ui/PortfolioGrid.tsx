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
  { value: 'design-work', label: 'Design' },
];

export default function PortfolioGrid({ projects }: PortfolioGridProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  // Get the hovered project's image for the full-screen reveal
  const hoveredProjectData = projects.find((p) => p._id === hoveredProject);
  const hoveredImageUrl = hoveredProjectData?.featuredImage
    ? urlFor(hoveredProjectData.featuredImage).width(1920).height(1080).url()
    : null;

  return (
    <section className="bg-cream relative">
      {/* Full-Screen Background Image Reveal */}
      <AnimatePresence>
        {hoveredProject && hoveredImageUrl && (
          <motion.div
            key={hoveredProject}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-0 pointer-events-none"
          >
            <Image
              src={hoveredImageUrl}
              alt=""
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Filter Bar */}
      <div className={`sticky top-20 z-40 border-b-2 border-black py-4 transition-colors duration-300 ${
        hoveredProject ? 'bg-transparent backdrop-blur-md' : 'bg-cream/95 backdrop-blur-sm'
      }`}>
        <Container>
          <div className="flex gap-8 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveFilter(cat.value)}
                className={`font-heading font-bold uppercase text-sm tracking-wider whitespace-nowrap transition-colors ${
                  hoveredProject
                    ? activeFilter === cat.value
                      ? 'text-cream'
                      : 'text-cream/50 hover:text-cream'
                    : activeFilter === cat.value
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
      <div className={`border-b-2 border-black relative z-10 transition-colors duration-300 ${
        hoveredProject ? 'bg-transparent' : 'bg-cream'
      }`}>
        {filteredProjects.length > 0 ? (
          <div>
            {filteredProjects.map((project, index) => {
              const isHovered = hoveredProject === project._id;
              
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
                    <div className={`border-b border-black/20 last:border-b-0 transition-all duration-500 ${
                      hoveredProject
                        ? isHovered
                          ? 'bg-transparent'
                          : 'bg-black/20'
                        : 'hover:bg-black hover:text-cream'
                    }`}>
                      <Container>
                        <div className="py-16 lg:py-24 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                          {/* Project Number */}
                          <div className={`font-heading font-bold text-7xl lg:text-9xl transition-colors duration-300 ${
                            hoveredProject
                              ? isHovered ? 'text-cream' : 'text-cream/20'
                              : 'text-black/10 group-hover:text-cream/30'
                          }`}>
                            {String(index + 1).padStart(2, '0')}
                          </div>

                          {/* Project Info */}
                          <div className="flex-1 lg:px-12">
                            <span className={`block font-heading text-xs font-bold uppercase tracking-[0.3em] mb-4 transition-colors duration-300 ${
                              hoveredProject
                                ? isHovered ? 'text-cream/60' : 'text-cream/30'
                                : 'text-black/40 group-hover:text-cream/60'
                            }`}>
                              {project.category || 'Project'}
                            </span>
                            <h3 className={`text-4xl lg:text-7xl font-heading font-bold uppercase leading-[0.9] tracking-tight transition-colors duration-300 ${
                              hoveredProject
                                ? isHovered ? 'text-cream' : 'text-cream/30'
                                : 'text-black group-hover:text-cream'
                            }`}>
                              {project.title}
                            </h3>
                            {project.client && (
                              <p className={`mt-4 font-body text-lg transition-colors duration-300 ${
                                hoveredProject
                                  ? isHovered ? 'text-cream/70' : 'text-cream/20'
                                  : 'text-black/50 group-hover:text-cream/70'
                              }`}>
                                {project.client}
                              </p>
                            )}
                          </div>

                          {/* Arrow */}
                          <div className={`flex items-center gap-4 transition-all duration-500 ${
                            hoveredProject
                              ? isHovered
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-0 translate-x-4'
                              : 'opacity-0 group-hover:opacity-100 translate-x-[-20px] group-hover:translate-x-0'
                          }`}>
                            <span className={`font-heading font-bold uppercase tracking-wider text-sm ${
                              hoveredProject ? 'text-cream' : 'text-current'
                            }`}>
                              View Project
                            </span>
                            <div className={`w-14 h-14 border-2 flex items-center justify-center transition-colors ${
                              hoveredProject
                                ? 'border-cream bg-cream text-black'
                                : 'border-current bg-cream text-black group-hover:bg-cream group-hover:text-black'
                            }`}>
                              <ArrowUpRight size={24} />
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
              <p className={`font-body text-xl ${hoveredProject ? 'text-cream/60' : 'text-black/60'}`}>
                No projects found in this category.
              </p>
            </div>
          </Container>
        )}
      </div>
    </section>
  );
}
