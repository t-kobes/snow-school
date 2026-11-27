"use client";

import { useEffect } from "react";

// Параллакс первого экрана: фото уезжает медленнее текста и чуть смещается за курсором
export function HeroDepth() {
  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let mx = 0;
    let my = 0;
    let tmx = 0;
    let tmy = 0;

    const tick = () => {
      raf = 0;
      mx += (tmx - mx) * 0.08;
      my += (tmy - my) * 0.08;
      const sy = Math.min(1, window.scrollY / Math.max(1, hero.offsetHeight));
      hero.style.setProperty("--sy", sy.toFixed(4));
      hero.style.setProperty("--mx", mx.toFixed(4));
      hero.style.setProperty("--my", my.toFixed(4));
      if (Math.abs(tmx - mx) > 0.001 || Math.abs(tmy - my) > 0.001) raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      tmx = e.clientX / window.innerWidth - 0.5;
      tmy = e.clientY / window.innerHeight - 0.5;
      kick();
    };

    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    kick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return null;
}
