'use client';

import { useEffect, useRef } from 'react';

export default function InteractiveRays() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const beams: {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      lineWidth: number;
      color: string;
      glowColor: string;
    }[] = [];

    const colorGreen = 'rgba(0, 230, 118, 0.4)';
    const colorPurple = 'rgba(139, 92, 246, 0.35)';

    const initBeams = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      beams.length = 0;
      const count = 6; // FEW beams, but highly-designed & beautiful
      for (let i = 0; i < count; i++) {
        const isGreen = Math.random() > 0.4;
        beams.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          length: Math.random() * 350 + 250,
          speed: Math.random() * 0.3 + 0.1,
          angle: Math.random() * Math.PI * 2,
          lineWidth: Math.random() * 1.5 + 1.2,
          color: isGreen ? colorGreen : colorPurple,
          glowColor: isGreen ? 'rgba(0, 230, 118, 0.6)' : 'rgba(139, 92, 246, 0.6)'
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const b of beams) {
        // 1. Update Beam Physics (Floating Drift)
        b.x += Math.cos(b.angle) * b.speed;
        b.y += Math.sin(b.angle) * b.speed;
        b.angle += (Math.random() - 0.5) * 0.02; // slow fluid curve

        // Screen Loop wrappers
        if (b.x < -b.length) b.x = canvas.width + b.length;
        if (b.x > canvas.width + b.length) b.x = -b.length;
        if (b.y < -b.length) b.y = canvas.height + b.length;
        if (b.y > canvas.height + b.length) b.y = -b.length;

        // 2. React to Mouse (Bend Beam towards Cursor)
        const dx = mouseRef.current.x - b.x;
        const dy = mouseRef.current.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Arc setup
        const endX = b.x + Math.cos(b.angle) * b.length;
        const endY = b.y + Math.sin(b.angle) * b.length;
        
        const midX = (b.x + endX) / 2;
        const midY = (b.y + endY) / 2;
        
        let controlX = midX;
        let controlY = midY;

        if (dist < 300) {
          // Attractor physics: bending laser curve towards mouse coordinate
          controlX = midX + (mouseRef.current.x - midX) * 0.4;
          controlY = midY + (mouseRef.current.y - midY) * 0.4;
        } else {
          // Slow organic warp continuous loop wave
          controlX = midX + Math.sin(Date.now() * 0.001 + b.x) * 20;
          controlY = midY + Math.cos(Date.now() * 0.001 + b.y) * 20;
        }

        // 3. Draw Premium Light Streak
        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
        ctx.quadraticCurveTo(controlX, controlY, endX, endY);

        const gradient = ctx.createLinearGradient(b.x, b.y, endX, endY);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.5, b.color);
        gradient.addColorStop(1, 'transparent');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = dist < 300 ? b.lineWidth * 1.5 : b.lineWidth;
        ctx.lineCap = 'round';

        // Additive Blend Core Blur
        ctx.shadowBlur = dist < 300 ? 30 : 20;
        ctx.shadowColor = b.glowColor;

        ctx.stroke();

        ctx.shadowBlur = 0; // reset
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const resize = () => {
      initBeams();
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);

    initBeams();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0, // Behind children zIndex 1
        pointerEvents: 'none',
        background: 'transparent',
      }}
    />
  );
}
