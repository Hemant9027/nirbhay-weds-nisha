import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Petal = {
  x: number;
  y: number;
  size: number;
  speed: number;
  sway: number;
  swaySpeed: number;
  rot: number;
  rotSpeed: number;
  color: string;
  alpha: number;
};

const COLORS = ["#f2a944", "#e8963c", "#d98145", "#c96a5a", "#e2b34c", "#b8452a", "#e7a94e"];

/**
 * Lightweight canvas of drifting marigold & rose petals.
 * Pauses when the tab is hidden and honours reduced-motion.
 */
export default function Petals({ density = 1, className = "" }: { density?: number; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.6);

    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    resize();

    const count = Math.max(10, Math.min(26, Math.round((window.innerWidth / 60) * density)));
    const petals: Petal[] = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: (3.5 + Math.random() * 5.5) * dpr,
      speed: (0.35 + Math.random() * 0.75) * dpr,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.004 + Math.random() * 0.008,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: 0.45 + Math.random() * 0.4,
    }));

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of petals) {
        p.sway += p.swaySpeed;
        p.y += p.speed;
        p.x += Math.sin(p.sway) * 0.6 * dpr;
        p.rot += p.rotSpeed;
        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        // petal shape
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.9, -p.size * 0.4, p.size * 0.9, p.size * 0.6, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.9, p.size * 0.6, -p.size * 0.9, -p.size * 0.4, 0, -p.size);
        ctx.fill();
        ctx.restore();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onVisibility = () => {
      running = !document.hidden;
      if (running) raf = requestAnimationFrame(draw);
      else cancelAnimationFrame(raf);
    };
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced, density]);

  if (reduced) return null;

  return <canvas ref={canvasRef} className={`pointer-events-none fixed inset-0 z-30 ${className}`} aria-hidden="true" />;
}
