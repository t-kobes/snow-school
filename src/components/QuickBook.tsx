"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { tenge, type Sport } from "@/lib/data";
import { prefillBooking } from "@/lib/prefill";
import { SportToggle } from "./SportToggle";

const TABS = {
  individual: { title: "Индивидуально", price: `от ${tenge(45000)}`, unit: "", note: "Только вы и инструктор · от 1,5 часа до полного дня" },
  group: { title: "В группе", price: tenge(40000), unit: "/чел.", note: "2–5 человек, один инструктор · 2 часа" },
} as const;

type Tab = keyof typeof TABS;

// Виджет записи на стыке первого экрана и следующей секции
export function QuickBook() {
  const [tab, setTab] = useState<Tab>("individual");
  const [sport, setSport] = useState<Sport>("snowboard");
  const t = TABS[tab];

  return (
    <div className="rounded-3xl border border-white/10 bg-surface/85 p-2 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)] backdrop-blur-xl">
      <div role="tablist" aria-label="Формат урока" className="grid grid-cols-2 gap-1">
        {(Object.keys(TABS) as Tab[]).map((k) => (
          <button
            key={k}
            role="tab"
            type="button"
            aria-selected={tab === k}
            onClick={() => setTab(k)}
            className={`rounded-2xl px-4 py-3 text-left font-extrabold transition-colors duration-300 ${
              tab === k ? (k === "group" ? "bg-ice text-black" : "bg-yellow text-black") : "text-text/70 hover:bg-white/5 hover:text-text"
            }`}
          >
            {TABS[k].title}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-4 px-3 pb-3 pt-5 sm:flex-row sm:items-center sm:justify-between sm:px-4">
        <div key={tab} className="swap-in">
          <p className="display text-3xl tabular-nums sm:text-4xl">
            {t.price}
            {t.unit && <span className="ml-1 text-base not-italic text-muted">{t.unit}</span>}
          </p>
          <p className="mt-1 text-sm text-muted">{t.note}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <SportToggle value={sport} onChange={setSport} />
          <button
            type="button"
            onClick={() => prefillBooking({ format: tab, sport, people: tab === "group" ? 2 : 1 })}
            className="press inline-flex items-center gap-2 rounded-full bg-yellow px-6 py-3.5 font-extrabold text-black hover:bg-text"
          >
            Записаться <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
