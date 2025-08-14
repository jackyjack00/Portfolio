import React, { useEffect, useRef } from 'react';
import './HeroBackground.css';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

const usePrefersReducedMotion = () => {
  const mq = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)') : undefined;
  return mq?.matches ?? false;
};

const HeroBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const css = getComputedStyle(document.documentElement);
    const lineColor = css.getPropertyValue('--color-pri').trim() || 'rgba(255,255,255,0.6)';
    const nodeColor = css.getPropertyValue('--color-fg-light').trim() || 'rgba(255,255,255,0.8)';

    let width = 0, height = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      width = clientWidth;
      height = clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
      // draw a static frame on resize to avoid flicker
      drawFrame(0);
    };

    const initParticles = () => {
      const area = width * height;
      // density tuned for visual balance and perf
      const target = clamp(Math.floor(area * 0.00006), 36, 140);
      const arr: Particle[] = [];
      for (let i = 0; i < target; i++) {
        const speed = 0.15 + Math.random() * 0.35; // px per frame
        const angle = Math.random() * Math.PI * 2;
        arr.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: 0.8 + Math.random() * 1.8,
        });
      }
      particlesRef.current = arr;
    };

    let lastTs = 0;

    const drawFrame = (ts: number) => {
      const dt = Math.min(33, ts - lastTs || 16);
      lastTs = ts;
      ctx.clearRect(0, 0, width, height);

      const parts = particlesRef.current;
      const linkDist = clamp(Math.min(width, height) * 0.18, 80, 160);
      const linkDist2 = linkDist * linkDist;

      // slight pointer influence
      const pointer = pointerRef.current;

      // update + draw nodes
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];

        if (!reducedMotion) {
          // pointer attraction/repulsion for subtle dynamism
          if (pointer) {
            const dx = pointer.x - p.x;
            const dy = pointer.y - p.y;
            const d2 = dx * dx + dy * dy + 0.0001;
            const f = Math.min(40 / d2, 0.03); // capped influence
            p.vx += dx * f;
            p.vy += dy * f;
          }

          p.x += p.vx * (dt / 16);
          p.y += p.vy * (dt / 16);
        }

        // wrap around edges for seamless motion
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        // draw node
        ctx.beginPath();
        ctx.fillStyle = nodeColor;
        ctx.globalAlpha = 0.8;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // draw links (O(n^2) but n is capped)
      for (let i = 0; i < parts.length; i++) {
        for (let j = i + 1; j < parts.length; j++) {
          const a = parts[i];
          const b = parts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < linkDist2) {
            const alpha = 1 - d2 / linkDist2;
            ctx.beginPath();
            ctx.strokeStyle = lineColor;
            ctx.globalAlpha = 0.35 * alpha;
            ctx.lineWidth = 1;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
    };

    const loop = (ts: number) => {
      drawFrame(ts);
      animationRef.current = requestAnimationFrame(loop);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onPointerLeave = () => { pointerRef.current = null; };

    const onVisibility = () => {
      if (document.hidden) {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      } else if (!reducedMotion && !animationRef.current) {
        animationRef.current = requestAnimationFrame(loop);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibility);

    if (!reducedMotion) {
      animationRef.current = requestAnimationFrame(loop);
    } else {
      // draw one static frame for reduced motion users
      drawFrame(0);
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reducedMotion]);

  return (
    <div className="HeroSection-bg" aria-hidden>
      <canvas ref={canvasRef} className="HeroSection-bgCanvas" />
    </div>
  );
};

export default HeroBackground;
