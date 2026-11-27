"use client";

import { useEffect, useRef } from "react";

type Flake = { x: number; y: number; z: number; r: number; phase: number };

// Живой снег в три плана глубины + параллакс фото от прокрутки и курсора
export function HeroDepth() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const hero = canvas.closest("section") as HTMLElement;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d")!;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let mx = 0;
    let my = 0;
    let tmx = 0;
    let tmy = 0;
    let flakes: Flake[] = [];

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(160, (w * h) / 9000));
      flakes = Array.from({ length: count }, () => {
        const z = Math.random() ** 1.6; // ближних хлопьев меньше
        return { x: Math.random() * w, y: Math.random() * h, z, r: 0.7 + z * 3.2, phase: Math.random() * Math.PI * 2 };
      });
    };

    const tick = (t: number) => {
      raf = 0;
      if (!visible) return;
      mx += (tmx - mx) * 0.06;
      my += (tmy - my) * 0.06;
      const sy = Math.min(1, window.scrollY / Math.max(1, hero.offsetHeight));
      hero.style.setProperty("--sy", sy.toFixed(4));
      hero.style.setProperty("--mx", mx.toFixed(4));
      hero.style.setProperty("--my", my.toFixed(4));

      ctx.clearRect(0, 0, w, h);
      const wind = Math.sin(t * 0.00025) * 0.35;
      for (const f of flakes) {
        f.y += 0.35 + f.z * 1.25;
        f.x += wind * (0.4 + f.z) + Math.sin(t * 0.001 + f.phase) * 0.25 * (0.5 + f.z);
        if (f.y > h + 8) {
          f.y = -8;
          f.x = Math.random() * w;
        }
        if (f.x > w + 8) f.x = -8;
        if (f.x < -8) f.x = w + 8;
        const px = f.x - mx * 26 * f.z;
        const py = f.y - my * 16 * f.z;
        const a = 0.25 + f.z * 0.6;
        if (f.z > 0.7) {
          // ближние хлопья мягкие, как в расфокусе
          const g = ctx.createRadialGradient(px, py, 0, px, py, f.r * 1.8);
          g.addColorStop(0, `rgba(255,255,255,${a})`);
          g.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(px, py, f.r * 1.8, 0, Math.PI * 2);
        } else {
          ctx.fillStyle = `rgba(255,255,255,${a})`;
          ctx.beginPath();
          ctx.arc(px, py, f.r, 0, Math.PI * 2);
        }
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      tmx = e.clientX / window.innerWidth - 0.5;
      tmy = e.clientY / window.innerHeight - 0.5;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting && !document.hidden;
      if (visible) start();
    });
    const onVis = () => {
      visible = !document.hidden;
      if (visible) start();
    };

    resize();
    io.observe(hero);
    start();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 z-[1] size-full" />;
}
