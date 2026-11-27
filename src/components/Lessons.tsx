"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { tenge, type FormatId } from "@/lib/data";
import { prefillBooking } from "@/lib/prefill";

const CARDS: { id: FormatId; title: string; price: string; unit?: string; facts: string[]; photo: string; alt: string; accent: string }[] = [
  {
    id: "individual",
    title: "Индивидуально",
    price: `от ${tenge(45000)}`,
    facts: ["Только вы и инструктор", "От 1,5 часа до полного дня", "Любой уровень"],
    photo: "/photos/individual-kid.jpg",
    alt: "Инструктор держит ученицу за руку на склоне",
    accent: "var(--yellow)",
  },
  {
    id: "group",
    title: "В группе",
    price: tenge(40000),
    unit: "/чел.",
    facts: ["2–5 человек, один инструктор", "Урок 2 часа", "Веселее и выгоднее"],
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
    <section id="lessons" className="mx-auto max-w-[1320px] px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
      <h2 className="reveal-mask display text-[clamp(40px,6vw,80px)]">
        Как будете
        <br />
        учиться?
      </h2>

      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        {CARDS.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => prefillBooking({ format: c.id, people: c.id === "group" ? 2 : 1 })}
            style={{ ["--sweep" as string]: c.accent }}
            className="sweep press group overflow-hidden rounded-3xl border border-line bg-surface text-left hover:border-transparent hover:text-black"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image src={c.photo} alt={c.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="flex items-end justify-between gap-6 p-6 sm:p-8">
              <div>
                <p className="display text-4xl sm:text-5xl">{c.title}</p>
                <ul className="mt-4 space-y-1 text-text/75 transition-colors group-hover:text-black/70">
                  {c.facts.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
              <div className="text-right">
                <p className="display whitespace-nowrap text-3xl tabular-nums">
                  {c.price}
                  {c.unit && <span className="ml-1 text-base not-italic opacity-60">{c.unit}</span>}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold">
                  Выбрать <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <p className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
        Ещё:
        {EXTRA.map((e) => (
          <button key={e.id} type="button" onClick={() => prefillBooking({ format: e.id })} className="font-bold text-text underline decoration-line underline-offset-4 hover:decoration-yellow">
            {e.label}
          </button>
        ))}
      </p>
    </section>
  );
}
