import { Plus } from "lucide-react";
import { FAQ, PHONE, PHONE_HREF, WHATSAPP } from "@/lib/data";
import { Logo } from "./Logo";

export function Faq() {
  return (
    <section id="faq" data-tint="#0b0b0c" className="mx-auto grid max-w-[1320px] gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-10 lg:py-32">
      <div className="reveal">
        <h2 className="reveal-mask display text-[clamp(40px,6vw,80px)]">
          Спрашивают
          <br />
          чаще всего
        </h2>
        <p className="mt-6 text-text/75">
          Не нашли ответ?{" "}
          <a href={`https://wa.me/${WHATSAPP}`} className="font-bold text-ice underline-offset-4 hover:underline">
            Напишите в WhatsApp
          </a>
        </p>
      </div>
      <div className="reveal divide-y divide-line border-y border-line">
        {FAQ.map((f) => (
          <details key={f.q} className="group py-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-extrabold [&::-webkit-details-marker]:hidden">
              {f.q}
              <Plus size={20} className="shrink-0 text-yellow transition-transform group-open:rotate-45" />
            </summary>
            <p className="mt-4 max-w-2xl leading-relaxed text-text/75">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-10">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Школа сноуборда и горных лыж в Алматы с 2005 года. Шымбулак, Ак-Булак, Ой-Карагай, Лесная Сказка.
          </p>
        </div>
        <div className="text-sm">
          <a href={PHONE_HREF} className="block text-lg font-extrabold hover:text-yellow">
            {PHONE}
          </a>
          <a href={`https://wa.me/${WHATSAPP}`} className="mt-2 block text-text/80 hover:text-ice">
            WhatsApp
          </a>
        </div>
        <div className="text-sm text-muted">
          <p>
            Трансфер, жильё и экскурсии —{" "}
            <a href="https://www.almaty-travel.kz/" target="_blank" rel="noopener" className="text-text underline decoration-line underline-offset-4 hover:decoration-ice">
              партнёр Kazakhstan Travel
            </a>
          </p>
          <p className="mt-4">Цены на 20.11.2026 · © 2026 Snow School Almaty</p>
        </div>
      </div>
    </footer>
  );
}
