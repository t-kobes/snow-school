"use client";

import { ArrowRight, Check, Loader2, MapPin, Minus, Plus, RotateCcw, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LEVELS, SPORTS, type Level, type Sport } from "@/lib/data";
import { GOAL, WHO, type Goal, type PickInput, type PickResult, type Who } from "@/lib/pick";
import { prefillBooking } from "@/lib/prefill";

function Choice<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Record<T, string>;
  value: T | null;
  onChange: (v: T) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-bold text-muted">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(options) as T[]).map((k) => (
          <button
            key={k}
            type="button"
            aria-pressed={value === k}
            onClick={() => onChange(k)}
            className={`press rounded-full border px-4 py-2.5 text-sm font-semibold ${
              value === k ? "border-yellow bg-yellow text-black" : "border-line text-text/85 hover:border-text/50"
            }`}
          >
            {options[k]}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

const LEVEL_OPTIONS = Object.fromEntries(LEVELS.map((l) => [l.id, l.title])) as Record<Level, string>;

const THINKING = ["Смотрим прайс школы…", "Выбираем склон под ваш уровень…", "Считаем стоимость…", "Готовим советы инструктора…"];

function Thinking() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % THINKING.length), 1300);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="flex min-h-[360px] flex-col items-start justify-center">
      <span className="grid size-16 place-items-center rounded-full bg-yellow text-black">
        <Sparkles size={28} className="animate-pulse" />
      </span>
      <p className="display mt-8 text-4xl sm:text-5xl">Подбираем урок</p>
      <p key={i} className="mt-4 text-lg text-ice">
        {THINKING[i]}
      </p>
    </div>
  );
}
const SPORT_OPTIONS = { ...SPORTS, unsure: "Пока не знаю" } as Record<Sport | "unsure", string>;

export const PICKER_EVENT = "snow:picker";
export const openPicker = () => window.dispatchEvent(new Event(PICKER_EVENT));

export function PickerDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const open = () => ref.current?.showModal();
    window.addEventListener(PICKER_EVENT, open);
    return () => window.removeEventListener(PICKER_EVENT, open);
  }, []);
  const close = () => ref.current?.close();

  const [who, setWho] = useState<Who | null>(null);
  const [level, setLevel] = useState<Level | null>(null);
  const [sport, setSport] = useState<Sport | "unsure" | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [people, setPeople] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PickResult | null>(null);
  const [error, setError] = useState("");

  const ready = who && level && sport && goal;

  async function submit() {
    if (!ready) return;
    setLoading(true);
    setError("");
    try {
      const body: PickInput = { who, level, sport, goal, people };
      const res = await fetch("/api/pick", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error();
      setResult(await res.json());
    } catch {
      setError("Не получилось подобрать. Проверьте интернет или позвоните нам.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setResult(null);
    setWho(null);
    setLevel(null);
    setSport(null);
    setGoal(null);
    setPeople(1);
  }

  return (
    <dialog
      ref={ref}
      onClick={(e) => e.target === ref.current && close()}
      className="m-auto w-[min(640px,calc(100vw-24px))] rounded-3xl border border-line bg-surface p-0 text-text backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <div className="relative max-h-[85dvh] overflow-y-auto p-6 sm:p-8" aria-live="polite">
        <button type="button" onClick={close} aria-label="Закрыть" className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-line hover:border-text/50">
          <X size={18} />
        </button>
        {!loading && !result && (
          <div className="mb-7 pr-12">
            <p className="display text-3xl sm:text-4xl">Поможем выбрать</p>
            <p className="mt-2 text-muted">4 вопроса — и AI подберёт урок по прайсу школы.</p>
          </div>
        )}
          {loading ? (
            <Thinking />
          ) : !result ? (
            <div className="space-y-7">
              <Choice label="1. Кто будет кататься?" options={WHO} value={who} onChange={setWho} />
              <Choice label="2. Опыт" options={LEVEL_OPTIONS} value={level} onChange={setLevel} />
              <Choice label="3. На чём хотите кататься?" options={SPORT_OPTIONS} value={sport} onChange={setSport} />
              <Choice label="4. Что для вас важнее?" options={GOAL} value={goal} onChange={setGoal} />
              <div>
                <p className="mb-3 text-sm font-bold text-muted">Сколько вас?</p>
                <div className="inline-flex items-center gap-1 rounded-full border border-line p-1">
                  <button
                    type="button"
                    aria-label="Меньше"
                    onClick={() => setPeople((p) => Math.max(1, p - 1))}
                    className="grid size-10 place-items-center rounded-full hover:bg-surface-2"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center text-lg font-extrabold">{people}</span>
                  <button
                    type="button"
                    aria-label="Больше"
                    onClick={() => setPeople((p) => Math.min(10, p + 1))}
                    className="grid size-10 place-items-center rounded-full hover:bg-surface-2"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              <button
                type="button"
                disabled={!ready || loading}
                onClick={submit}
                className="press inline-flex w-full items-center justify-center gap-2 rounded-full bg-text px-8 py-4 font-extrabold text-black enabled:hover:bg-yellow disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Подбираем…
                  </>
                ) : (
                  <>
                    <Sparkles size={18} /> Подобрать урок
                  </>
                )}
              </button>
              {error && <p className="text-sm text-red-400">{error}</p>}
            </div>
          ) : (
            <div className="swap-in">
              <h3 className="display text-4xl sm:text-5xl">{result.title}</h3>
              <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
                <div className="bg-surface-2 px-4 py-3">
                  <p className="text-xs text-muted">Катание</p>
                  <p className="mt-1 font-extrabold">{SPORTS[result.sport]}</p>
                </div>
                <div className="bg-surface-2 px-4 py-3">
                  <p className="text-xs text-muted">Длительность</p>
                  <p className="mt-1 font-extrabold">{result.duration}</p>
                </div>
                <div className="col-span-2 bg-surface-2 px-4 py-3 sm:col-span-1">
                  <p className="text-xs text-muted">Стоимость</p>
                  <p className="mt-1 font-extrabold text-yellow">{result.price}</p>
                </div>
              </div>
              <p className="mt-5 flex items-center gap-2 text-sm font-semibold">
                <MapPin size={16} className="text-ice" /> {result.resort}
              </p>
              <p className="mt-5 text-lg leading-relaxed text-text/90">{result.why}</p>
              <ul className="mt-5 space-y-2 text-sm text-text/75">
                {result.tips.map((t) => (
                  <li key={t} className="flex gap-2">
                    <Check size={16} className="mt-0.5 shrink-0 text-yellow" />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    close();
                    prefillBooking({
                      format: result.format,
                      sport: result.sport,
                      level: level ?? undefined,
                      people,
                      comment: `Подбор: ${result.title}, ${result.resort}`,
                    });
                  }}
                  className="press inline-flex items-center gap-2 rounded-full bg-yellow px-7 py-4 font-extrabold text-black hover:bg-text"
                >
                  Записаться на этот урок <ArrowRight size={18} />
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-4 font-bold text-text/80 hover:border-text/50"
                >
                  <RotateCcw size={16} /> Заново
                </button>
              </div>
            </div>
          )}
      </div>
    </dialog>
  );
}
