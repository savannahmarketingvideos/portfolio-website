'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function ShowreelPage() {
  const router = useRouter();
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [showModal, setShowModal] = useState(false);
  const [showCV, setShowCV] = useState(false);

  // Handler for mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMouse({ x, y });
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#000',
        color: '#fff',
        position: 'relative',
        overflowX: 'hidden',
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic spotlight background */}
      <div
        style={{
          pointerEvents: 'none',
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          transition: 'background 0.3s',
          background: `radial-gradient(ellipse 40% 30% at ${mouse.x}% ${mouse.y}%, rgba(80,0,255,0.25), rgba(255,0,150,0.18) 60%, transparent 100%)`,
        }}
      />

      {/* Back button in top left */}
      <div style={{ position: 'fixed', top: 24, left: 24, zIndex: 50 }}>
        <button
          onClick={() => router.back()}
          style={{
            color: 'rgba(255,255,255,0.7)',
            background: 'rgba(0,0,0,0.6)',
            padding: '8px 16px',
            borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            cursor: 'pointer',
            fontSize: 16,
            zIndex: 50,
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>
      </div>

      {/* Content at top center */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 96, position: 'relative', zIndex: 10 }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: 48, textAlign: 'center', letterSpacing: '-2px', textShadow: '0 2px 8px #000' }}>
          Portfolio
        </h1>
        <div style={{ display: 'flex', gap: 32, justifyContent: 'center' }}>
          {/* Showreel Button */}
          <motion.button
            whileHover={{ scale: 1.08, rotate: -2 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '32px 48px',
              borderRadius: 9999,
              background: 'linear-gradient(135deg, #3b82f6 0%, #a21caf 60%, #ec4899 100%)',
              color: '#fff',
              fontSize: 28,
              fontWeight: 700,
              boxShadow: '0 4px 32px 0 rgba(80,0,255,0.15)',
              border: '4px solid rgba(255,255,255,0.2)',
              cursor: 'pointer',
              outline: 'none',
              transition: 'all 0.3s',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            onClick={() => setShowModal(true)}
          >
            <span style={{ marginBottom: 4 }}>Showreel</span>
            <span style={{ fontSize: 16, fontWeight: 400, opacity: 0.8 }}>Watch the latest</span>
          </motion.button>
          {/* CV Button */}
          <motion.button
            whileHover={{ scale: 1.08, rotate: 2 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '32px 48px',
              borderRadius: 9999,
              background: 'linear-gradient(135deg, #fb923c 0%, #ef4444 60%, #ec4899 100%)',
              color: '#fff',
              fontSize: 28,
              fontWeight: 700,
              boxShadow: '0 4px 32px 0 rgba(255,0,150,0.15)',
              border: '4px solid rgba(255,255,255,0.2)',
              cursor: 'pointer',
              outline: 'none',
              transition: 'all 0.3s',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            onClick={() => setShowCV(true)}
          >
            <span style={{ marginBottom: 4 }}>CV</span>
            <span style={{ fontSize: 16, fontWeight: 400, opacity: 0.8 }}>View Experience</span>
          </motion.button>
        </div>
      </div>

      {/* Modal for YouTube embed */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.85)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              position: 'relative',
              width: '90vw',
              maxWidth: 800,
              aspectRatio: '16/9',
              background: '#111',
              borderRadius: 16,
              boxShadow: '0 8px 40px 0 rgba(0,0,0,0.5)',
              overflow: 'hidden',
            }}
            onClick={e => e.stopPropagation()}
          >
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/R-I9MHftIw4?autoplay=1"
              title="Showreel 2025"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ border: 'none', width: '100%', height: '100%' }}
            />
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                background: 'rgba(0,0,0,0.7)',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                padding: '6px 14px',
                fontSize: 18,
                cursor: 'pointer',
                zIndex: 10,
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Modal for CV */}
      {showCV && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.85)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setShowCV(false)}
        >
          <div
            style={{
              position: 'relative',
              width: '90vw',
              maxWidth: 700,
              maxHeight: '90vh',
              background: '#18181b',
              borderRadius: 16,
              boxShadow: '0 8px 40px 0 rgba(0,0,0,0.5)',
              overflowY: 'auto',
              padding: 40,
              color: '#fff',
              fontFamily: 'sans-serif',
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowCV(false)}
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                background: 'rgba(0,0,0,0.7)',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                padding: '6px 14px',
                fontSize: 18,
                cursor: 'pointer',
                zIndex: 10,
              }}
            >
              ×
            </button>
            {/* CV Content */}
            <div style={{ textAlign: 'center', marginBottom: 8 }}>
              <h2 style={{ fontSize: 32, fontWeight: 800, margin: 0, letterSpacing: '-1px' }}>🎬 Connor Collins</h2>
              <div style={{ fontSize: 18, color: '#a3a3a3', margin: '8px 0' }}>Post-Production Editor | Filmmaker | Creative Marketer</div>
              <div style={{ fontSize: 15, color: '#a3a3a3', marginBottom: 8 }}>
                📍 UK &nbsp;|&nbsp; 📧 connorcollins55@gmail.com &nbsp;|&nbsp; 📱 +44 7865286814 &nbsp;|&nbsp; 🌐 www.connorcollins.co.uk
              </div>
            </div>
            <div style={{ borderTop: '1px solid #333', margin: '8px 0 0 0' }} />
            {/* About Me */}
            <div>
              <h3 style={{ fontSize: 20, fontWeight: 700, margin: '16px 0 8px', display: 'flex', alignItems: 'center', gap: 8 }}>🧠 About Me</h3>
              <p style={{ fontSize: 16, color: '#e5e5e5', margin: 0 }}>
                I'm a post-production editor and filmmaker with a marketer's mind and a creative heart. With a First-Class Honours degree in TV & Film Production and hands-on experience ranging from global brands to luxury automotive, I bring stories to life through clean edits, cinematic flair, and bold visual design. I thrive at the intersection of art and strategy—always crafting work that not only looks great, but communicates clearly.
              </p>
            </div>
            {/* Experience */}
            <div>
              <h3 style={{ fontSize: 20, fontWeight: 700, margin: '16px 0 8px', display: 'flex', alignItems: 'center', gap: 8 }}>🎥 Experience</h3>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 600 }}>Marketing Assistant<br /><span style={{ color: '#a3a3a3', fontWeight: 400 }}>Savannah Cars – Luxury Automotive &nbsp;|&nbsp; Oct 2024 – Present</span></div>
                <ul style={{ margin: '4px 0 0 18px', color: '#e5e5e5', fontSize: 15 }}>
                  <li>Captured and edited high-end car photography & video content</li>
                  <li>Designed promotional assets using Photoshop & Lightroom</li>
                  <li>Built marketing campaigns across social media and web</li>
                </ul>
              </div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 600 }}>Freelance Creative<br /><span style={{ color: '#a3a3a3', fontWeight: 400 }}>Self-Employed &nbsp;|&nbsp; 2021 – 2024</span></div>
                <ul style={{ margin: '4px 0 0 18px', color: '#e5e5e5', fontSize: 15 }}>
                  <li>Collaborated on multiple short films, ads, and branded content</li>
                  <li>Edited a short film screened in Romania</li>
                  <li>Created assets for independent creators and small businesses</li>
                  <li>Worked alongside CNN on a music-tech initiative featuring Will.i.am</li>
                </ul>
              </div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 600 }}>Creative Delegate – The Network<br /><span style={{ color: '#a3a3a3', fontWeight: 400 }}>Edinburgh TV Festival 2024 & 2025</span></div>
                <ul style={{ margin: '4px 0 0 18px', color: '#e5e5e5', fontSize: 15 }}>
                  <li>Selected for elite talent development programme</li>
                  <li>Worked with industry mentors, networked with top creatives</li>
                  <li>Gained insight into production, pitching, and broadcast development</li>
                </ul>
              </div>
            </div>
            {/* Skills */}
            <div>
              <h3 style={{ fontSize: 20, fontWeight: 700, margin: '16px 0 8px', display: 'flex', alignItems: 'center', gap: 8 }}>🛠️ Skills</h3>
              <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 12, listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ background: '#27272a', borderRadius: 6, padding: '6px 16px', fontSize: 15 }}>Editing: Adobe Premiere Pro, Avid Media Composer</li>
                <li style={{ background: '#27272a', borderRadius: 6, padding: '6px 16px', fontSize: 15 }}>VFX & Motion Design: After Effects</li>
                <li style={{ background: '#27272a', borderRadius: 6, padding: '6px 16px', fontSize: 15 }}>Photography & Design: Photoshop, Lightroom</li>
                <li style={{ background: '#27272a', borderRadius: 6, padding: '6px 16px', fontSize: 15 }}>Storytelling: Narrative structure, pacing, brand messaging</li>
                <li style={{ background: '#27272a', borderRadius: 6, padding: '6px 16px', fontSize: 15 }}>Social Content: Platform-native shortform editing & thumbnails</li>
              </ul>
            </div>
            {/* Education */}
            <div>
              <h3 style={{ fontSize: 20, fontWeight: 700, margin: '16px 0 8px', display: 'flex', alignItems: 'center', gap: 8 }}>🎓 Education</h3>
              <div style={{ fontWeight: 600 }}>BA (Hons) TV & Film Production – First Class<br /><span style={{ color: '#a3a3a3', fontWeight: 400 }}>University of [Your Uni], 2024</span></div>
              <ul style={{ margin: '4px 0 0 18px', color: '#e5e5e5', fontSize: 15 }}>
                <li>Specialized in editing, storytelling, and visual aesthetics</li>
                <li>Directed and edited multiple short films and promotional videos</li>
              </ul>
            </div>
            {/* Highlights */}
            <div>
              <h3 style={{ fontSize: 20, fontWeight: 700, margin: '16px 0 8px', display: 'flex', alignItems: 'center', gap: 8 }}>🏆 Highlights</h3>
              <ul style={{ margin: '4px 0 0 18px', color: '#e5e5e5', fontSize: 15 }}>
                <li>Edited a film screened internationally (Romania, 2023)</li>
                <li>Collaborated with CNN & Will.i.am on a global creative tech project</li>
                <li>Part of The Network talent programme, Edinburgh TV Festival</li>
                <li>Built a branded content pipeline for Savannah Cars' luxury inventory</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </main>
  );
} 