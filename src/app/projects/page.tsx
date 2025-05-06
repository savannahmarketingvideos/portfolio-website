"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Rnd } from "react-rnd";

const categories = [
  {
    key: "photo",
    label: "Automotive Photography",
  },
  {
    key: "edit",
    label: "Post-Production Editing",
  },
  {
    key: "film",
    label: "Cinematic Filming",
  },
];

type ProjectItem = {
  title: string;
  img?: string;
  video?: string;
  type: 'image' | 'video';
};

const placeholderData: Record<string, ProjectItem[]> = {
  photo: [
    { title: "Supercar Studio", img: "/project1.jpg", type: "image" },
    { title: "Sunset Drive", img: "/project2.jpg", type: "image" },
    { title: "Urban Night", img: "/project3.jpg", type: "image" },
    { title: "Track Day", img: "/project1.jpg", type: "image" },
    { title: "Night Lights", img: "/project2.jpg", type: "image" },
    { title: "Desert Run", img: "/project3.jpg", type: "image" },
    { title: "Rainy Reflections", img: "/project1.jpg", type: "image" },
  ],
  edit: [
    { 
      title: "Color Grading Magic", 
      img: "/edit1.jpg",
      type: "image"
    },
    {
      title: "Post-Production Reel 1",
      video: "/reel1.mp4",
      type: "video"
    },
    {
      title: "Post-Production Reel 2",
      video: "/reel2.mp4",
      type: "video"
    },
    {
      title: "Post-Production Reel 3",
      video: "/reel3.mp4",
      type: "video"
    },
    {
      title: "Post-Production Reel 4",
      video: "/reel4.mp4",
      type: "video"
    }
  ],
  film: [
    { title: "Brand Story", img: "/film1.JPG", type: "image" },
    { title: "Cinematic Teaser", img: "/film2.JPG", type: "image" },
    { title: "Behind the Wheel", img: "/film3.JPG", type: "image" },
    { title: "Luxury Launch", img: "/film4.JPG", type: "image" },
    { title: "Night Run", img: "/film5.JPG", type: "image" },
  ],
};

// Animated, floating black dots on a light background, reacting to mouse direction
function MotionBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ vx: 0, vy: 0 });
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationId: number;
    // Dots
    const DOTS = 48;
    const dots = Array.from({ length: DOTS }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 6 + Math.random() * 8,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
    }));
    // Resize
    function resize() {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener("resize", resize);
    resize();
    // Mouse move
    let lastX = width / 2, lastY = height / 2;
    function onMouseMove(e: MouseEvent) {
      const nx = e.clientX;
      const ny = e.clientY;
      mouse.current.vx = (nx - lastX) * 0.08;
      mouse.current.vy = (ny - lastY) * 0.08;
      lastX = nx;
      lastY = ny;
    }
    window.addEventListener("mousemove", onMouseMove);
    // Animation loop
    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#f7f7fa";
      ctx.fillRect(0, 0, width, height);
      for (let i = 0; i < DOTS; ++i) {
        const d = dots[i];
        // Apply mouse velocity
        d.dx += mouse.current.vx * 0.04 + (Math.random() - 0.5) * 0.02;
        d.dy += mouse.current.vy * 0.04 + (Math.random() - 0.5) * 0.02;
        // Damping
        d.dx *= 0.97;
        d.dy *= 0.97;
        d.x += d.dx;
        d.y += d.dy;
        // Wrap around edges
        if (d.x < -d.r) d.x = width + d.r;
        if (d.x > width + d.r) d.x = -d.r;
        if (d.y < -d.r) d.y = height + d.r;
        if (d.y > height + d.r) d.y = -d.r;
        // Draw dot
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = "#111";
        ctx.globalAlpha = 0.82;
        ctx.shadowColor = "#000";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }
      // Slowly decay mouse velocity
      mouse.current.vx *= 0.92;
      mouse.current.vy *= 0.92;
      animationId = requestAnimationFrame(animate);
    }
    animate();
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        background: "#f7f7fa"
      }}
    />
  );
}

