"use client";

import type { PointerEvent, ReactNode } from "react";

// «Фольга» как на ски-пассе: элемент наклоняется за курсором, по нему бежит радужный отблеск
export function Holo({ children, className = "", strength = 1 }: { children: ReactNode; className?: string; strength?: number }) {
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.classList.add("tilting");
    el.style.setProperty("--ry", `${(x - 0.5) * 12 * strength}deg`);
    el.style.setProperty("--rx", `${(0.5 - y) * 10 * strength}deg`);
    el.style.setProperty("--gx", `${x * 100}%`);
    el.style.setProperty("--gy", `${y * 100}%`);
  };
  const leave = (e: PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.classList.remove("tilting");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
  };

  return (
    <div onPointerMove={move} onPointerLeave={leave} className={`ticket-holo ${className}`}>
      {children}
    </div>
  );
}
