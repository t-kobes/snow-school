"use client";

import Image from "next/image";
import { Check, Moon, Mountain, Baby } from "lucide-react";
import { useState } from "react";
import { SPORTS, tenge, type Sport } from "@/lib/data";
import { prefillBooking } from "@/lib/prefill";

const PHOTOS: Record<Sport, { individual: string; group: string }> = {
  ski: { individual: "/photos/individual-kid.jpg", group: "/photos/group-forest.jpg" },
  snowboard: { individual: "/photos/snowboard-sit.jpg", group: "/photos/group-summit.jpg" },
};

export function SportToggle({ value, onChange }: { value: Sport; onChange: (s: Sport) => void }) {
  return (
    <div role="radiogroup" aria-label="Вид катания" className="inline-flex rounded-full border border-line bg-surface p-1">
      {(Object.keys(SPORTS) as Sport[]).map((s) => (
        <button
          key={s}
          type="button"
          role="radio"
          aria-checked={value === s}
          onClick={() => onChange(s)}
          className={`rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
            value === s ? "bg-text text-black" : "text-text/70 hover:text-text"
          }`}
        >
          {SPORTS[s]}
        </button>
      ))}
    </div>
  );
}

export function Lessons() {
  const [sport, setSport] = useState<Sport>("ski");
  const sportWord = sport === "ski" ? "на лыжах" : "на сноуборде";

  return (
    <section id="lessons" className="mx-auto max-w-[1320px] px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
      <div className="reveal flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow text-yellow">Уроки</p>
          <h2 className="display mt-4 text-[clamp(40px,6vw,80px)]">
            Два способа
            <br />
            встать {sportWord}
          </h2>
        </div>
        <SportToggle value={sport} onChange={setSport} />
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        {/* Индивидуально */}
        <article className="reveal group flex flex-col overflow-hidden rounded-3xl border border-line bg-surface">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              key={PHOTOS[sport].individual}
              src={PHOTOS[sport].individual}
              alt="Инструктор помогает ученику на склоне"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="eyebrow absolute left-5 top-5 rounded-full bg-yellow px-3 py-1.5 text-[10px] text-black">
              Быстрее всего научиться
            </span>
          </div>
          <div className="flex flex-1 flex-col p-6 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="display text-4xl sm:text-5xl">Индивидуально</h3>
              <p className="display text-3xl text-yellow">от {tenge(45000)}</p>
            </div>
            <ul className="mt-6 space-y-3 text-text/85">
              {[
                "Инструктор занимается только с вами",
                "С нуля или чтобы подтянуть технику",
                "Новичок, продолжающий или опытный",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <Check size={20} className="mt-0.5 shrink-0 text-yellow" />
                  {t}
                </li>
              ))}
            </ul>
            <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
              {[
                ["1,5 часа", 45000],
                ["2 часа", 60000],
                ["Полдня", 120000],
                ["Весь день", 240000],
              ].map(([k, v]) => (
                <div key={k} className="bg-surface-2 px-4 py-3">
                  <dt className="text-xs text-muted">{k}</dt>
                  <dd className="mt-1 font-extrabold">{tenge(v as number)}</dd>
                </div>
              ))}
            </dl>
            <button
              type="button"
              onClick={() => prefillBooking({ format: "individual", sport })}
              className="mt-8 w-full rounded-full bg-yellow py-4 font-extrabold text-black transition-transform hover:-translate-y-0.5 sm:mt-auto sm:w-fit sm:px-8"
            >
              Записаться индивидуально
            </button>
          </div>
        </article>

        {/* Группа */}
        <article className="reveal group flex flex-col overflow-hidden rounded-3xl border border-line bg-surface">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              key={PHOTOS[sport].group}
              src={PHOTOS[sport].group}
              alt="Компания друзей на склоне после урока"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="eyebrow absolute left-5 top-5 rounded-full bg-ice px-3 py-1.5 text-[10px] text-black">
              Веселее с друзьями
            </span>
          </div>
          <div className="flex flex-1 flex-col p-6 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="display text-4xl sm:text-5xl">В группе</h3>
              <p className="display text-3xl text-ice">
                {tenge(40000)}
                <span className="ml-1 text-base not-italic text-muted">/чел.</span>
              </p>
            </div>
            <ul className="mt-6 space-y-3 text-text/85">
              {["От 2 до 5 человек и один инструктор", "Урок 2 часа — для новичков и продолжающих", "Можно собрать свою компанию или семью"].map(
                (t) => (
                  <li key={t} className="flex gap-3">
                    <Check size={20} className="mt-0.5 shrink-0 text-ice" />
                    {t}
                  </li>
                ),
              )}
            </ul>
            <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
              {[2, 3, 4, 5].map((n) => (
                <div key={n} className="bg-surface-2 px-4 py-3">
                  <dt className="text-xs text-muted">{n} чел.</dt>
                  <dd className="mt-1 font-extrabold">{tenge(40000 * n)}</dd>
                </div>
              ))}
            </dl>
            <button
              type="button"
              onClick={() => prefillBooking({ format: "group", sport, people: 2 })}
              className="mt-8 w-full rounded-full border border-ice py-4 font-extrabold text-ice transition-colors hover:bg-ice hover:text-black sm:mt-auto sm:w-fit sm:px-8"
            >
              Записаться в группу
            </button>
          </div>
        </article>
      </div>

      <div className="reveal mt-5 grid gap-3 sm:grid-cols-3">
        {[
          { icon: Baby, t: "Детям с 5 лет", d: "1,5 часа, индивидуально или в группе", f: "kids" as const },
          { icon: Moon, t: "Ночное катание", d: `2 часа под прожекторами · ${tenge(80000)}`, f: "night" as const },
          { icon: Mountain, t: "Вне трасс с гидом", d: "Полный день для опытных райдеров", f: "freeride" as const },
        ].map(({ icon: Icon, t, d, f }) => (
          <button
            key={t}
            type="button"
            onClick={() => prefillBooking({ format: f, sport })}
            className="flex items-center gap-4 rounded-2xl border border-line bg-surface px-5 py-4 text-left transition-colors hover:border-text/40"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-surface-2">
              <Icon size={20} className="text-yellow" />
            </span>
            <span>
              <span className="block font-extrabold">{t}</span>
              <span className="block text-sm text-muted">{d}</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
