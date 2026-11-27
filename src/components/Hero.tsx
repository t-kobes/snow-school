import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PickerButton } from "./PickerButton";
import { QuickBook } from "./QuickBook";

const LINES = ["Без страха.", "С инструктором.", "С улыбкой."];

export function Hero() {
  return (
    <section id="top" data-tint="#0b0b0c" className="relative">
      {/* Фото на всю ширину, края растворяются в фоне */}
      <div className="hero-photo absolute inset-x-0 top-0 h-[62svh] overflow-hidden lg:left-[22%] lg:h-[100svh]">
        <Image
          src="/photos/hero-smile.jpg"
          alt="Девушка в шлеме и маске улыбается на склоне с лыжами на плече"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[65%_25%] lg:object-[80%_25%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-bg via-bg/70 to-transparent" />
      </div>

      <div className="relative mx-auto flex max-w-[1320px] flex-col px-4 pt-[50svh] sm:px-6 lg:min-h-[100svh] lg:justify-end lg:px-10 lg:pt-24">
        <p
          className="hero-rise mb-6 hidden w-fit items-center sm:inline-flex gap-2 rounded-full bg-bg/60 px-4 py-2 text-xs font-bold backdrop-blur-md"
          style={{ animationDelay: "1.1s" }}
        >
          <span className="pulse-dot size-1.5 rounded-full bg-ice" />
          Сезон 2026/27 открыт · Шымбулак, Ак-Булак, Ой-Карагай, Лесная Сказка
        </p>

        <h1 className="hero-block display relative z-10 w-fit bg-yellow px-5 py-5 text-[clamp(31px,4.5vw,68px)] text-black sm:px-8 sm:py-6">
          {LINES.map((l, i) => (
            <span key={l} className="hero-line">
              <span style={{ animationDelay: `${0.45 + i * 0.09}s` }}>{l}</span>
            </span>
          ))}
        </h1>

        <div className="hero-rise mt-6 flex flex-col gap-6 sm:flex-row sm:items-center" style={{ animationDelay: "0.85s" }}>
          <p className="hidden max-w-[460px] text-base leading-relaxed text-text/90 sm:block sm:text-lg">
            Уроки сноуборда и горных лыж в Алматы с 2005 года. Группы до 5 человек, дети — с 5 лет.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#booking" className="press group inline-flex items-center gap-2 rounded-full bg-text px-5 py-3 sm:px-6 sm:py-3.5 font-extrabold text-black hover:bg-yellow">
              Все форматы
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <PickerButton className="press inline-flex items-center gap-2 rounded-full border border-ice/60 bg-bg/40 px-5 py-3 sm:px-6 sm:py-3.5 font-bold text-ice backdrop-blur-md hover:bg-ice hover:text-black" />
          </div>
        </div>

        {/* Виджет лежит на стыке фото и следующей секции */}
        <div className="hero-rise relative z-20 mt-10 translate-y-1/3 lg:max-w-[880px]" style={{ animationDelay: "1s" }}>
          <QuickBook />
        </div>
      </div>
    </section>
  );
}
