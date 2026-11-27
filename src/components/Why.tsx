import Image from "next/image";
import { PisteMark } from "./BookingFlow";

const POINTS = [
  { t: "Инструкторы с сертификатом", d: "Учим кататься с 2005 года — взрослых и детей с 5 лет." },
  { t: "Начинаем с пологого склона", d: "Стойка, торможение, как правильно падать. На трассу — когда сами готовы." },
  { t: "Не больше 5 человек", d: "В группе инструктор успевает поправить каждого." },
];

export function Why() {
  return (
    <section id="why" data-tint="#0e1117" className="mx-auto max-w-[1320px] px-4 py-24 sm:px-6 lg:px-10 lg:py-36">
      <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-0">
        {/* Коллаж: снимки из поездки лежат друг на друге */}
        <div className="relative mx-auto w-full max-w-[560px] pb-16 pl-6 sm:pl-10 lg:mx-0">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <Image src="/photos/joy-jump.jpg" alt="Двое друзей прыгают от радости на склоне" fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
            <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-bg/75 px-3 py-1.5 text-xs font-bold backdrop-blur-md">
              <PisteMark level="beginner" size={14} /> Новичкам — пологий учебный склон
            </span>
          </div>
          <div className="absolute -left-2 top-24 w-[38%] -rotate-6 overflow-hidden rounded-2xl border-[6px] border-[var(--bg)] shadow-[0_24px_50px_-16px_rgb(0_0_0/0.8)] transition-transform duration-500 hover:rotate-0 sm:-left-4">
            <div className="relative aspect-[3/4]">
              <Image src="/photos/kids-lift.jpg" alt="Дети в шлемах улыбаются на подъёмнике" fill sizes="20vw" className="object-cover" />
            </div>
          </div>
          <div className="absolute -right-2 bottom-0 w-[46%] rotate-3 overflow-hidden rounded-2xl border-[6px] border-[var(--bg)] shadow-[0_24px_50px_-16px_rgb(0_0_0/0.8)] transition-transform duration-500 hover:rotate-0 sm:-right-6">
            <div className="relative aspect-[4/3]">
              <Image src="/photos/family-ski.jpg" alt="Папа катается с двумя детьми" fill sizes="25vw" className="object-cover" />
            </div>
          </div>
        </div>

        {/* Пункты заходят на край коллажа */}
        <div className="relative z-10 lg:-ml-16">
          <h2 className="reveal-mask display text-[clamp(40px,6vw,80px)] lg:pl-16">
            Здесь
            <br />
            не страшно
          </h2>
          <ul className="mt-10 space-y-3">
            {POINTS.map((p, i) => (
              <li
                key={p.t}
                style={{ ["--i" as string]: i }}
                className={`reveal rounded-2xl border border-white/10 bg-surface/80 p-5 shadow-[0_24px_50px_-24px_rgb(0_0_0/0.9)] backdrop-blur-xl sm:p-6 ${
                  i === 1 ? "lg:ml-16" : i === 2 ? "lg:ml-8" : ""
                }`}
              >
                <p className="text-lg font-extrabold">{p.t}</p>
                <p className="mt-1 text-muted">{p.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
