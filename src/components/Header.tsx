"use client";

import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { PHONE, PHONE_HREF } from "@/lib/data";
import { Logo } from "./Logo";

const NAV = [
  { href: "#lessons", label: "Уроки" },
  { href: "#why", label: "Безопасность" },
  { href: "#booking", label: "Запись" },
  { href: "#faq", label: "Вопросы" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 500);
        last = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        hidden && !open ? "-translate-y-full" : ""
      } ${
        scrolled || open ? "border-b border-line bg-bg/85 backdrop-blur-md" : "bg-gradient-to-b from-black/60 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-4 sm:px-6 lg:px-10">
        <a href="#top" aria-label="Snow School — на главную">
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 text-sm font-semibold lg:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-text/80 transition-colors hover:text-yellow">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={PHONE_HREF}
            className="hidden items-center gap-2 text-sm font-semibold text-text/80 hover:text-text xl:flex"
          >
            <Phone size={15} className="text-ice" />
            {PHONE}
          </a>
          <a
            href="#booking"
            className="press rounded-full bg-yellow px-4 py-2.5 text-[13px] font-extrabold text-black hover:bg-text sm:px-5 sm:text-sm"
          >
            Записаться
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-full border border-line lg:hidden"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line px-4 pb-6 pt-2 lg:hidden">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="display block border-b border-line py-4 text-3xl"
            >
              {n.label}
            </a>
          ))}
          <a href={PHONE_HREF} className="mt-5 flex items-center gap-2 font-semibold">
            <Phone size={16} className="text-ice" />
            {PHONE}
          </a>
        </nav>
      )}
    </header>
  );
}
