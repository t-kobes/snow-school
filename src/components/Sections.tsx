import Image from "next/image";
import { ArrowUpRight, Award, Backpack, Baby, Bus, Plus, ShieldCheck, Users } from "lucide-react";
import { FAQ, PHONE, PHONE_HREF, RESORTS, TRUST, WHATSAPP } from "@/lib/data";
import { Logo } from "./Logo";

const SAFETY = [
  { icon: Award, t: "Сертифицированные инструкторы", d: "Учим кататься с 2005 года — знаем, чего боятся новички, и как это снять." },
  { icon: ShieldCheck, t: "Начинаем с пологого склона", d: "Сначала учимся стоять, тормозить и правильно падать. На трассу — когда сами готовы." },
  { icon: Users, t: "Не больше 5 человек", d: "В группе инструктор видит каждого и успевает поправить каждого." },
  { icon: Backpack, t: "Поможем с прокатом", d: "Инструктор подберёт доску или лыжи, ботинки и шлем по размеру." },
  { icon: Baby, t: "Дети — с 5 лет", d: "Короткие тренировки по 1,5 часа, чтобы ребёнок не устал и захотел ещё." },
  { icon: Bus, t: "Трансфер из отеля", d: "Партнёр Kazakhstan Travel привезёт в горы и обратно." },
];

