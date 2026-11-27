import Image from "next/image";

const POINTS = [
  { t: "Инструкторы с сертификатом", d: "Учим кататься с 2005 года — взрослых и детей с 5 лет." },
  { t: "Начинаем с пологого склона", d: "Стойка, торможение, как правильно падать. На трассу — когда сами готовы." },
  { t: "Не больше 5 человек", d: "В группе инструктор успевает поправить каждого." },
];

const FACES = [
  { src: "/photos/joy-jump.jpg", alt: "Двое друзей прыгают от радости на склоне" },
  { src: "/photos/kids-lift.jpg", alt: "Дети в шлемах улыбаются на подъёмнике" },
  { src: "/photos/snowboard-five.jpg", alt: "Сноубордисты дают пять друг другу" },
  { src: "/photos/family-ski.jpg", alt: "Папа катается с двумя детьми" },
];

export function Why() {
  return (
    <section id="why" className="border-t border-line">
      <div className="mx-auto max-w-[1320px] px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <h2 className="reveal-mask display text-[clamp(40px,6vw,80px)]">
            Здесь
            <br />
            не страшно
          </h2>
          <ul className="reveal divide-y divide-line border-y border-line">
            {POINTS.map((p) => (
              <li key={p.t} className="grid gap-1 py-5 sm:grid-cols-[minmax(0,16rem)_1fr] sm:gap-6">
                <p className="text-lg font-extrabold">{p.t}</p>
                <p className="text-muted">{p.d}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {FACES.map((f) => (
            <div key={f.src} className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image src={f.src} alt={f.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