export default function Projects() {
  const [selected, setSelected] = useState<"photo" | "edit" | "film">("photo");
  const [bannerHeight] = useState<number>(143); // locked in
  const positions = [146, 791, 494]; // locked in

  // Locked-in positions and sizes for 'Home' and 'Contact'
  const home = { x: 1597, y: 45, size: 15 };
  const contact = { x: 1590, y: 77, size: 15 };

  return (
    <main className="min-h-screen bg-black text-white pt-[140px]">
      <MotionBackground />
      {/* Top Banner */}
      <header className="fixed top-0 left-0 w-full flex flex-col items-center bg-transparent z-[100] projects-header-fix" style={{ top: 0, left: 0, marginTop: 0, paddingTop: 0, zIndex: 100 }}>
        <div className="flex justify-center w-full">
          <div
            className="border-4 border-red-500 rounded-3xl shadow-2xl px-16 flex items-center justify-between min-w-[600px] max-w-5xl w-full gap-12 relative"
            style={{ backgroundColor: '#fff', opacity: 1, zIndex: 50, height: bannerHeight }}
          >
            <Link
              href="/"
              style={{ position: 'absolute', left: home.x, top: home.y, fontSize: home.size, fontWeight: 700, color: '#000', userSelect: 'none', zIndex: 2000, textDecoration: 'none', cursor: 'pointer' }}
              aria-label="Home"
            >
              Home
            </Link>
            <Link
              href="/contact"
              style={{ position: 'absolute', left: contact.x, top: contact.y, fontSize: contact.size, fontWeight: 700, color: '#000', userSelect: 'none', zIndex: 2000, textDecoration: 'none', cursor: 'pointer' }}
              aria-label="Contact"
            >
              Contact
            </Link>
            <nav className="relative w-full" style={{ minHeight: 60 }}>
              {categories.map((cat, idx) => (
                <motion.button
                  key={cat.key}
                  onClick={() => setSelected(cat.key as 'photo' | 'edit' | 'film')}
                  className={`bg-transparent border-none shadow-none rounded-none px-0 py-0 text-3xl md:text-4xl font-extrabold uppercase tracking-widest transition-all duration-200 whitespace-nowrap
                    ${selected === cat.key
                      ? 'text-black border-b-4 border-black'
                      : 'text-zinc-500 hover:text-black'}
                  `}
                  style={{ letterSpacing: '.18em', position: 'absolute', top: 0, left: positions[idx] }}
                  whileHover={{ scale: 1.18 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                >
                  {cat.label}
                </motion.button>
              ))}
            </nav>
          </div>
        </div>
      </header>
      {/* End Top Banner */}

      {/* Animated Gallery Grid */}
      {selected === "film" ? (
        <section className="pb-24 pt-8 w-screen" style={{paddingLeft: 0, paddingRight: 0, marginLeft: 0, marginRight: 0, maxWidth: '100vw'}}>
          <div className="grid grid-cols-2 gap-0 w-screen" style={{width: '100vw', maxWidth: '100vw'}}>
            {placeholderData.film.map((item, index) => (
              <div key={index} className="relative overflow-hidden bg-zinc-900/70 h-[60vw] min-h-[400px]">
                {item.type === "image" && item.img && (
                  <Image 
                    src={item.img} 
                    alt={item.title} 
                    fill 
                    sizes="50vw"
                    className="object-cover transition-transform duration-700 hover:scale-105" 
                    priority={index < 2}
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      ) : selected === "photo" ? (
        <section className="max-w-[1600px] mx-auto px-2 pb-24 pt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-4 grid-rows-3 gap-4 min-h-[80vh] md:min-h-[90vh]"
              style={{ gridTemplateAreas: `
                'a b c d'
                'e f f g'
                'h i j k'
              ` }}
            >
              {/* Top row images */}
              <div className="relative rounded-xl overflow-hidden shadow-lg border border-zinc-700/40 bg-zinc-900/70 col-span-1 row-span-1" style={{ gridArea: 'a' }}>
                <Image src="/project1.jpg" alt="Project 1" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-700 hover:scale-105" />
              </div>
              <div className="relative rounded-xl overflow-hidden shadow-lg border border-zinc-700/40 bg-zinc-900/70 col-span-1 row-span-1" style={{ gridArea: 'b' }}>
                <Image src="/project2.jpg" alt="Project 2" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-700 hover:scale-105" />
              </div>
              <div className="relative rounded-xl overflow-hidden shadow-lg border border-zinc-700/40 bg-zinc-900/70 col-span-1 row-span-1" style={{ gridArea: 'c' }}>
                <Image src="/project3.jpg" alt="Project 3" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-700 hover:scale-105" />
              </div>
              <div className="relative rounded-xl overflow-hidden shadow-lg border border-zinc-700/40 bg-zinc-900/70 col-span-1 row-span-1" style={{ gridArea: 'd' }}>
                <Image src="/project4.jpg" alt="Project 4" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-700 hover:scale-105" />
              </div>
              {/* Center row: two central images merged visually */}
              <div className="relative rounded-l-2xl overflow-hidden shadow-2xl border border-zinc-700/40 bg-zinc-900/80 col-span-1 row-span-1" style={{ gridArea: 'e' }}>
                <Image src="/project5.jpg" alt="Project 5" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-700 hover:scale-105" />
              </div>
              <div className="relative col-span-2 row-span-1 flex" style={{ gridArea: 'f', gap: 0 }}>
                <div className="relative w-1/2 h-full">
                  <Image src="/project6.jpg" alt="Project 6" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-700 hover:scale-105" />
                </div>
                <div className="relative w-1/2 h-full">
                  <Image src="/project7.jpg" alt="Project 7" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-700 hover:scale-105" />
                </div>
              </div>
              <div className="relative rounded-r-2xl overflow-hidden shadow-2xl border border-zinc-700/40 bg-zinc-900/80 col-span-1 row-span-1" style={{ gridArea: 'g' }}>
                <Image src="/project8.jpg" alt="Project 8" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-700 hover:scale-105" />
              </div>
              {/* Bottom row images */}
              <div className="relative rounded-xl overflow-hidden shadow-lg border border-zinc-700/40 bg-zinc-900/70 col-span-1 row-span-1" style={{ gridArea: 'h' }}>
                <Image src="/project9.jpg" alt="Project 9" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-700 hover:scale-105" />
              </div>
              <div className="relative rounded-xl overflow-hidden shadow-lg border border-zinc-700/40 bg-zinc-900/70 col-span-1 row-span-1" style={{ gridArea: 'i' }}>
                <Image src="/project10.jpg" alt="Project 10" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-700 hover:scale-105" />
              </div>
              <div className="relative rounded-xl overflow-hidden shadow-lg border border-zinc-700/40 bg-zinc-900/70 col-span-1 row-span-1" style={{ gridArea: 'j' }}>
                <Image src="/project11.jpg" alt="Project 11" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-700 hover:scale-105" />
              </div>
              <div className="relative rounded-xl overflow-hidden shadow-lg border border-zinc-700/40 bg-zinc-900/70 col-span-1 row-span-1" style={{ gridArea: 'k' }}>
                <Image src="/project12.jpg" alt="Project 12" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            </motion.div>
          </AnimatePresence>
        </section>
      ) : selected === "edit" ? (
        <section className="max-w-4xl mx-auto px-2 pb-24 pt-2 w-full">
          {/* Draggable & resizable videos, no photo, minimal top gap */}
          <div className="relative w-full min-h-[700px]" style={{height: 900, marginTop: 0, paddingTop: 0}}>
            {[
              {num: 1, x: 40, y: 11, width: 379, height: 700},
              {num: 2, x: 543, y: 200, width: 400, height: 700},
              {num: 3, x: 1513, y: 194, width: 400, height: 700},
              {num: 4, x: 1027, y: 14, width: 400, height: 700},
            ].map(({num, x, y, width, height}) => (
              <Rnd
                key={num}
                default={{ x, y, width, height }}
                bounds="parent"
                minWidth={120}
                minHeight={200}
                maxWidth={400}
                maxHeight={700}
                onDragStop={(e, d) => {
                  console.log(`Video ${num} position:`, d.x, d.y);
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                  console.log(`Video ${num} size:`, ref.style.width, ref.style.height, 'position:', position);
                }}
                className="z-10"
              >
                <video
                  src={`/reel${num}.mp4`}
                  className="w-full h-full object-contain bg-black rounded-xl border border-zinc-700/40"
                  controls
                  playsInline
                  preload="metadata"
                />
              </Rnd>
            ))}
          </div>
        </section>
      ) : selected === "film" ? (
        <section className="pb-24 pt-8 w-screen" style={{paddingLeft: 0, paddingRight: 0, marginLeft: 0, marginRight: 0, maxWidth: '100vw'}}>
          <div className="grid grid-cols-2 gap-0 w-screen" style={{width: '100vw', maxWidth: '100vw'}}>
            {placeholderData.film.map((item, index) => (
              <div key={index} className="relative overflow-hidden bg-zinc-900/70 h-[60vw] min-h-[400px]">
                {item.type === "image" && item.img && (
                  <Image 
                    src={item.img} 
                    alt={item.title} 
                    fill 
                    sizes="50vw"
                    className="object-cover transition-transform duration-700 hover:scale-105" 
                    priority={index < 2}
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
} 