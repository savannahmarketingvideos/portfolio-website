'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const services = [
  {
    title: "Automotive Photography",
    description: "Professional photography services for luxury and high-end vehicles, capturing their essence through expert composition and lighting.",
    features: [
      "Studio and location shoots",
      "Product photography",
      "Editorial style",
      "High-resolution deliverables"
    ]
  },
  {
    title: "Video Production",
    description: "Cinematic video production services for automotive brands, creating engaging content that tells your brand's story.",
    features: [
      "Commercial production",
      "Brand films",
      "Social media content",
      "Behind-the-scenes footage"
    ]
  },
  {
    title: "Post-Production",
    description: "Expert post-production services including color grading, editing, and visual effects to create polished, professional content.",
    features: [
      "Color grading",
      "Video editing",
      "Motion graphics",
      "Visual effects"
    ]
  }
];

export default function Services() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Automotive Visuals
          </Link>
          <nav className="flex gap-6">
            <Link href="/work" className="text-zinc-400 hover:text-white transition-colors">Work</Link>
            <Link href="/about" className="text-zinc-400 hover:text-white transition-colors">About</Link>
            <Link href="/services" className="text-white">Services</Link>
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
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Services
          </h1>

          <div className="space-y-12">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="p-8 rounded-lg bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50"
              >
                <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
                <p className="text-zinc-300 mb-6">{service.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center gap-2 text-zinc-300"
                    >
                      <svg
                        className="w-5 h-5 text-zinc-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16 text-center"
          >
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-black font-medium hover:bg-zinc-200 transition-colors rounded-lg"
            >
              Get in Touch
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
} 