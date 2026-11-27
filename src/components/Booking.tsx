"use client";

import { CheckCircle2, Loader2, MessageCircle, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { FORMATS, LEVELS, PHONE, PHONE_HREF, SPORTS, WHATSAPP, type FormatId, type Level, type Sport } from "@/lib/data";
import { PREFILL_EVENT, type Prefill } from "@/lib/prefill";

type Form = {
  name: string;
  phone: string;
  sport: Sport;
  format: FormatId;
  date: string;
  people: number;
  level: Level;
  comment: string;
};

const EMPTY: Form = {
  name: "",
  phone: "",
  sport: "snowboard",
  format: "individual",
  date: "",
  people: 1,
  level: "beginner",
  comment: "",
};

const field =
  "w-full rounded-2xl border border-line bg-surface-2 px-4 py-3.5 text-text placeholder:text-muted/70 outline-none transition-colors focus:border-yellow";

function whatsappText(f: Form) {
  const fmt = FORMATS.find((x) => x.id === f.format)!.title;
  const lvl = LEVELS.find((l) => l.id === f.level)!.title;
  return encodeURIComponent(
    `Здравствуйте! Хочу записаться: ${SPORTS[f.sport]}, ${fmt}, ${f.people} чел., уровень — ${lvl}${
      f.date ? `, дата — ${f.date}` : ""
    }. ${f.name}, ${f.phone}${f.comment ? `. ${f.comment}` : ""}`,
  );
}

export function Booking() {
  const [form, setForm] = useState<Form>(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [flash, setFlash] = useState(false);
  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  useEffect(() => {
    const onPrefill = (e: Event) => {
      const p = (e as CustomEvent<Prefill>).detail;
      setForm((f) => ({
        ...f,
        ...Object.fromEntries(Object.entries(p).filter(([, v]) => v !== undefined)),
      }));
      setStatus("idle");
      setFlash(true);
      setTimeout(() => setFlash(false), 1200);
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  async function submit(e: { preventDefault(): void }) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  const [today, setToday] = useState<string>();
  useEffect(() => setToday(new Date().toISOString().slice(0, 10)), []);

  return (
    <section id="booking" className="mx-auto max-w-[1320px] px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="reveal">
          <p className="eyebrow text-yellow">Запись</p>
          <h2 className="display mt-4 text-[clamp(40px,6vw,80px)]">
            Ваш первый
            <br />
            спуск ждёт
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-text/80">
            Оставьте заявку — подтвердим инструктора, время и место встречи на курорте.
          </p>
          <div className="mt-10 rounded-3xl border border-line bg-surface p-6">
            <p className="text-sm text-muted">Руководитель школы</p>
            <p className="mt-1 text-xl font-extrabold">Артур Ковалевский</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={PHONE_HREF} className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-bold hover:border-text/50">
                <Phone size={16} className="text-ice" /> {PHONE}
              </a>
              <a
                href={`https://wa.me/${WHATSAPP}`}
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-bold hover:border-text/50"
              >
                <MessageCircle size={16} className="text-ice" /> WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div
          className={`reveal rounded-3xl border bg-surface p-6 transition-colors duration-500 sm:p-8 ${
            flash ? "border-yellow" : "border-line"
          }`}
        >
          {status === "done" ? (
            <div className="flex min-h-[420px] flex-col items-start justify-center">
              <CheckCircle2 size={48} className="text-yellow" />
              <h3 className="display mt-6 text-4xl sm:text-5xl">Заявка принята!</h3>
              <p className="mt-4 max-w-md text-lg text-text/80">
                {form.name}, мы свяжемся с вами по номеру {form.phone}, чтобы подтвердить инструктора, время и место встречи.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${WHATSAPP}?text=${whatsappText(form)}`}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 rounded-full bg-yellow px-6 py-3.5 font-extrabold text-black"
                >
                  <MessageCircle size={18} /> Продублировать в WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setForm(EMPTY);
                    setStatus("idle");
                  }}
                  className="rounded-full border border-line px-6 py-3.5 font-bold text-text/80"
                >
                  Новая заявка
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-muted">Имя *</span>
                <input required value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Как к вам обращаться" className={field} autoComplete="name" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-muted">Телефон *</span>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="+7 700 000 00 00"
                  pattern="[+0-9\s()\-]{10,}"
                  className={field}
                  autoComplete="tel"
                />
              </label>

              <fieldset className="sm:col-span-2">
                <legend className="mb-2 text-sm font-bold text-muted">Катание</legend>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(SPORTS) as Sport[]).map((s) => (
                    <button
                      key={s}
                      type="button"
                      aria-pressed={form.sport === s}
                      onClick={() => set("sport", s)}
                      className={`rounded-2xl border py-3.5 font-bold transition-colors ${
                        form.sport === s ? "border-yellow bg-yellow text-black" : "border-line hover:border-text/40"
                      }`}
                    >
                      {SPORTS[s]}
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className="block sm:col-span-2">
                <span className="mb-2 block text-sm font-bold text-muted">Формат</span>
                <select value={form.format} onChange={(e) => set("format", e.target.value as FormatId)} className={field}>
                  {FORMATS.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.title} — {f.short.toLowerCase()}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-muted">Желаемая дата</span>
                <input type="date" min={today} value={form.date} onChange={(e) => set("date", e.target.value)} className={`${field} [color-scheme:dark]`} />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-muted">Сколько человек</span>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={form.people}
                  onChange={(e) => set("people", Math.max(1, Math.min(10, Number(e.target.value) || 1)))}
                  className={field}
                />
              </label>

              <fieldset className="sm:col-span-2">
                <legend className="mb-2 text-sm font-bold text-muted">Уровень</legend>
                <div className="grid gap-2 sm:grid-cols-3">
                  {LEVELS.map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      aria-pressed={form.level === l.id}
                      onClick={() => set("level", l.id)}
                      className={`rounded-2xl border p-4 text-left transition-colors ${
                        form.level === l.id ? "border-ice bg-ice/10" : "border-line hover:border-text/40"
                      }`}
                    >
                      <span className="block font-extrabold">{l.title}</span>
                      <span className="mt-1 block text-xs leading-snug text-muted">{l.hint}</span>
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className="block sm:col-span-2">
                <span className="mb-2 block text-sm font-bold text-muted">Комментарий</span>
                <textarea
                  rows={3}
                  value={form.comment}
                  onChange={(e) => set("comment", e.target.value)}
                  placeholder="Возраст детей, нужен ли прокат или трансфер"
                  className={`${field} resize-none`}
                />
              </label>

              <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted">Нажимая кнопку, вы соглашаетесь на обработку контактов для записи.</p>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-yellow px-8 py-4 font-extrabold text-black transition-transform enabled:hover:-translate-y-0.5 disabled:opacity-60"
                >
                  {status === "sending" && <Loader2 size={18} className="animate-spin" />}
                  Отправить заявку
                </button>
              </div>
              {status === "error" && (
                <p className="text-sm text-red-400 sm:col-span-2">
                  Не удалось отправить. Позвоните {PHONE} или{" "}
                  <a className="underline" href={`https://wa.me/${WHATSAPP}?text=${whatsappText(form)}`}>
                    напишите в WhatsApp
                  </a>
                  .
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
