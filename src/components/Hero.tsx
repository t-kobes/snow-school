import Image from "next/image";
import { ArrowDownRight, ArrowRight, Sparkles } from "lucide-react";
import { RESORTS } from "@/lib/data";

export function Hero() {
  const ticker = [...RESORTS, ...RESORTS, ...RESORTS, ...RESORTS];

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Фото: справа на десктопе, сверху на мобильном */}
      <div className="relative h-[62svh] w-full overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[58%]">
        <Image
          src="/photos/hero-smile.jpg"
          alt="Девушка в шлеме и маске улыбается на склоне с лыжами на плече"
          fill
          priority
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="kenburns object-cover object-[65%_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-transparent lg:bg-gradient-to-r lg:from-bg lg:via-bg/20 lg:to-transparent" />
      </div>

      <span className="eyebrow pointer-events-none absolute bottom-48 left-3 hidden origin-bottom-left -rotate-90 text-[10px] text-muted lg:block">
        Almaty · 43°N · с 2005 года
      </span>

      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6 lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-end lg:px-10 lg:pb-8 lg:pt-24">
        <div className="-mt-28 lg:mt-0">
          <p className="eyebrow mb-5 flex items-center gap-2 text-ice">
            <span className="pulse-dot size-1.5 rounded-full bg-ice" />
            Сезон 2026/27 открыт · Шымбулак работает
          </p>

          <h1 className="display relative z-10 w-fit bg-yellow px-5 py-5 text-[clamp(40px,5.4vw,80px)] text-black sm:px-8 sm:py-6">
            Без страха.
            <br />
            С инструктором.
            <br />
            С улыбкой.
          </h1>

          <p className="mt-7 max-w-[520px] text-base leading-relaxed text-text/85 sm:text-lg">
            Уроки сноуборда и горных лыж на Шымбулаке и ещё трёх курортах Алматы. Сертифицированные инструкторы,
            группы до 5 человек, дети — с 5 лет.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#booking"
              className="group inline-flex items-center gap-2 rounded-full bg-yellow px-7 py-4 font-extrabold text-black transition-transform hover:-translate-y-0.5"
            >
              Записаться на урок
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#picker"
              className="inline-flex items-center gap-2 rounded-full border border-ice/50 px-7 py-4 font-bold text-ice transition-colors hover:bg-ice hover:text-black"
            >
              <Sparkles size={18} />
              Подобрать урок за 30 секунд
            </a>
          </div>
        </div>

        {/* Сразу видно: групповые и индивидуальные */}
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-10 lg:max-w-[860px]">
          <a
            href="#lessons"
            className="group relative flex items-end justify-between gap-4 overflow-hidden rounded-2xl border border-line bg-surface/90 p-5 backdrop-blur transition-colors hover:border-yellow sm:p-6"
          >
            <div>
              <p className="eyebrow text-muted">01 · Индивидуально</p>
              <p className="display mt-3 text-3xl sm:text-4xl">от 45 000 ₸</p>
              <p className="mt-2 text-sm text-text/70">Только вы и инструктор · 1,5 ч — полный день</p>
            </div>
            <ArrowDownRight className="shrink-0 text-yellow transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
          </a>
          <a
            href="#lessons"
            className="group relative flex items-end justify-between gap-4 overflow-hidden rounded-2xl border border-line bg-surface/90 p-5 backdrop-blur transition-colors hover:border-ice sm:p-6"
          >
            <div>
              <p className="eyebrow text-muted">02 · В группе</p>
              <p className="display mt-3 text-3xl sm:text-4xl">
                40 000 ₸<span className="ml-1 text-base not-italic text-muted">/чел.</span>
              </p>
              <p className="mt-2 text-sm text-text/70">2–5 человек · 2 часа на склоне</p>
            </div>
            <ArrowDownRight className="shrink-0 text-ice transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
          </a>
        </div>
      </div>

      <div className="relative mt-12 overflow-hidden border-y border-line bg-bg py-3 lg:mt-0">
        <div className="ticker flex w-max gap-10 whitespace-nowrap">
          {ticker.map((r, i) => (
            <span key={i} className="eyebrow flex items-center gap-10 text-muted">
              {r.name}
              <span className="text-yellow">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
