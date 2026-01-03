'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Container from './Container';

interface PortfolioGridProps {
  projects: any[];
}

const categories = [
  { value: 'all', label: 'All' },
  { value: 'branding', label: 'Branding' },
  { value: 'web', label: 'Web' },
  { value: 'illustration', label: 'Illustration' },
];

export default function PortfolioGrid({ projects }: PortfolioGridProps) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section className="py-16 lg:py-24 bg-cream border-b-2 border-black">
      <Container>
        <motion.h2
          className="text-4xl font-heading font-bold uppercase text-center mb-8 text-black"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Portfolio
        </motion.h2>

        {/* Filter Tags */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              className={`px-4 py-2 font-heading font-bold uppercase text-sm border-2 border-black transition-colors ${
                activeFilter === cat.value
                  ? 'bg-red-200 text-red-300'
                  : 'bg-cream text-black hover:bg-cream-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => {
              const imageUrl = project.featuredImage
                ? urlFor(project.featuredImage).width(600).height(400).url()
                : null;

              return (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={`/studio/${project.slug}`} className="block group">
                    <div className="bg-cream border-2 border-black overflow-hidden hover:shadow-lg transition-all group-hover:-translate-y-2">
                      {imageUrl && (
                        <div className="relative w-full aspect-[4/3] bg-black">
                          <Image
                            src={imageUrl}
                            alt={project.featuredImage?.alt || project.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 font-heading font-bold uppercase text-cream border-2 border-cream px-4 py-2 transition-opacity">
                              View Project
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-heading font-bold text-xl uppercase text-black">
                            {project.title}
                          </h3>
                          {project.year && (
                            <span className="font-body text-sm text-black/60">
                              {project.year}
                            </span>
                          )}
                        </div>
                        {project.category && (
                          <span className="inline-block px-2 py-1 text-xs font-heading font-bold uppercase bg-red-200 text-red-300 border border-black">
                            {project.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <p className="text-center font-body text-black/60 py-12">
            No projects found. Check back soon!
          </p>
        )}
      </Container>
    </section>
  );
}

