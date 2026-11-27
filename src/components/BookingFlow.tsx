"use client";

import { ArrowLeft, ArrowRight, Check, Loader2, MessageCircle, Minus, Plus, Sparkles } from "lucide-react";
import Image from "next/image";
import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { FORMATS, LEVELS, SPORTS, WHATSAPP, formatById, tenge, type FormatId, type Level, type Sport } from "@/lib/data";
import { PREFILL_EVENT, type Prefill } from "@/lib/prefill";
import { openPicker } from "./PickerDialog";
import { SportToggle } from "./SportToggle";

// Знаки трасс: зелёный круг, синий квадрат, чёрный ромб
export function PisteMark({ level, size = 18 }: { level: Level; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden className="shrink-0">
      {level === "beginner" && <circle cx="10" cy="10" r="8" fill="#2fb35a" />}
      {level === "intermediate" && <rect x="2.5" y="2.5" width="15" height="15" rx="1.5" fill="#2f7de1" />}
      {level === "advanced" && <rect x="4" y="4" width="12" height="12" rx="1" fill="#0b0b0c" stroke="#f4f4f1" strokeWidth="1.5" transform="rotate(45 10 10)" />}
    </svg>
  );
}

const STEPS = ["Урок", "Уровень и дата", "Контакты"];

type State = {
  sport: Sport;
  format: FormatId;
  opt: number;
  people: number;
  level: Level;
  date: string;
  name: string;
  phone: string;
  comment: string;
};

const START: State = {
  sport: "snowboard",
  format: "individual",
  opt: 0,
  people: 1,
  level: "beginner",
  date: "",
  name: "",
  phone: "",
  comment: "",
};

const field =
  "w-full rounded-2xl border border-line bg-surface-2 px-4 py-3.5 text-text placeholder:text-muted/70 outline-none transition-colors focus:border-yellow";

const dateLabel = (d: string) =>
  d ? new Date(`${d}T12:00:00`).toLocaleDateString("ru-RU", { day: "numeric", month: "long", weekday: "short" }) : "дата на выбор";

