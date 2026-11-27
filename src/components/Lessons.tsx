"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { tenge, type FormatId } from "@/lib/data";
import { prefillBooking } from "@/lib/prefill";
import { Holo } from "./Holo";

const CARDS: { id: FormatId; title: string; lead: string; price: string; unit?: string; facts: string[]; photo: string; alt: string; accent: string }[] = [
  {
    id: "individual",
    title: "Индивидуально",
    lead: "Только вы и инструктор",
    price: `от ${tenge(45000)}`,
    facts: ["1,5 ч — полный день", "Любой уровень"],
    photo: "/photos/individual-kid.jpg",
    alt: "Инструктор держит ученицу за руку на склоне",
    accent: "var(--yellow)",
  },
  {
    id: "group",
    title: "В группе",
    lead: "2–5 человек и один инструктор",
    price: tenge(40000),
    unit: "/чел.",
    facts: ["Урок 2 часа", "Веселее и выгоднее"],
    photo: "/photos/group-forest.jpg",
    alt: "Компания друзей с лыжами и сноубордами на склоне",
    accent: "var(--ice)",
  },
];

const EXTRA: { id: FormatId; label: string }[] = [
  { id: "kids", label: "Детям с 5 лет" },
  { id: "night", label: "Ночное катание" },
  { id: "freeride", label: "Вне трасс с гидом" },
];

export function Lessons() {
  return (
    <section id="lessons" data-tint="#0b0b0c" className="mx-auto max-w-[1320px] px-4 pb-24 pt-36 sm:px-6 lg:px-10 lg:pb-32 lg:pt-48">
      <h2 className="reveal-mask display text-[clamp(40px,6vw,80px)]">
        Как будете
        <br />
        учиться?
      </h2>

      <div className="mt-12 grid items-start gap-5 lg:grid-cols-2">
        {CARDS.map((c, i) => (
          <button
            key={c.id}
            type="button"
            onClick={() => prefillBooking({ format: c.id, people: c.id === "group" ? 2 : 1 })}
            className={`press group relative aspect-[4/5] overflow-hidden rounded-3xl text-left sm:aspect-[16/12] ${i === 1 ? "lg:mt-16" : ""}`}
          >
            <Image src={c.photo} alt={c.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/0" />
            <Holo className="absolute right-5 top-5 z-10" strength={1.6}>
              <span
                style={{ background: c.accent }}
                className="display ticket-glint relative block -rotate-3 overflow-hidden rounded-2xl px-4 py-2.5 text-2xl tabular-nums text-black shadow-[0_12px_30px_-8px_rgb(0_0_0/0.6)] transition-transform duration-500 group-hover:rotate-0 sm:text-3xl"
              >
                <span aria-hidden className="ticket-sheen" />
                {c.price}
                {c.unit && <span className="ml-1 text-sm not-italic opacity-60">{c.unit}</span>}
              </span>
            </Holo>
            <div className="absolute inset-x-0 bottom-0 p-6 pr-24 sm:p-8 sm:pr-28">
              <div>
                <p className="display text-[clamp(30px,3.6vw,46px)] leading-[0.95] [text-shadow:0_2px_24px_rgb(0_0_0/0.35)]">{c.title}</p>
                <p className="mt-3 text-lg font-semibold leading-snug text-text sm:text-xl">{c.lead}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {c.facts.map((f) => (
                    <li
                      key={f}
                      className="rounded-full border border-white/15 bg-black/35 px-3.5 py-1.5 text-sm font-semibold text-text/90 backdrop-blur-md"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <span className="absolute bottom-6 right-6 grid size-14 place-items-center rounded-full bg-text text-black sm:bottom-8 sm:right-8 transition-colors duration-300 group-hover:bg-yellow">
                <ArrowRight size={22} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="mr-2 text-sm font-semibold text-muted">Ещё форматы</span>
        {EXTRA.map((e) => (
          <button
            key={e.id}
            type="button"
            onClick={() => prefillBooking({ format: e.id })}
            className="press rounded-full border border-line px-4 py-2 text-sm font-semibold text-text/90 hover:border-yellow hover:text-yellow"
          >
            {e.label}
          </button>
        ))}
      </div>
    </section>
  );
}
