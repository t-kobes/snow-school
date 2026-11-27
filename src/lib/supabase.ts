// Тонкий REST-клиент Supabase: только сервер, ключ service_role не уходит в браузер
const URL = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SECRET_KEY;

export const supabaseReady = Boolean(URL && KEY);

export type BookingRow = {
  id: number;
  created_at: string;
  name: string;
  phone: string;
  sport: string;
  format: string;
  date: string | null;
  people: number;
  level: string;
  comment: string | null;
  status: string;
};

async function rest(path: string, init?: RequestInit) {
  const res = await fetch(`${URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: KEY!,
      authorization: `Bearer ${KEY}`,
      "content-type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
  return res;
}

export async function insertBooking(row: Omit<BookingRow, "id" | "created_at" | "status">) {
  await rest("bookings", { method: "POST", body: JSON.stringify(row), headers: { prefer: "return=minimal" } });
}

export async function listBookings(): Promise<BookingRow[]> {
  const res = await rest("bookings?select=*&order=created_at.desc&limit=200");
  return res.json();
}

export async function setBookingStatus(id: number, status: string) {
  await rest(`bookings?id=eq.${id}`, { method: "PATCH", body: JSON.stringify({ status }) });
}
