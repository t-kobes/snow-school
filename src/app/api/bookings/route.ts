import { FORMATS, LEVELS, SPORTS } from "@/lib/data";
import { insertBooking, supabaseReady } from "@/lib/supabase";

export async function POST(req: Request) {
  const b = await req.json().catch(() => null);
  const name = String(b?.name ?? "").trim().slice(0, 80);
  const phone = String(b?.phone ?? "").trim().slice(0, 30);
  const people = Number(b?.people);

  if (
    !name ||
    phone.replace(/\D/g, "").length < 10 ||
    !(b.sport in SPORTS) ||
    !FORMATS.some((f) => f.id === b.format) ||
    !LEVELS.some((l) => l.id === b.level) ||
    !Number.isInteger(people) ||
    people < 1 ||
    people > 10
  ) {
    return Response.json({ error: "Проверьте имя и телефон" }, { status: 400 });
  }

  const row = {
    name,
    phone,
    sport: b.sport,
    format: b.format,
    level: b.level,
    people,
    date: /^\d{4}-\d{2}-\d{2}$/.test(b.date) ? b.date : null,
    comment: String(b.comment ?? "").trim().slice(0, 500) || null,
  };

  if (!supabaseReady) {
    console.warn("bookings: Supabase не настроен, заявка не сохранена", row);
    return Response.json({ ok: true, stored: false });
  }

  try {
    await insertBooking(row);
    return Response.json({ ok: true, stored: true });
  } catch (e) {
    console.error("bookings: insert failed", e);
    return Response.json({ error: "Не удалось сохранить заявку" }, { status: 502 });
  }
}
