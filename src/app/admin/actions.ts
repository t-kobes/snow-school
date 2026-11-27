"use server";

import { revalidatePath } from "next/cache";
import { setBookingStatus } from "@/lib/supabase";

const STATUSES = ["new", "confirmed", "done", "cancelled"];

export async function updateStatus(formData: FormData) {
  if (!process.env.ADMIN_KEY || formData.get("key") !== process.env.ADMIN_KEY) return;
  const id = Number(formData.get("id"));
  const status = String(formData.get("status"));
  if (!Number.isInteger(id) || !STATUSES.includes(status)) return;
  await setBookingStatus(id, status);
  revalidatePath("/admin");
}
