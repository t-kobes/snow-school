"use client";

import { useEffect } from "react";

const SELECTOR = ".reveal:not(.in), .reveal-mask:not(.in), .reveal-carve:not(.in)";

export function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
