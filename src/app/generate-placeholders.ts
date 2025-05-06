import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';

const generatePlaceholder = (width: number, height: number, text: string, filename: string, isHero = false) => {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Create cinematic gradient background
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  if (isHero) {
    gradient.addColorStop(0, '#1a1a1a');
    gradient.addColorStop(0.5, '#262626');
    gradient.addColorStop(1, '#0a0a0a');
  } else {
    gradient.addColorStop(0, '#0a0a0a');
    gradient.addColorStop(0.5, '#1a1a1a');
    gradient.addColorStop(1, '#000000');
  }
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Add cinematic overlay
  const overlay = ctx.createLinearGradient(0, 0, 0, height);
  overlay.addColorStop(0, 'rgba(0,0,0,0.7)');
  overlay.addColorStop(0.5, 'rgba(0,0,0,0.3)');
  overlay.addColorStop(1, 'rgba(0,0,0,0.8)');
  ctx.fillStyle = overlay;
  ctx.fillRect(0, 0, width, height);

  // Add light streaks
  for (let i = 0; i < 5; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const streakGradient = ctx.createLinearGradient(
      x, y,
      x + Math.random() * 200 - 100,
      y + Math.random() * 200 - 100
    );
    streakGradient.addColorStop(0, 'rgba(255,255,255,0)');
    streakGradient.addColorStop(0.5, 'rgba(255,255,255,0.1)');
    streakGradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = streakGradient;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 200, y - 100);
    ctx.lineTo(x + 200, y + 100);
    ctx.closePath();
    ctx.fill();
  }

  // Add grid pattern for hero
  if (isHero) {
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 1;
    const gridSize = 50;
    
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }

  // Add text with cinematic style
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  ctx.font = isHero ? 'bold 72px Arial' : 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Add text shadow
  ctx.shadowColor = 'rgba(0,0,0,0.5)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  
  ctx.fillText(text, width / 2, height / 2);

  // Save to file
  const buffer = canvas.toBuffer('image/jpeg', { quality: 0.95 });
  fs.writeFileSync(path.join(process.cwd(), 'public', filename), buffer);
};

// Generate placeholders
generatePlaceholder(1200, 800, 'LUXURY AUTOMOTIVE', 'project1.jpg');
generatePlaceholder(1200, 800, 'POST PRODUCTION', 'project2.jpg');
generatePlaceholder(1200, 800, 'CINEMATIC FILMS', 'project3.jpg');
generatePlaceholder(1920, 1080, 'AUTOMOTIVE EXCELLENCE', 'hero-bg.jpg', true); 