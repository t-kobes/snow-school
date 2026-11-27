"use client";

import { Info, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { FORMATS, formatById, tenge, type FormatId, type Sport } from "@/lib/data";
import { prefillBooking } from "@/lib/prefill";
import { SportToggle } from "./Lessons";

export function Pricing() {
  const [formatId, setFormatId] = useState<FormatId>("individual");
  const [optIdx, setOptIdx] = useState(0);
  const [people, setPeople] = useState(2);
  const [sport, setSport] = useState<Sport>("snowboard");

  const format = formatById(formatId);
  const opt = format.options[Math.min(optIdx, format.options.length - 1)];
  const n = Math.min(format.maxPeople, Math.max(format.minPeople, people));
  const total = format.unit === "person" ? opt.price * n : opt.price;

  function pickFormat(id: FormatId) {
    setFormatId(id);
    setOptIdx(0);
    const f = formatById(id);
    setPeople((p) => Math.min(f.maxPeople, Math.max(f.minPeople, p)));
  }

  return (
    <section id="prices" className="border-y border-line bg-navy/60">
      <div className="mx-auto max-w-[1320px] px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <div className="reveal flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow text-ice">Цены</p>
            <h2 className="display mt-4 text-[clamp(40px,6vw,80px)]">
              Посчитайте
              <br />
              свой урок
            </h2>
          </div>
          <p className="max-w-sm text-text/75">Цены школы в тенге, без скрытых доплат. Ски-пасс и прокат — отдельно, в кассе курорта.</p>
        </div>

        <div className="reveal mt-12 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-8 rounded-3xl border border-line bg-bg p-6 sm:p-8">
            <div>
              <p className="mb-3 text-sm font-bold text-muted">Формат</p>
              <div className="flex flex-wrap gap-2">
                {FORMATS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={formatId === f.id}
                    onClick={() => pickFormat(f.id)}
                    className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${
                      formatId === f.id ? "border-ice bg-ice text-black" : "border-line text-text/85 hover:border-text/50"
                    }`}
                  >
                    {f.title}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-sm text-muted">{format.short}</p>
            </div>

            <div>
              <p className="mb-3 text-sm font-bold text-muted">Длительность</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {format.options.map((o, i) => (
                  <button
                    key={o.label}
                    type="button"
                    aria-pressed={opt === o}
                    onClick={() => setOptIdx(i)}
                    className={`rounded-2xl border px-4 py-3 text-left transition-colors ${
                      opt === o ? "border-yellow bg-yellow/10" : "border-line hover:border-text/40"
                    }`}
                  >
                    <span className="block font-extrabold">{o.hours}</span>
                    <span className="block text-xs text-muted">{o.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-end gap-8">
              <div>
                <p className="mb-3 text-sm font-bold text-muted">Катание</p>
                <SportToggle value={sport} onChange={setSport} />
              </div>
              {format.maxPeople > 1 && (
                <div>
                  <p className="mb-3 text-sm font-bold text-muted">
                    Человек{format.unit === "person" ? ` (${format.minPeople}–${format.maxPeople})` : ""}
                  </p>
                  <div className="inline-flex items-center gap-1 rounded-full border border-line p-1">
                    <button
                      type="button"
                      aria-label="Меньше"
                      onClick={() => setPeople(Math.max(format.minPeople, n - 1))}
                      className="grid size-10 place-items-center rounded-full hover:bg-surface-2"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-10 text-center text-lg font-extrabold">{n}</span>
                    <button
                      type="button"
                      aria-label="Больше"
                      onClick={() => setPeople(Math.min(format.maxPeople, n + 1))}
                      className="grid size-10 place-items-center rounded-full hover:bg-surface-2"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col rounded-3xl bg-yellow p-6 text-black sm:p-8">
            <p className="eyebrow">Итого</p>
            <p className="display mt-4 text-[clamp(48px,6vw,84px)]" aria-live="polite">
              {format.unit === "request" ? "По запросу" : tenge(total)}
            </p>
            <p className="mt-3 font-semibold text-black/75">
              {format.title} · {opt.label.toLowerCase()} · {sport === "ski" ? "лыжи" : "сноуборд"}
              {format.unit === "person" && ` · ${n} чел. × ${tenge(opt.price)}`}
            </p>
            <p className="mt-6 flex gap-2 text-sm text-black/70">
              <Info size={16} className="mt-0.5 shrink-0" />
              {format.unit === "request"
                ? "Стоимость назовём по телефону или в WhatsApp — зависит от возраста, состава и маршрута."
                : "Работа инструктора всё оплаченное время. Ски-пасс и прокат оплачиваются отдельно."}
            </p>
            <button
              type="button"
              onClick={() => prefillBooking({ format: formatId, sport, people: n })}
              className="mt-8 rounded-full bg-black py-4 font-extrabold text-yellow transition-transform hover:-translate-y-0.5 lg:mt-auto"
            >
              Записаться с этими параметрами
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
