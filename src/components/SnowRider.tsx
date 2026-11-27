"use client";

import { useEffect, useRef } from "react";

// Райдер на склоне, вид сверху: страница — это склон, при прокрутке он режет дуги из стороны в сторону.
// Доска всегда направлена по касательной к следу, позиция догоняет прокрутку с инерцией.
const PERIOD = 1300; // px склона на полный цикл «влево → вправо → влево»
const TRAIL = 700; // длина видимого следа, px
const RIDER_Y = 0.7; // где райдер на экране по высоте
const EASE = 0.12; // насколько быстро догоняет прокрутку за кадр

type Flake = { x: number; doc: number; vx: number; vy: number; life: number; r: number };

export function SnowRider() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const riderRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current!;
    const rider = riderRef.current!;
    const body = bodyRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = 0;
    let h = 0;
    let raf = 0;
    let smooth = window.scrollY;
    let flakes: Flake[] = [];

    const amp = () => Math.min(w * 0.34, 480);
    const k = (Math.PI * 2) / PERIOD;
    const xAt = (doc: number) => w / 2 + amp() * Math.sin(doc * k);

    const frame = () => {
      raf = 0;
      const sy = window.scrollY;
      const prev = smooth;
      smooth += (sy - smooth) * EASE;
      smooth = Math.max(sy - 160, Math.min(sy + 160, smooth));
      if (Math.abs(sy - smooth) < 0.3) smooth = sy;
      const speed = smooth - prev;

      const doc = smooth + h * RIDER_Y; // где райдер на склоне
      const screenY = doc - sy;
      const fade = Math.min(1, Math.max(0, (smooth - h * 0.5) / (h * 0.35)));
      const x = xAt(doc);
      const dx = amp() * k * Math.cos(doc * k); // смещение по x на 1px спуска
      const angle = Math.atan2(1, dx); // направление доски, радианы
      const curve = -Math.sin(doc * k); // куда закручивает дугу

      ctx.clearRect(0, 0, w, h);
      rider.style.opacity = String(fade);

      if (fade > 0) {
        // след канта — одна непрерывная линия, тает к хвосту
        const grad = ctx.createLinearGradient(0, screenY - TRAIL, 0, screenY);
        grad.addColorStop(0, "rgba(127, 211, 247, 0)");
        grad.addColorStop(1, `rgba(127, 211, 247, ${0.55 * fade})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        for (let d = doc - TRAIL; d <= doc; d += 4) ctx.lineTo(xAt(d), d - sy);
        ctx.stroke();

        // снежная пыль на выходе из поворота: летит наружу дуги из-под хвоста доски
        if (Math.abs(speed) > 1.2 && Math.abs(Math.cos(doc * k)) < 0.5) {
          const tailX = x - Math.cos(angle) * 24;
          const tailDoc = doc - Math.sin(angle) * 24;
          for (let i = 0; i < 2; i++) {
            flakes.push({
              x: tailX,
              doc: tailDoc,
              vx: -curve * (0.8 + Math.random() * 1.8) + (Math.random() - 0.5) * 0.6,
              vy: (Math.random() - 0.6) * 1.2,
              life: 1,
              r: 0.7 + Math.random() * 1.5,
            });
          }
        }
      }

      flakes = flakes.filter((f) => f.life > 0);
      for (const f of flakes) {
        f.x += f.vx;
        f.doc += f.vy;
        f.vx *= 0.94;
        f.vy *= 0.94;
        f.life -= 0.025;
        ctx.fillStyle = `rgba(244, 244, 241, ${f.life * 0.8 * fade})`;
        ctx.beginPath();
        ctx.arc(f.x, f.doc - sy, f.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rider.style.transform = `translate3d(${x - 44}px, ${screenY - 44}px, 0) rotate(${angle}rad)`;
      body.style.transform = `translateY(${-curve * 2.6}px)`; // корпус смещается внутрь дуги

      if (smooth !== sy || flakes.length) raf = requestAnimationFrame(frame);
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      kick();
    };

    resize();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40 motion-reduce:hidden">
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
      <div ref={riderRef} className="absolute left-0 top-0 size-[88px] opacity-0 will-change-transform">
        {/* вид сверху, нос доски смотрит вправо (+x) */}
        <svg width="88" height="88" viewBox="0 0 64 64" className="drop-shadow-[0_6px_10px_rgb(0_0_0/0.45)]">
          <rect x="12" y="27" width="40" height="10" rx="5" fill="#f1ed0e" stroke="#0b0b0c" strokeWidth="1.5" />
          <rect x="21" y="26" width="3.5" height="12" rx="1.2" fill="#0b0b0c" />
          <rect x="39.5" y="26" width="3.5" height="12" rx="1.2" fill="#0b0b0c" />
          <g ref={bodyRef} className="[transition:transform_0.2s_ease-out]">
            <path d="M18 32.5 C22 30.5 42 30.5 46 32.5" stroke="#0b0b0c" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M18 32.5 C22 30.5 42 30.5 46 32.5" stroke="#7fd3f7" strokeWidth="3.4" strokeLinecap="round" fill="none" />
            <ellipse cx="32" cy="32" rx="8.5" ry="6" fill="#7fd3f7" stroke="#0b0b0c" strokeWidth="1.5" />
            <circle cx="33" cy="32" r="4.4" fill="#f4f4f1" stroke="#0b0b0c" strokeWidth="1.5" />
            <rect x="35" y="30.2" width="2.2" height="3.6" rx="1" fill="#0b0b0c" />
          </g>
        </svg>
      </div>
    </div>
  );
}
