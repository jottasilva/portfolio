'use client';

import { useEffect, useRef } from 'react';

export default function GlowBackground() {
  const greenRef  = useRef<HTMLDivElement>(null);
  const purpleRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    let t = 0;

    // Mouse state
    let targetX = window.innerWidth  / 2;
    let targetY = window.innerHeight / 2;
    let curX    = targetX;
    let curY    = targetY;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const tick = () => {
      t += 0.004; // animation speed

      const W = window.innerWidth;
      const H = window.innerHeight;

      // ── Green blob: orbit + breathe ──────────────────────────────
      if (greenRef.current) {
        const cx  = W * 0.38 + Math.cos(t * 0.7)  * W * 0.10;
        const cy  = H * 0.35 + Math.sin(t * 0.5)  * H * 0.10;
        const sc  = 1 + Math.sin(t * 1.3) * 0.06;
        const op  = 0.80 + Math.sin(t * 0.9) * 0.20;
        greenRef.current.style.left      = `${cx}px`;
        greenRef.current.style.top       = `${cy}px`;
        greenRef.current.style.transform = `translate(-50%, -50%) scale(${sc})`;
        greenRef.current.style.opacity   = String(op);
      }

      // ── Purple blob: counter-orbit ────────────────────────────────
      if (purpleRef.current) {
        const cx  = W * 0.65 + Math.cos(-t * 0.6 + 1.2) * W * 0.09;
        const cy  = H * 0.68 + Math.sin(-t * 0.45 + 0.8) * H * 0.09;
        const sc  = 1 + Math.sin(t * 1.1 + 1.5) * 0.06;
        const op  = 0.80 + Math.sin(t * 0.7 + 1) * 0.20;
        purpleRef.current.style.left      = `${cx}px`;
        purpleRef.current.style.top       = `${cy}px`;
        purpleRef.current.style.transform = `translate(-50%, -50%) scale(${sc})`;
        purpleRef.current.style.opacity   = String(op);
      }

      // ── Cursor glow: lerp follow ──────────────────────────────────
      curX += (targetX - curX) * 0.06;
      curY += (targetY - curY) * 0.06;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${curX - 250}px, ${curY - 250}px)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMouseMove);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const blobBase: React.CSSProperties = {
    position: 'absolute',
    borderRadius: '50%',
    pointerEvents: 'none',
    willChange: 'transform, left, top, opacity',
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -10,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Green orbit blob */}
      <div
        ref={greenRef}
        style={{
          ...blobBase,
          width:  680,
          height: 680,
          background:
            'radial-gradient(circle at center, rgba(200,255,0,0.28) 0%, rgba(160,210,0,0.08) 45%, transparent 68%)',
        }}
      />

      {/* Purple orbit blob */}
      <div
        ref={purpleRef}
        style={{
          ...blobBase,
          width:  640,
          height: 640,
          background:
            'radial-gradient(circle at center, rgba(186,133,251,0.28) 0%, rgba(139,92,246,0.08) 45%, transparent 68%)',
        }}
      />

      {/* Cursor glow */}
      <div
        ref={cursorRef}
        style={{
          ...blobBase,
          top:    0,
          left:   0,
          width:  500,
          height: 500,
          background:
            'radial-gradient(circle at center, rgba(200,255,0,0.08) 0%, rgba(186,133,251,0.05) 40%, transparent 68%)',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