export function BookingFlow() {
  const [s, setS] = useState<State>(START);
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [qr, setQr] = useState("");
  const set = <K extends keyof State>(k: K, v: State[K]) => setS((p) => ({ ...p, [k]: v }));

  const format = formatById(s.format);
  const opt = format.options[Math.min(s.opt, format.options.length - 1)];
  const people = Math.min(format.maxPeople, Math.max(format.minPeople, s.people));
  const price = format.unit === "request" ? null : format.unit === "person" ? opt.price * people : opt.price;
  const level = LEVELS.find((l) => l.id === s.level)!;

  const waText = `Здравствуйте! Ски-пасс на урок: ${SPORTS[s.sport]}, ${format.title.toLowerCase()}, ${opt.label.toLowerCase()}, ${people} чел., уровень — ${level.title.toLowerCase()}, ${dateLabel(s.date)}. ${s.name}, ${s.phone}${s.comment ? `. ${s.comment}` : ""}`;

  useEffect(() => {
    const onPrefill = (e: Event) => {
      const p = (e as CustomEvent<Prefill>).detail;
      setS((prev) => ({
        ...prev,
        ...(p.sport && { sport: p.sport }),
        ...(p.format && { format: p.format, opt: 0 }),
        ...(p.level && { level: p.level }),
        ...(p.people && { people: p.people }),
        ...(p.comment && { comment: p.comment }),
      }));
      setStep(0);
      setStatus("idle");
    };
    // ссылки вида #book-group с первого экрана сразу выбирают формат
    const onHash = () => {
      const id = location.hash.replace("#book-", "") as FormatId;
      if (!location.hash.startsWith("#book-") || !FORMATS.some((f) => f.id === id)) return;
      const f = formatById(id);
      setS((prev) => ({ ...prev, format: id, opt: 0, people: Math.min(f.maxPeople, Math.max(f.minPeople, prev.people)) }));
      setStep(0);
      document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", "#booking");
    };
    onHash();
    window.addEventListener(PREFILL_EVENT, onPrefill);
    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener(PREFILL_EVENT, onPrefill);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  function pickFormat(id: FormatId) {
    const f = formatById(id);
    setS((p) => ({ ...p, format: id, opt: 0, people: Math.min(f.maxPeople, Math.max(f.minPeople, p.people)) }));
  }

  async function submit(e: { preventDefault(): void }) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...s, people }),
      });
      if (!res.ok) throw new Error();
      setQr(await QRCode.toDataURL(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(waText)}`, { margin: 0, width: 240, color: { dark: "#0b0b0c", light: "#00000000" } }));
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setS(START);
    setStep(0);
    setStatus("idle");
    setQr("");
  }

  const next = (
    <button
      type="button"
      onClick={() => setStep((v) => v + 1)}
      className="press inline-flex items-center justify-center gap-2 rounded-full bg-yellow px-7 py-4 font-extrabold text-black hover:bg-text"
    >
      Далее {price !== null && <span className="tabular-nums opacity-60">· {tenge(price)}</span>}
      <ArrowRight size={18} />
    </button>
  );
  const back = (
    <button
      type="button"
      onClick={() => setStep((v) => v - 1)}
      className="press inline-flex items-center gap-2 rounded-full border border-line px-5 py-4 font-bold text-text/80 hover:border-text/50"
    >
      <ArrowLeft size={18} /> Назад
    </button>
  );

  return (
    <section id="booking" data-tint="#121b2a" className="relative overflow-hidden">
      {/* Пик страницы: под записью проявляется настоящий склон школы на Шымбулаке */}
      <div aria-hidden className="absolute inset-0">
        <Image src="/photos/shymbulak-school.jpg" alt="" fill sizes="100vw" className="object-cover object-[50%_35%] opacity-45" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--bg)_0%,color-mix(in_srgb,var(--bg)_60%,transparent)_35%,color-mix(in_srgb,var(--bg)_60%,transparent)_65%,var(--bg)_100%)]" />
      </div>
      <div className="relative mx-auto max-w-[1320px] px-4 py-28 sm:px-6 lg:px-10 lg:py-40">
        <h2 className="reveal-mask display text-[clamp(40px,6vw,80px)]">
          Запишитесь
          <br />
          за минуту
        </h2>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-0">
          <div className="relative z-10 rounded-3xl border border-white/10 bg-surface/85 p-5 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)] backdrop-blur-xl sm:p-8 lg:pr-16">
            {status === "done" ? (
              <div className="swap-in py-6">
                <Check size={44} className="text-yellow" />
                <h3 className="display mt-5 text-4xl sm:text-5xl">Ски-пасс готов</h3>
                <p className="mt-4 max-w-md text-lg text-text/80">
                  {s.name}, заявка у нас. Позвоним на {s.phone}, чтобы подтвердить инструктора, время и место встречи.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(waText)}`}
                    target="_blank"
                    rel="noopener"
                    className="press inline-flex items-center gap-2 rounded-full bg-yellow px-6 py-4 font-extrabold text-black hover:bg-text"
                  >
                    <MessageCircle size={18} /> Написать в WhatsApp
                  </a>
                  <button type="button" onClick={reset} className="press rounded-full border border-line px-6 py-4 font-bold text-text/80 hover:border-text/50">
                    Новая заявка
                  </button>
                </div>
              </div>
            ) : (
              <>
                <ol className="mb-8 grid grid-cols-3 gap-2" aria-label="Шаги записи">
                  {STEPS.map((t, i) => (
                    <li key={t}>
                      <button
                        type="button"
                        disabled={i > step}
                        onClick={() => setStep(i)}
                        aria-current={i === step ? "step" : undefined}
                        className="w-full text-left disabled:cursor-default"
                      >
                        <span className={`block h-1 rounded-full transition-colors duration-500 ${i <= step ? "bg-yellow" : "bg-line"}`} />
                        <span className={`mt-2 block text-xs font-bold sm:text-sm ${i === step ? "text-text" : "text-muted"}`}>
                          {i + 1}. {t}
                        </span>
                      </button>
                    </li>
                  ))}
                </ol>

                {step === 0 && (
                  <div key="s0" className="swap-in space-y-7">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <SportToggle value={s.sport} onChange={(v) => set("sport", v)} />
                      <button type="button" onClick={openPicker} className="inline-flex items-center gap-2 text-sm font-bold text-ice hover:underline">
                        <Sparkles size={16} /> Помочь выбрать
                      </button>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2">
                      {FORMATS.map((f) => (
                        <button
                          key={f.id}
                          type="button"
                          aria-pressed={s.format === f.id}
                          onClick={() => pickFormat(f.id)}
                          className={`press rounded-2xl border px-4 py-3.5 text-left ${
                            s.format === f.id ? "border-yellow bg-yellow/10" : "border-line hover:border-text/40"
                          } ${f.id === "individual" || f.id === "group" ? "" : "sm:py-3"}`}
                        >
                          <span className="flex items-baseline justify-between gap-3">
                            <span className="font-extrabold">{f.title}</span>
                            <span className="text-sm tabular-nums text-muted">
                              {f.unit === "request" ? "по запросу" : `${f.options.length > 1 ? "от " : ""}${tenge(f.options[0].price)}${f.unit === "person" ? "/чел." : ""}`}
                            </span>
                          </span>
                          <span className="mt-1 block text-xs text-muted">{f.short}</span>
                        </button>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-end gap-6">
                      {format.options.length > 1 && (
                        <div>
                          <p className="mb-2 text-sm font-bold text-muted">Длительность</p>
                          <div className="flex flex-wrap gap-2">
                            {format.options.map((o, i) => (
                              <button
                                key={o.label}
                                type="button"
                                aria-pressed={opt === o}
                                onClick={() => set("opt", i)}
                                className={`press rounded-full border px-4 py-2.5 text-sm font-bold ${opt === o ? "border-text bg-text text-black" : "border-line hover:border-text/40"}`}
                              >
                                {o.hours}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      {format.maxPeople > 1 && (
                        <div>
                          <p className="mb-2 text-sm font-bold text-muted">Человек</p>
                          <div className="inline-flex items-center gap-1 rounded-full border border-line p-1">
                            <button type="button" aria-label="Меньше" onClick={() => set("people", Math.max(format.minPeople, people - 1))} className="grid size-9 place-items-center rounded-full hover:bg-surface-2">
                              <Minus size={16} />
                            </button>
                            <span className="w-8 text-center font-extrabold tabular-nums">{people}</span>
                            <button type="button" aria-label="Больше" onClick={() => set("people", Math.min(format.maxPeople, people + 1))} className="grid size-9 place-items-center rounded-full hover:bg-surface-2">
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end">{next}</div>
                  </div>
                )}

                {step === 1 && (
                  <div key="s1" className="swap-in space-y-7">
                    <fieldset>
                      <legend className="mb-3 text-sm font-bold text-muted">Ваш уровень — как трассы на курорте</legend>
                      <div className="grid gap-2">
                        {LEVELS.map((l) => (
                          <button
                            key={l.id}
                            type="button"
                            aria-pressed={s.level === l.id}
                            onClick={() => set("level", l.id)}
                            className={`press flex items-center gap-4 rounded-2xl border px-4 py-4 text-left ${
                              s.level === l.id ? "border-yellow bg-yellow/10" : "border-line hover:border-text/40"
                            }`}
                          >
                            <PisteMark level={l.id} size={24} />
                            <span>
                              <span className="block font-extrabold">{l.title}</span>
                              <span className="block text-sm text-muted">{l.hint}</span>
                            </span>
                          </button>
                        ))}
                      </div>
                    </fieldset>
                    <label className="block max-w-xs">
                      <span className="mb-2 block text-sm font-bold text-muted">Желаемая дата</span>
                      <input
                        type="date"
                        value={s.date}
                        onFocus={(e) => (e.currentTarget.min = new Date().toISOString().slice(0, 10))}
                        onChange={(e) => set("date", e.target.value)}
                        className={`${field} [color-scheme:dark]`}
                      />
                    </label>
                    <div className="flex justify-between gap-3">
                      {back}
                      {next}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <form key="s2" onSubmit={submit} className="swap-in grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm font-bold text-muted">Имя</span>
                      <input required value={s.name} onChange={(e) => set("name", e.target.value)} placeholder="Как к вам обращаться" className={field} autoComplete="name" />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-sm font-bold text-muted">Телефон</span>
                      <input required minLength={10} type="tel" value={s.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+7 700 000 00 00" className={field} autoComplete="tel" />
                    </label>
                    <label className="block sm:col-span-2">
                      <span className="mb-2 block text-sm font-bold text-muted">Комментарий, если нужно</span>
                      <input value={s.comment} onChange={(e) => set("comment", e.target.value)} placeholder="Возраст детей, прокат, трансфер" className={field} />
                    </label>
                    <div className="flex justify-between gap-3 sm:col-span-2">
                      {back}
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="press inline-flex items-center gap-2 rounded-full bg-yellow px-7 py-4 font-extrabold text-black enabled:hover:bg-text disabled:opacity-60"
                      >
                        {status === "sending" && <Loader2 size={18} className="animate-spin" />}
                        Получить ски-пасс
                      </button>
                    </div>
                    {status === "error" && (
                      <p className="text-sm text-red-400 sm:col-span-2">
                        Не отправилось.{" "}
                        <a className="underline" href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(waText)}`}>
                          Напишите нам в WhatsApp
                        </a>{" "}
                        — заявка уже заполнена.
                      </p>
                    )}
                  </form>
                )}
              </>
            )}
          </div>

          <SkiPass
            sport={SPORTS[s.sport]}
            format={format.title}
            duration={opt.label}
            people={people}
            level={s.level}
            levelTitle={level.title}
            date={dateLabel(s.date)}
            price={price}
            name={status === "done" ? s.name : ""}
            qr={status === "done" ? qr : ""}
          />
        </div>
      </div>
    </section>
  );
}

function SkiPass(p: {
  sport: string;
  format: string;
  duration: string;
  people: number;
  level: Level;
  levelTitle: string;
  date: string;
  price: number | null;
  name: string;
  qr: string;
}) {
  // билет наклоняется за курсором, по нему бежит отблеск, как по фольге
  const tilt = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.classList.add("tilting");
    el.style.setProperty("--ry", `${(x - 0.5) * 14}deg`);
    el.style.setProperty("--rx", `${(0.5 - y) * 12}deg`);
    el.style.setProperty("--gx", `${x * 100}%`);
    el.style.setProperty("--gy", `${y * 100}%`);
  };
  const reset = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.classList.remove("tilting");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
  };

  const rows: [string, React.ReactNode][] = [
    ["Катание", p.sport],
    ["Урок", p.duration],
    [
      "Уровень",
      <span key="l" className="inline-flex items-center gap-1.5">
        <PisteMark level={p.level} size={14} /> {p.levelTitle}
      </span>,
    ],
    ["Дата", p.date],
    ["Человек", p.people],
  ];

  return (
    <aside aria-label="Ваш ски-пасс" className="relative z-20 drop-shadow-[0_30px_40px_rgb(0_0_0/0.55)] lg:sticky lg:top-24 lg:-ml-8 lg:mt-20">
      <div onPointerMove={tilt} onPointerLeave={reset} className="ticket-holo lg:-rotate-3">
      <div className="ticket ticket-glint relative overflow-hidden rounded-[28px] bg-yellow p-6 text-black sm:p-8">
        <span aria-hidden className="ticket-sheen" />
        <div className="flex items-start justify-between">
          <p className="display text-xl">
            Snow<span className="opacity-40">/</span>School
          </p>
          <p className="rounded-full border border-black/80 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em]">Ski pass</p>
        </div>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-black/55">{p.name ? `На имя: ${p.name}` : "Урок с инструктором"}</p>
        <p key={p.format} className="display swap-in mt-1 text-[clamp(32px,3.4vw,48px)]">
          {p.format}
        </p>
        <dl className="mt-5 space-y-2 text-sm">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 border-b border-black/10 pb-2">
              <dt className="text-black/55">{k}</dt>
              <dd className="text-right font-bold">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="ticket-cut my-6" />

        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-black/55">Итого</p>
            <p className="display mt-1 text-[clamp(36px,3.6vw,52px)] tabular-nums">{p.price === null ? "По запросу" : tenge(p.price)}</p>
            <p className="mt-1 text-xs text-black/55">ски-пасс курорта и прокат — отдельно</p>
          </div>
          <div className="grid size-[88px] shrink-0 place-items-center rounded-xl bg-black/[0.06] p-2">
            {p.qr ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.qr} alt="QR-код: написать в WhatsApp школы с этой заявкой" className="swap-in size-full" />
            ) : (
              <span className="text-center text-[10px] font-bold leading-tight text-black/45">QR появится после записи</span>
            )}
          </div>
        </div>
      </div>
      </div>
    </aside>
  );
}
