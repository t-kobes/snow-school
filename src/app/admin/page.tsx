import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { FORMATS, LEVELS, SPORTS, WHATSAPP } from "@/lib/data";
import { listBookings, supabaseReady, type BookingRow } from "@/lib/supabase";
import { Logo } from "@/components/Logo";
import { updateStatus } from "./actions";

export const metadata: Metadata = { title: "Заявки — Snow School", robots: { index: false } };

const label = {
  format: (id: string) => FORMATS.find((f) => f.id === id)?.title ?? id,
  level: (id: string) => LEVELS.find((l) => l.id === id)?.title ?? id,
  sport: (id: string) => SPORTS[id as keyof typeof SPORTS] ?? id,
};

const STATUS: Record<string, { label: string; cls: string }> = {
  new: { label: "Новая", cls: "bg-yellow text-black" },
  confirmed: { label: "Подтверждена", cls: "bg-ice text-black" },
  done: { label: "Проведена", cls: "bg-surface-2 text-muted" },
  cancelled: { label: "Отменена", cls: "bg-surface-2 text-muted line-through" },
};

const NEXT: Record<string, { to: string; label: string } | undefined> = {
  new: { to: "confirmed", label: "Подтвердить →" },
  confirmed: { to: "done", label: "Урок проведён →" },
};

function waLink(b: BookingRow) {
  const phone = b.phone.replace(/\D/g, "").replace(/^8/, "7");
  const text = encodeURIComponent(
    `Здравствуйте, ${b.name}! Это Snow School. Получили вашу заявку: ${label.format(b.format).toLowerCase()}, ${label
      .sport(b.sport)
      .toLowerCase()}. Подтверждаем время и инструктора?`,
  );
  return `https://wa.me/${phone || WHATSAPP}?text=${text}`;
}

async function Bookings({ searchParams }: { searchParams: PageProps<"/admin">["searchParams"] }) {
  const { key } = await searchParams;
  if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) {
    return <p className="text-muted">Нет доступа. Откройте страницу по ссылке с ключом.</p>;
  }
  if (!supabaseReady) return <p className="text-muted">База заявок ещё не подключена.</p>;

  const rows = await listBookings();
  const count = (format: string) => rows.filter((r) => r.format === format).length;

  return (
    <>
      <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line">
        {[
          ["Всего заявок", rows.length],
          ["Новые", rows.filter((r) => r.status === "new").length],
          ["В группы", count("group")],
        ].map(([k, v]) => (
          <div key={k} className="bg-surface px-5 py-4">
            <dt className="text-xs text-muted">{k}</dt>
            <dd className="display mt-2 text-4xl text-yellow">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="bg-surface text-xs text-muted">
            <tr>
              {["Когда", "Клиент", "Катание", "Формат", "Уровень", "Дата", "Чел.", "Комментарий", "Статус", ""].map((h) => (
                <th key={h} className="px-4 py-3 font-bold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((b) => (
              <tr key={b.id} className="align-top">
                <td className="whitespace-nowrap px-4 py-3 text-muted">
                  {new Date(b.created_at).toLocaleString("ru-RU", { timeZone: "Asia/Almaty", dateStyle: "short", timeStyle: "short" })}
                </td>
                <td className="px-4 py-3">
                  <p className="font-extrabold">{b.name}</p>
                  <a href={`tel:${b.phone}`} className="text-ice">
                    {b.phone}
                  </a>
                </td>
                <td className="px-4 py-3">{label.sport(b.sport)}</td>
                <td className="px-4 py-3">{label.format(b.format)}</td>
                <td className="px-4 py-3">{label.level(b.level)}</td>
                <td className="whitespace-nowrap px-4 py-3">{b.date ?? "—"}</td>
                <td className="px-4 py-3">{b.people}</td>
                <td className="max-w-[240px] px-4 py-3 text-muted">{b.comment ?? "—"}</td>
                <td className="px-4 py-3">
                  <span className={`eyebrow whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] ${STATUS[b.status]?.cls ?? ""}`}>
                    {STATUS[b.status]?.label ?? b.status}
                  </span>
                  {NEXT[b.status] && (
                    <form action={updateStatus} className="mt-2">
                      <input type="hidden" name="key" value={key} />
                      <input type="hidden" name="id" value={b.id} />
                      <input type="hidden" name="status" value={NEXT[b.status]!.to} />
                      <button className="whitespace-nowrap text-xs font-bold text-ice hover:underline">{NEXT[b.status]!.label}</button>
                    </form>
                  )}
                </td>
                <td className="px-4 py-3">
                  <a href={waLink(b)} target="_blank" rel="noopener" className="whitespace-nowrap rounded-full bg-yellow px-4 py-2 text-xs font-extrabold text-black">
                    Ответить
                  </a>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={10} className="px-4 py-10 text-center text-muted">
                  Заявок пока нет
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default function AdminPage(props: PageProps<"/admin">) {
  return (
    <main className="mx-auto max-w-[1320px] px-4 py-10 sm:px-6 lg:px-10">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>
        <p className="eyebrow text-muted">Панель школы</p>
      </div>
      <h1 className="display mt-10 text-5xl sm:text-6xl">Заявки</h1>
      <div className="mt-8">
        <Suspense fallback={<p className="text-muted">Загружаем заявки…</p>}>
          <Bookings searchParams={props.searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
