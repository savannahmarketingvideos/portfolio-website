'use client';

import React, { useRef, useState } from "react";
import "./contact.css";

function InteractiveCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});
  const [hovered, setHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / rect.height) * 8;
    const rotateY = (x / rect.width) * 8;
    setStyle({
      transform: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.025)`,
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
      className={`contact-card${hovered ? " is-hovered" : ""}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="contact-gradient-bg">
      <header className="contact-header">
        <h1>Let's Connect</h1>
        <p>
          Whether you have a project in mind, want to collaborate, or just want to say hello—I'd love to hear from you. I believe the best work comes from genuine connection and creative partnership.
        </p>
      </header>
      <div className="contact-content">
        <div className="contact-form-section">
          <InteractiveCard>
            <h2 style={{ color: '#111' }}>Send a Message</h2>
            <form className="contact-form" autoComplete="off">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" placeholder="Your name" autoComplete="off" required />
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="your@email.com" autoComplete="off" required />
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={4} placeholder="Tell me about your project, idea, or just say hi!" required />
              <button type="submit">Send Message</button>
            </form>
          </InteractiveCard>
        </div>
        <div className="contact-info-section">
          <InteractiveCard>
            <h2 style={{ color: '#111' }}>Contact Details</h2>
            <div className="contact-info-list">
              <a href="mailto:connorcollins55@gmail.com" className="contact-info-item">
                <span className="contact-icon">📧</span> connorcollins55@gmail.com
              </a>
              <a href="tel:+1234567890" className="contact-info-item">
                <span className="contact-icon">📞</span> +44 7865286814
              </a>
            </div>
          </InteractiveCard>
        </div>
      </div>
    </div>
  );
} 