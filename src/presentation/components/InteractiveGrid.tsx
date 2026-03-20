'use client';

import { useEffect, useRef } from 'react';

interface Point {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 160 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let points: Point[] = [];
    const gap = 40; // Spacing between grid nodes
    let cols = 0;
    let rows = 0;

    const initGrid = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      points = [];
      cols = Math.floor(canvas.width / gap) + 2;
      rows = Math.floor(canvas.height / gap) + 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * gap;
          const y = r * gap;
          points.push({
            baseX: x,
            baseY: y,
            x: x,
            y: y,
            vx: 0,
            vy: 0,
          });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Update positions (Deformation physics)
      for (const p of points) {
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Repel from mouse
        if (dist < mouseRef.current.radius) {
          const force = (mouseRef.current.radius - dist) / mouseRef.current.radius;
          const angle = Math.atan2(dy, dx);
          // Push away
          p.vx -= Math.cos(angle) * force * 1.5;
          p.vy -= Math.sin(angle) * force * 1.5;
        }

        // Return to elastic origin base
        const dxBase = p.baseX - p.x;
        const dyBase = p.baseY - p.y;
        p.vx += dxBase * 0.05; // Spring stiffness
        p.vy += dyBase * 0.05;

        // Friction/Damping
        p.vx *= 0.82;
        p.vy *= 0.82;

        p.x += p.vx;
        p.y += p.vy;
      }

      // 2. Draw Connections (Lines grid mesh)
      ctx.strokeStyle = 'rgba(200, 255, 0, 0.25)'; // Mais visível
      ctx.lineWidth = 0.8;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const index = r * cols + c;
          const p1 = points[index];

          if (!p1) continue;

          // Connect Right
          if (c < cols - 1) {
            const p2 = points[index + 1];
            if (p2) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }

          // Connect Down
          if (r < rows - 1) {
            const p3 = points[index + cols];
            if (p3) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p3.x, p3.y);
              ctx.stroke();
            }
          }
        }
      }

      // 3. Draw Nodes (Nodes intersections)
      for (const p of points) {
        const dx = mouseRef.current.x - p.baseX;
        const dy = mouseRef.current.y - p.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        ctx.beginPath();
        // Hover glows / scale dot nodes
        if (dist < mouseRef.current.radius) {
          ctx.arc(p.x, p.y, 2.0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200, 255, 0, ${0.4 + (1 - dist / mouseRef.current.radius) * 0.6})`;
        } else {
          ctx.arc(p.x, p.y, 1.0, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(200, 255, 0, 0.35)'; // Cor certa
        }
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const resize = () => {
      initGrid();
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);

    initGrid();
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
        zIndex: -5,
        background: 'transparent',
        pointerEvents: 'none',
        mixBlendMode: 'normal',
      }}
    />
  );
}
