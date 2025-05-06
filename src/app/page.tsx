'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

const photos = [
  '/photos/FJ9A1872.JPG',
  '/photos/FJ9A1869.JPG',
  '/photos/FJ9A1838.JPG',
  '/photos/FJ9A1837.JPG',
  '/photos/FJ9A1836.JPG',
  '/photos/FJ9A1835.JPG',
];

export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);
  const showreelRef = useRef<HTMLDivElement>(null);
  const navRightRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const [navDebug, setNavDebug] = useState<any>(null);

  const addDebugInfo = (info: string) => {
    console.log(info);
    setDebugInfo(prev => [...prev, info]);
  };

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      addDebugInfo('Starting image preload...');
      console.log('Photos array:', photos);
      
      for (const photo of photos) {
        try {
          const response = await fetch(photo);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          addDebugInfo(`Successfully loaded: ${photo}`);
        } catch (error) {
          addDebugInfo(`Error loading ${photo}: ${error}`);
          console.error('Error loading image:', error);
        }
      }
      
      setIsLoading(false);
      addDebugInfo('Finished preloading images');
    };

    preloadImages();
  }, []);

  const nextImage = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
    addDebugInfo(`Moving to next image: ${photos[(currentPhotoIndex + 1) % photos.length]}`);
  };

  const previousImage = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
    addDebugInfo(`Moving to previous image: ${photos[(currentPhotoIndex - 1 + photos.length) % photos.length]}`);
  };

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Debug current photo
  useEffect(() => {
    console.log('Current photo index:', currentPhotoIndex);
    console.log('Current photo path:', photos[currentPhotoIndex]);
  }, [currentPhotoIndex]);

  useLayoutEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    const showreelRect = showreelRef.current?.getBoundingClientRect();
    const navRightRect = navRightRef.current?.getBoundingClientRect();
    const socialRect = socialRef.current?.getBoundingClientRect();
    setNavDebug({
      showreel: showreelRect,
      navRight: navRightRect,
      social: socialRect,
      showreelClass: showreelRef.current?.className,
      navRightClass: navRightRef.current?.className,
      socialClass: socialRef.current?.className,
    });
    console.log('Showreel:', showreelRect, showreelRef.current?.className);
    console.log('NavRight:', navRightRect, navRightRef.current?.className);
    console.log('Social:', socialRect, socialRef.current?.className);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className="fixed w-8 h-8 rounded-full border-2 border-white pointer-events-none z-50 mix-blend-difference"
      />

      {/* Showreel - left, aligned with text block bottom */}
      <motion.div
        ref={showreelRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="fixed left-12 bottom-[28vh] z-20"
      >
        <Link
          href="/showreel"
          className="inline-flex items-center gap-8 text-7xl uppercase tracking-[.35em] border-4 border-white rounded-xl shadow-xl transition-all duration-200 font-black drop-shadow-xl"
          style={{letterSpacing: '0.35em', paddingLeft: '2.5rem', paddingRight: '2.5rem', paddingTop: '1.2rem', paddingBottom: '1.2rem', backgroundColor: 'white', color: 'black'}}
        >
          Showreel
          <svg 
            className="w-10 h-10 ml-4" 
            fill="none" 
            stroke="black" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2.5} 
              d="M14 5l7 7m0 0l-7 7m7-7H3" 
            />
          </svg>
        </Link>
      </motion.div>

      {/* Projects/About - bottom right, above social icons */}
      <motion.div
        ref={navRightRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="fixed right-12 z-20 flex items-center gap-16"
        style={{ bottom: '10vh' }}
      >
        <div style={{ marginLeft: '1.5rem', display: 'inline-block' }}>
          <Link
            href="/contact"
            className="shimmer-hover ml-[1.5rem] inline-flex items-center gap-8 py-20 text-7xl uppercase tracking-[.35em] text-black border-4 border-white bg-white rounded-[5rem] shadow-xl transition-all duration-200 font-black drop-shadow-xl"
            style={{letterSpacing: '0.35em', paddingLeft: '2.5rem', paddingRight: '2.5rem'}}
          >
            Contact
          </Link>
        </div>
        <Link
          href="/projects"
          className="shimmer-hover inline-flex items-center gap-8 py-20 text-7xl uppercase tracking-[.35em] text-black border-4 border-white bg-white rounded-[5rem] shadow-xl transition-all duration-200 font-black drop-shadow-xl"
          style={{letterSpacing: '0.35em', paddingLeft: '2.5rem', paddingRight: '2.5rem'}}
        >
          Projects
        </Link>
        <Link
          href="/about"
          className="shimmer-hover inline-flex items-center gap-8 py-20 text-7xl uppercase tracking-[.35em] text-black border-4 border-white bg-white rounded-[5rem] shadow-xl transition-all duration-200 font-black drop-shadow-xl"
          style={{letterSpacing: '0.35em', paddingLeft: '2.5rem', paddingRight: '2.5rem'}}
        >
          About
        </Link>
      </motion.div>

      {/* Social - right, bottom */}
      <motion.div
        ref={socialRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="fixed right-12 bottom-12 z-20 flex items-center gap-6"
      >
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white/70 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
        <a 
          href="https://behance.net" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white/70 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
          </svg>
        </a>
      </motion.div>

      {/* Photo Slideshow */}
      <div className="fixed inset-0 -z-10 h-screen w-screen">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="text-white text-2xl">Loading images...</div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhotoIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
              className="absolute inset-0 h-full w-full"
            >
              <div className="absolute inset-0 h-full w-full">
                <div className="relative h-full w-full">
                  <Image
                    src={photos[currentPhotoIndex]}
                    alt={`Automotive photography ${currentPhotoIndex + 1}`}
                    fill
                    quality={100}
                    priority
                    sizes="100vw"
                    className="object-cover object-center brightness-[0.6]"
                    onLoad={() => {
                      setImageError(null);
                      addDebugInfo(`Successfully displayed: ${photos[currentPhotoIndex]}`);
                    }}
                    onError={() => {
                      const error = `Failed to load: ${photos[currentPhotoIndex]}`;
                      console.error(error);
                      setImageError(error);
                      addDebugInfo(error);
                      nextImage();
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent pointer-events-none" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Minimal Image Navigation */}
        <div className="absolute bottom-12 md:bottom-24 right-12 md:right-24 flex gap-3 z-20">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPhotoIndex(index)}
              className={`w-12 h-[2px] transition-all duration-300 ${
                index === currentPhotoIndex ? 'bg-white' : 'bg-white/30'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Debug overlay - only shown in development */}
      {process.env.NODE_ENV === 'development' && imageError && (
        <div className="fixed top-4 left-4 bg-red-500/80 text-white p-4 rounded-lg z-50">
          {imageError}
        </div>
      )}

      {/* Content */}
      <div className="relative min-h-screen flex flex-col justify-between p-12 md:p-24">
        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl"
          >
            <motion.h1
              className="text-[4rem] md:text-[6rem] lg:text-[8rem] font-bold leading-none tracking-tighter mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="block">CINEMATIC</span>
              <span className="block">EDITOR</span>
              <span className="block">AUTOMOTIVE</span>
              <span className="block">MARKETER.</span>
            </motion.h1>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
