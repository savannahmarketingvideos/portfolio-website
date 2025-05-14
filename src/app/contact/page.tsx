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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<{
    type: "success" | "error" | "sending" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        type: "error",
        message: "Please fill in all fields",
      });
      return;
    }

    // Set sending status
    setStatus({
      type: "sending",
      message: "Sending your message...",
    });

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Clear form
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        setStatus({
          type: "success",
          message: "Message sent successfully! I'll get back to you soon.",
        });
      } else {
        setStatus({
          type: "error",
          message: data.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again later.",
      });
    }
  };

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
            <form className="contact-form" autoComplete="off" onSubmit={handleSubmit}>
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder="Your name" 
                autoComplete="off" 
                required 
                value={formData.name}
                onChange={handleChange}
              />
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="your@email.com" 
                autoComplete="off" 
                required 
                value={formData.email}
                onChange={handleChange}
              />
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows={4} 
                placeholder="Tell me about your project, idea, or just say hi!" 
                required 
                value={formData.message}
                onChange={handleChange}
              />
              
              {status.type && (
                <div 
                  className={`message-status ${status.type}`} 
                  style={{
                    padding: "10px",
                    borderRadius: "4px",
                    marginBottom: "16px",
                    backgroundColor: status.type === "success" ? "#e6f7ef" : 
                                     status.type === "error" ? "#fae1e2" :
                                     "#e6f1f7",
                    color: status.type === "success" ? "#0f7b41" : 
                           status.type === "error" ? "#d13b40" :
                           "#0a558c",
                    border: `1px solid ${
                      status.type === "success" ? "#a3e2c6" : 
                      status.type === "error" ? "#f7bfc0" :
                      "#b8d3e6"
                    }`
                  }}
                >
                  {status.message}
                </div>
              )}
              
              <button 
                type="submit" 
                disabled={status.type === "sending"}
                style={{ opacity: status.type === "sending" ? 0.7 : 1 }}
              >
                {status.type === "sending" ? "Sending..." : "Send Message"}
              </button>
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