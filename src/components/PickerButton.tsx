"use client";

import { Sparkles } from "lucide-react";
import { openPicker } from "./PickerDialog";

export function PickerButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openPicker} className={className}>
      <Sparkles size={18} />
      Помочь выбрать
    </button>
  );
}
