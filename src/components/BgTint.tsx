"use client";

import { useEffect } from "react";

// Фон страницы плавно меняет оттенок под секцию в центре экрана — блоки перетекают друг в друга
export function BgTint() {
  useEffect(() => {
    const root = document.documentElement;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const tint = (e.target as HTMLElement).dataset.tint;
          if (e.isIntersecting && tint) root.style.setProperty("--bg", tint);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    document.querySelectorAll("[data-tint]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
