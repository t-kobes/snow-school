import type { FormatId, Level, Sport } from "./data";

export type Prefill = {
  format?: FormatId;
  sport?: Sport;
  level?: Level;
  people?: number;
  comment?: string;
};

export const PREFILL_EVENT = "snow:prefill";

export function prefillBooking(p: Prefill) {
  window.dispatchEvent(new CustomEvent<Prefill>(PREFILL_EVENT, { detail: p }));
  document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
}
