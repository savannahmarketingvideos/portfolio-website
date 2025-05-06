'use client';

import React, { useRef, useState } from "react";
import './about.css';

function InteractiveSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});
  const [hovered, setHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / rect.height) * 10;
    const rotateY = (x / rect.width) * 10;
    setStyle({
      transform: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`,
    });
  }

  function handleMouseLeave() {
    setStyle({ transform: "none" });
    setHovered(false);
  }

  function handleMouseEnter() {
    setHovered(true);
  }

  return (
    <div
      ref={ref}
      className={`about-section${hovered ? " is-hovered" : ""}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="about-gradient-bg">
      <header className="about-header">
        <h1>About Me</h1>
        <p>
          I'm a creative visual storyteller, blending technical mastery with a passion for cinematic experiences and luxury cars.
        </p>
      </header>
      <InteractiveSection>
        <h2>My Story</h2>
        <p>
          From a young age, I was captivated by the beauty and power of high-end cars. My journey began behind the lens, chasing the perfect shot, and evolved into a full-blown passion for post-production and cinematic storytelling. Every frame I create is a blend of precision, emotion, and a relentless drive for excellence.
        </p>
      </InteractiveSection>
      <InteractiveSection>
        <h2>What I Do</h2>
        <p>
          <strong>Photography:</strong> Capturing the soul of luxury vehicles with creative, high-impact imagery.<br />
          <strong>Cinematic Filming:</strong> Crafting cinematic stories that elevate brands and captivate audiences.<br />
          <strong>Post-Production:</strong> Expert editing, color grading, and VFX for a polished, professional finish.
        </p>
      </InteractiveSection>
      <InteractiveSection>
        <h2>Why Work With Me?</h2>
        <p>
          Every project is unique. I listen, adapt, and deliver visuals that match your vision and brand. Let's create something extraordinary together.
        </p>
      </InteractiveSection>
    </div>
  );
} 