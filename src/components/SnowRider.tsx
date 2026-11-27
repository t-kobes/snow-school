"use client";

import { useEffect, useRef } from "react";

// Маленький сноубордист: пока страница листается, он катится дугами из стороны в сторону
// и оставляет на снегу карв — тот же диагональный след, что в логотипе
const PERIOD = 1200; // px прокрутки на полный цикл «влево → вправо → влево»
const TRAIL = 650; // длина видимого следа, px
const RIDER_Y = 0.72; // высота райдера на экране

type Flake = { x: number; y: number; vx: number; vy: number; life: number; r: number };

export function SnowRider() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const riderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current!;
    const rider = riderRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = 0;
    let h = 0;
    let raf = 0;
    let lastY = window.scrollY;
    let flakes: Flake[] = [];

    const amp = () => Math.min(w * 0.38, 520);
    const phase = (docY: number) => (docY / PERIOD) * Math.PI * 2;
    const xAt = (docY: number) => w / 2 + amp() * Math.sin(phase(docY));

    const draw = () => {
      raf = 0;
      const sy = window.scrollY;
      const riderDoc = sy + h * RIDER_Y;
      // появляется после первого экрана, чтобы не спорить с главной сценой
      const fade = Math.min(1, Math.max(0, (sy - h * 0.5) / (h * 0.35)));
      ctx.clearRect(0, 0, w, h);
      rider.style.opacity = String(fade);

      if (fade > 0) {
        // след канта: тает к началу
        ctx.lineCap = "round";
        ctx.lineWidth = 2.5;
        for (let d = TRAIL; d > 0; d -= 6) {
          const y0 = riderDoc - d;
          const y1 = y0 + 6;
          ctx.strokeStyle = `rgba(127, 211, 247, ${(1 - d / TRAIL) * 0.5 * fade})`;
          ctx.beginPath();
          ctx.moveTo(xAt(y0), y0 - sy);
          ctx.lineTo(xAt(y1), y1 - sy);
          ctx.stroke();
        }
      }

      // снежная пыль из-под доски на поворотах
      flakes = flakes.filter((f) => f.life > 0);
      for (const f of flakes) {
        f.x += f.vx;
        f.y += f.vy;
        f.vy += 0.09;
        f.life -= 0.035;
        ctx.fillStyle = `rgba(244, 244, 241, ${Math.max(0, f.life) * fade})`;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }

      const x = xAt(riderDoc);
      const slope = Math.cos(phase(riderDoc)); // >0 — едет вправо
      const dir = slope >= 0 ? 1 : -1;
      rider.style.transform = `translate3d(${x - 29}px, ${h * RIDER_Y - 49}px, 0) rotate(${slope * 16}deg) scaleX(${dir})`;

      if (flakes.length) raf = requestAnimationFrame(draw);
    };

    const onScroll = () => {
      const sy = window.scrollY;
      const moved = Math.abs(sy - lastY);
      lastY = sy;
      const riderDoc = sy + h * RIDER_Y;
      const slope = Math.cos(phase(riderDoc));
      if (moved > 2 && Math.abs(slope) < 0.45) {
        const x = xAt(riderDoc);
        const dir = slope >= 0 ? 1 : -1;
        for (let i = 0; i < Math.min(6, moved / 6); i++) {
          flakes.push({
            x: x - dir * 14 + (Math.random() - 0.5) * 10,
            y: h * RIDER_Y + 4,
            vx: -dir * (0.6 + Math.random() * 2.2),
            vy: -(1 + Math.random() * 2),
            life: 1,
            r: 0.8 + Math.random() * 1.6,
          });
        }
      }
      if (!raf) raf = requestAnimationFrame(draw);
    };

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    resize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40 motion-reduce:hidden">
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
      <div ref={riderRef} className="absolute left-0 top-0 opacity-0 will-change-transform">
        <svg width="58" height="58" viewBox="0 0 48 48" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* тёмный контур, чтобы фигурка читалась и на жёлтом, и на снимках */}
          <g stroke="#0b0b0c">
            <path d="M7 41.5 L41.5 38.3" strokeWidth="7" />
            <path d="M30 39 L27.5 31.5 L22 28 M15.5 40 L17.5 32 L22 28" strokeWidth="7.5" />
            <path d="M22 28 L25 18" strokeWidth="10.5" />
            <path d="M25.5 19 L34.5 21.5 M24 20 L14.5 23.5" strokeWidth="6.5" />
            <circle cx="27" cy="11.5" r="6.3" fill="#0b0b0c" />
          </g>
          {/* доска */}
          <path d="M7 41.5 L40 38.5" stroke="#f4f4f1" strokeWidth="4" />
          <path d="M37 38.8 L41.5 38.3" stroke="#f1ed0e" strokeWidth="4" />
          {/* ноги */}
          <path d="M30 39 L27.5 31.5 L22 28" stroke="#7fd3f7" strokeWidth="4.5" />
          <path d="M15.5 40 L17.5 32 L22 28" stroke="#7fd3f7" strokeWidth="4.5" />
          {/* корпус и руки */}
          <path d="M22 28 L25 18" stroke="#f1ed0e" strokeWidth="7.5" />
          <path d="M25.5 19 L34.5 21.5" stroke="#f1ed0e" strokeWidth="3.5" />
          <path d="M24 20 L14.5 23.5" stroke="#f1ed0e" strokeWidth="3.5" />
          {/* шлем и маска */}
          <circle cx="27" cy="11.5" r="4.8" fill="#f4f4f1" />
          <rect x="27.6" y="10.4" width="4.6" height="2.6" rx="1.2" fill="#0b0b0c" />
        </svg>
      </div>
    </div>
  );
}
