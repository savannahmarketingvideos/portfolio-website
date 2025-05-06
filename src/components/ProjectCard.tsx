'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  link: string;
}

export default function ProjectCard({
  title,
  description,
  imageUrl,
  tags,
  link,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="group relative bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden"
    >
      <div className="relative h-[400px] w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700" />
        
        {/* Hover overlay with animated border */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-[1px] border border-white/20" />
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" />
            <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white to-transparent" />
            <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white to-transparent" />
          </div>
        </div>
      </div>
      
      <div className="relative p-8 z-10">
        <motion.h3 
          className="text-2xl font-bold mb-3"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {title}
        </motion.h3>
        
        <motion.p 
          className="text-zinc-400 mb-6 line-clamp-2"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {description}
        </motion.p>
        
        <motion.div 
          className="flex flex-wrap gap-2 mb-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-zinc-800/50 text-zinc-400 text-sm border border-zinc-700/50"
            >
              {tag}
            </span>
          ))}
        </motion.div>
        
        <motion.a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm text-white hover:text-zinc-300 transition-colors group/link"
          whileHover={{ x: 5 }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          View Project
          <svg
            className="w-4 h-4 ml-2 transform transition-transform group-hover/link:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </motion.a>
      </div>
    </motion.div>
  );
} 