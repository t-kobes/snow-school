"use client";

import { useEffect, useRef } from "react";

// Огромная строка курсивом, которая едет вместе с прокруткой: верхняя влево, нижняя вправо
export function Marquee({ top, bottom }: { top: string; bottom: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let visible = false;

    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = (window.innerHeight - r.top) / (window.innerHeight + r.height); // 0 → 1 пока блок проезжает экран
      el.style.setProperty("--p", String(Math.min(1, Math.max(0, p))));
    };
    const onScroll = () => {
      if (visible && !raf) raf = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) update();
    });

    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const row = (text: string) => Array.from({ length: 4 }, () => text).join("  ");

  return (
    <div ref={ref} aria-hidden className="overflow-hidden border-y border-line py-6 [--p:0.5] sm:py-10">
      <p
        className="display w-max text-[clamp(56px,10vw,168px)] text-yellow will-change-transform"
        style={{ transform: "translateX(calc(var(--p) * -28% - 4%))", whiteSpace: "nowrap" }}
      >
        {row(top)}
      </p>
      <p
        className="display outline-text mt-1 w-max text-[clamp(56px,10vw,168px)] will-change-transform"
        style={{ transform: "translateX(calc(var(--p) * 28% - 40%))", whiteSpace: "nowrap" }}
      >
        {row(bottom)}
      </p>
    </div>
  );
}
