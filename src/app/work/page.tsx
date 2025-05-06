'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const projects = [
  {
    title: "Luxury Car Showcase",
    description: "High-end automotive photography and cinematography for premium vehicle brands.",
    imageUrl: "/project1.jpg",
    tags: ["Automotive", "Photography", "Cinematography"],
    link: "#"
  },
  {
    title: "Post-Production Mastery",
    description: "Professional video editing and color grading for automotive marketing campaigns.",
    imageUrl: "/project2.jpg",
    tags: ["Post-Production", "Color Grading", "Editing"],
    link: "#"
  },
  {
    title: "Brand Film Series",
    description: "Cinematic storytelling through automotive brand films and commercial content.",
    imageUrl: "/project3.jpg",
    tags: ["Film", "Commercial", "Direction"],
    link: "#"
  }
];

export default function Work() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Automotive Visuals
          </Link>
          <nav className="flex gap-6">
            <Link href="/work" className="text-white">Work</Link>
            <Link href="/about" className="text-zinc-400 hover:text-white transition-colors">About</Link>
            <Link href="/services" className="text-zinc-400 hover:text-white transition-colors">Services</Link>
            <Link href="/contact" className="text-zinc-400 hover:text-white transition-colors">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-24 pb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Featured Work
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group relative overflow-hidden rounded-lg bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 hover:border-zinc-500/50 transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-zinc-200 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 mb-4 group-hover:text-zinc-300 transition-colors">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 text-sm bg-zinc-700/50 text-zinc-300 rounded-full group-hover:bg-zinc-600/50 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    className="inline-flex items-center text-zinc-300 hover:text-white transition-colors"
                  >
                    View Project
                    <svg
                      className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
} 