export function Safety() {
  return (
    <section id="safety" className="mx-auto max-w-[1320px] px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="reveal relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <Image
              src="/photos/kids-lift.jpg"
              alt="Дети в шлемах улыбаются на кресельном подъёмнике"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 right-4 max-w-[260px] rounded-2xl bg-ice p-5 text-black shadow-2xl sm:right-[-24px]">
            <p className="display text-4xl">с 2005</p>
            <p className="mt-1 text-sm font-semibold">года ставим на склон взрослых и детей</p>
          </div>
        </div>

        <div>
          <div className="reveal">
            <p className="eyebrow text-ice">Безопасность</p>
            <h2 className="display mt-4 text-[clamp(40px,6vw,80px)]">
              Здесь
              <br />
              не страшно
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-text/80">
              Горы — это радость, когда рядом тот, кто знает склон. Мы ведём от первого шага до первого
              самостоятельного спуска.
            </p>
          </div>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
            {SAFETY.map(({ icon: Icon, t, d }) => (
              <li key={t} className="reveal bg-bg p-6">
                <Icon size={22} className="text-yellow" />
                <p className="mt-4 font-extrabold">{t}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <dl className="reveal mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4">
        {TRUST.map((s) => (
          <div key={s.v} className="bg-surface px-6 py-8">
            <dt className="display text-5xl text-yellow sm:text-6xl">{s.k}</dt>
            <dd className="mt-3 text-sm text-text/75">{s.v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

const DAY = [
  { t: "Заявка", d: "На сайте или в WhatsApp: даты, формат, уровень и сколько вас." },
  { t: "Подтверждение", d: "Называем инструктора, время и место встречи на курорте." },
  { t: "Встреча на курорте", d: "Инструктор встречает вас. Ски-пасс покупаете в кассе курорта." },
  { t: "Прокат", d: "Вместе подбираем доску или лыжи, ботинки и шлем по размеру." },
  { t: "Учебный склон", d: "Стойка, торможение, как безопасно упасть и встать." },
  { t: "Первый спуск", d: "Сами, уверенно и с улыбкой — а инструктор рядом." },
];

export function FirstDay() {
  return (
    <section id="first-day" className="mx-auto max-w-[1320px] px-4 pb-24 sm:px-6 lg:px-10 lg:pb-32">
      <div className="reveal flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <p className="eyebrow text-yellow">Как это будет</p>
          <h2 className="display mt-4 text-[clamp(40px,6vw,80px)]">
            Ваш первый день
            <br />
            по шагам
          </h2>
        </div>
        <p className="max-w-sm text-text/75">Никаких сюрпризов: вы заранее знаете, кто встретит, где и что будет дальше.</p>
      </div>
      <ol className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-6">
        {DAY.map((s, i) => (
          <li key={s.t} className={`reveal relative p-6 ${i === DAY.length - 1 ? "bg-yellow text-black" : "bg-surface"}`}>
            <span className={`display text-5xl ${i === DAY.length - 1 ? "text-black/25" : "text-text/15"}`}>0{i + 1}</span>
            <p className="mt-6 font-extrabold">{s.t}</p>
            <p className={`mt-2 text-sm leading-relaxed ${i === DAY.length - 1 ? "text-black/75" : "text-muted"}`}>{s.d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Resorts() {
  return (
    <section id="resorts" className="mx-auto max-w-[1320px] px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
      <div className="reveal flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <p className="eyebrow text-yellow">Где учимся</p>
          <h2 className="display mt-4 text-[clamp(40px,6vw,80px)]">
            4 курорта
            <br />у самого города
          </h2>
        </div>
        <p className="max-w-sm text-text/75">
          Подскажем, куда ехать на первый урок, а куда — когда захочется длинных трасс.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {RESORTS.map((r, i) => (
          <article key={r.name} className="reveal group relative aspect-[3/4] overflow-hidden rounded-3xl border border-line">
            <Image
              src={r.photo}
              alt={`Склон курорта ${r.name}`}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <span className="eyebrow absolute left-5 top-5 text-[10px] text-text/80">0{i + 1}</span>
            <span className="eyebrow absolute right-5 top-5 rounded-full bg-bg/70 px-3 py-1.5 text-[10px] backdrop-blur">
              {r.tag}
            </span>
            <div className="absolute inset-x-0 bottom-0 p-5">
              <h3 className="display text-3xl">{r.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text/80">{r.note}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const GALLERY = [
  { src: "/photos/joy-jump.jpg", alt: "Двое друзей прыгают от радости на склоне", cls: "row-span-2", cap: "Первый спуск без падений" },
  { src: "/photos/kids-line.jpg", alt: "Дети в ярких костюмах идут друг за другом по склону", cls: "", cap: "Детская группа" },
  { src: "/photos/snowboard-five.jpg", alt: "Сноубордисты дают пять друг другу", cls: "", cap: "Получилось!" },
  { src: "/photos/family-ski.jpg", alt: "Папа катается с двумя детьми", cls: "row-span-2", cap: "Всей семьёй" },
  { src: "/photos/friends-retro.jpg", alt: "Двое друзей улыбаются на курорте", cls: "", cap: "После урока" },
  { src: "/photos/snowboard-laugh.jpg", alt: "Сноубордисты смеются, сидя на снегу", cls: "", cap: "Отдых на склоне" },
];

export function Gallery() {
  return (
    <section id="gallery" className="border-y border-line bg-surface py-24 lg:py-32">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <div className="reveal">
          <p className="eyebrow text-ice">Как это выглядит</p>
          <h2 className="display mt-4 text-[clamp(40px,6vw,80px)]">
            Улыбки
            <br />
            вместо страха
          </h2>
        </div>
        <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] lg:grid-cols-4">
          {GALLERY.map((g) => (
            <figure key={g.src} className={`reveal group relative overflow-hidden rounded-2xl ${g.cls}`}>
              <Image
                src={g.src}
                alt={g.alt}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <figcaption className="eyebrow absolute bottom-3 left-3 rounded-full bg-bg/75 px-3 py-1.5 text-[10px] backdrop-blur">
                {g.cap}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" className="mx-auto grid max-w-[1320px] gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-10 lg:py-32">
      <div className="reveal">
        <p className="eyebrow text-yellow">Вопросы</p>
        <h2 className="display mt-4 text-[clamp(40px,6vw,80px)]">
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

export function Partner() {
  return (
    <section className="mx-auto max-w-[1320px] px-4 pb-24 sm:px-6 lg:px-10">
      <div className="reveal relative overflow-hidden rounded-3xl border border-line">
        <Image src="/photos/panorama.webp" alt="Панорама Заилийского Алатау" fill sizes="100vw" className="object-cover opacity-40" />
        <div className="relative grid gap-8 bg-gradient-to-r from-navy via-navy/90 to-navy/40 p-8 sm:p-12 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow text-ice">Партнёр · Kazakhstan Travel</p>
            <h2 className="display mt-4 text-[clamp(32px,4.5vw,60px)]">Приезжаете в Алматы?</h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-text/85">
              Встретим в аэропорту, поможем с трансфером и жильём, а в день без катания покажем Чарынский каньон и
              озёра Кольсай и Каинды.
            </p>
          </div>
          <a
            href="https://www.almaty-travel.kz/"
            target="_blank"
            rel="noopener"
            className="inline-flex w-fit items-center gap-2 justify-self-start rounded-full bg-text px-7 py-4 font-extrabold text-black transition-colors hover:bg-ice lg:justify-self-end"
          >
            Трансфер и экскурсии <ArrowUpRight size={18} />
          </a>
        </div>
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
            Школа сноуборда и горных лыж в Алматы. Обучаем с 2005 года на Шымбулаке, Ак-Булаке, Ой-Карагае и в Лесной
            Сказке.
          </p>
        </div>
        <div className="text-sm">
          <p className="eyebrow mb-4 text-muted">Связаться</p>
          <a href={PHONE_HREF} className="block font-extrabold hover:text-yellow">
            {PHONE}
          </a>
          <a href={`https://wa.me/${WHATSAPP}`} className="mt-2 block text-text/80 hover:text-ice">
            WhatsApp
          </a>
          <a href="https://snow-school.kz/ru/" className="mt-2 block text-text/80 hover:text-ice">
            snow-school.kz
          </a>
        </div>
        <div className="text-sm text-muted">
          <p className="eyebrow mb-4">Важно</p>
          <p>Ски-пасс и прокат оплачиваются отдельно. Цены актуальны на 20 ноября 2026 года.</p>
          <p className="mt-6">© 2026 Snow School Almaty</p>
        </div>
      </div>
    </footer>
  );
}
