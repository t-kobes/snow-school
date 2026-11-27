"use client";

import { SPORTS, type Sport } from "@/lib/data";

export function SportToggle({ value, onChange }: { value: Sport; onChange: (s: Sport) => void }) {
  const keys = Object.keys(SPORTS) as Sport[];
  return (
    <div role="radiogroup" aria-label="Вид катания" className="relative inline-grid grid-cols-2 rounded-full border border-line bg-surface p-1">
      <span
        aria-hidden
        className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-text transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: `translateX(${keys.indexOf(value) * 100}%)` }}
      />
      {keys.map((s) => (
        <button
          key={s}
          type="button"
          role="radio"
          aria-checked={value === s}
          onClick={() => onChange(s)}
          className={`relative rounded-full px-5 py-2.5 text-sm font-bold transition-colors duration-300 ${
            value === s ? "text-black" : "text-text/70 hover:text-text"
          }`}
        >
          {SPORTS[s]}
        </button>
      ))}
    </div>
  );
}
