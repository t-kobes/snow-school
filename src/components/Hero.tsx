import Image from "next/image";
import { ArrowDownRight, ArrowRight, Snowflake, Sparkles } from "lucide-react";
import { RESORTS } from "@/lib/data";

const LINES = ["Без страха.", "С инструктором.", "С улыбкой."];

export function Hero() {
  const ticker = [...RESORTS, ...RESORTS, ...RESORTS, ...RESORTS];

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Фото: справа на десктопе, сверху на мобильном. Открывается диагональным «карвом» */}
      <div className="hero-photo relative h-[62svh] w-full overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[58%]">
        <Image
          src="/photos/hero-smile.jpg"
          alt="Девушка в шлеме и маске улыбается на склоне с лыжами на плече"
          fill
          priority
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover object-[65%_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-transparent lg:bg-gradient-to-r lg:from-bg lg:via-bg/20 lg:to-transparent" />
        <p
          className="hero-rise absolute bottom-6 right-4 flex items-center gap-2 rounded-full bg-bg/70 px-4 py-2 text-xs font-bold backdrop-blur-md sm:right-6 lg:bottom-auto lg:right-10 lg:top-24"
          style={{ animationDelay: "1.1s" }}
        >
          <span className="pulse-dot size-1.5 rounded-full bg-ice" />
          Сезон 2026/27 открыт
        </p>
      </div>

      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6 lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-end lg:px-10 lg:pb-8 lg:pt-24">
        <div className="-mt-24 lg:mt-0">
          <h1 className="hero-block display relative z-10 w-fit bg-yellow px-5 py-5 text-[clamp(31px,5.4vw,80px)] text-black sm:px-8 sm:py-6">
            {LINES.map((l, i) => (
              <span key={l} className="hero-line">
                <span style={{ animationDelay: `${0.45 + i * 0.09}s` }}>{l}</span>
              </span>
            ))}
          </h1>

          <p
            className="hero-rise mt-7 max-w-[520px] text-base leading-relaxed text-text/85 sm:text-lg"
            style={{ animationDelay: "0.8s" }}
          >
            Уроки сноуборда и горных лыж на Шымбулаке и ещё трёх курортах Алматы. Сертифицированные инструкторы,
            группы до 5 человек, дети — с 5 лет.
          </p>

          <div className="hero-rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "0.9s" }}>
            <a
              href="#booking"
              className="press group inline-flex items-center gap-2 rounded-full bg-yellow px-7 py-4 font-extrabold text-black hover:bg-text"
            >
              Записаться на урок
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#picker"
              className="press inline-flex items-center gap-2 rounded-full border border-ice/50 px-7 py-4 font-bold text-ice hover:bg-ice hover:text-black"
            >
              <Sparkles size={18} />
              Подобрать урок за 30 секунд
            </a>
          </div>
        </div>

        {/* Сразу видно: групповые и индивидуальные */}
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-10 lg:max-w-[860px]">
          {[
            { k: "Индивидуально", v: "от 45 000 ₸", d: "Только вы и инструктор · 1,5 ч — полный день", c: "var(--yellow)", t: "text-yellow" },
            { k: "В группе", v: "40 000 ₸", u: "/чел.", d: "2–5 человек · 2 часа на склоне", c: "var(--ice)", t: "text-ice" },
          ].map((x, i) => (
            <a
              key={x.k}
              href="#lessons"
              style={{ ["--sweep" as string]: x.c, animationDelay: `${1 + i * 0.08}s` }}
              className="hero-rise sweep group relative flex items-end justify-between gap-4 rounded-2xl border border-line bg-surface p-5 hover:border-transparent hover:text-black sm:p-6"
            >
              <div>
                <p className="text-sm font-bold text-muted transition-colors group-hover:text-black/60">{x.k}</p>
                <p className="display mt-2 text-3xl tabular-nums sm:text-4xl">
                  {x.v}
                  {x.u && <span className="ml-1 text-base not-italic opacity-60">{x.u}</span>}
                </p>
                <p className="mt-2 text-sm text-text/70 transition-colors group-hover:text-black/70">{x.d}</p>
              </div>
              <ArrowDownRight
                className={`shrink-0 ${x.t} transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-1 group-hover:text-black`}
              />
            </a>
          ))}
        </div>
      </div>

      <div className="relative mt-12 overflow-hidden border-y border-line bg-bg py-3 lg:mt-0">
        <div className="ticker flex w-max gap-10 whitespace-nowrap">
          {ticker.map((r, i) => (
            <span key={i} className="eyebrow flex items-center gap-10 text-muted">
              {r.name}
              <Snowflake size={12} className="text-yellow" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
