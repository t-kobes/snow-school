export const PHONE = "+7 777 525 98 85";
export const PHONE_HREF = "tel:+77775259885";
export const WHATSAPP = "77775259885";

export type Sport = "snowboard" | "ski";
export type Level = "beginner" | "intermediate" | "advanced";
export type FormatId = "individual" | "group" | "night" | "kids" | "freeride";

export const SPORTS: Record<Sport, string> = {
  snowboard: "Сноуборд",
  ski: "Горные лыжи",
};

export const LEVELS: { id: Level; title: string; hint: string }[] = [
  { id: "beginner", title: "Новичок", hint: "Ни разу не стоял на сноуборде или лыжах, или катался пару раз" },
  { id: "intermediate", title: "Продолжающий", hint: "Спускаюсь по зелёным и синим трассам" },
  { id: "advanced", title: "Опытный", hint: "Уверенно по красным и чёрным, хочу вне трасс" },
];

export type Option = { hours: string; price: number; label: string };

export type Format = {
  id: FormatId;
  title: string;
  short: string;
  unit: "lesson" | "person" | "request";
  options: Option[];
  minPeople: number;
  maxPeople: number;
};

// Прайс школы, актуален на 20.11.2026 (snow-school.kz/ru/prices)
export const FORMATS: Format[] = [
  {
    id: "individual",
    title: "Индивидуально",
    short: "Инструктор занимается только с вами",
    unit: "lesson",
    options: [
      { hours: "1,5 ч", price: 45000, label: "Урок 1,5 часа" },
      { hours: "2 ч", price: 60000, label: "Урок 2 часа" },
      { hours: "3 ч", price: 120000, label: "Полдня" },
      { hours: "6 ч", price: 240000, label: "Полный день" },
    ],
    minPeople: 1,
    maxPeople: 1,
  },
  {
    id: "group",
    title: "В группе",
    short: "2–5 человек, один инструктор",
    unit: "person",
    options: [{ hours: "2 ч", price: 40000, label: "Урок 2 часа" }],
    minPeople: 2,
    maxPeople: 5,
  },
  {
    id: "night",
    title: "Ночное катание",
    short: "Вечерний склон под прожекторами",
    unit: "lesson",
    options: [{ hours: "2 ч", price: 80000, label: "Урок 2 часа" }],
    minPeople: 1,
    maxPeople: 1,
  },
  {
    id: "kids",
    title: "Детям",
    short: "С 5 лет, индивидуально или в группе",
    unit: "request",
    options: [{ hours: "1,5 ч", price: 0, label: "Тренировка 1,5 часа" }],
    minPeople: 1,
    maxPeople: 5,
  },
  {
    id: "freeride",
    title: "Вне трасс с гидом",
    short: "Полный день для опытных райдеров",
    unit: "request",
    options: [{ hours: "6 ч", price: 0, label: "Полный день" }],
    minPeople: 1,
    maxPeople: 5,
  },
];

export const formatById = (id: FormatId) => FORMATS.find((f) => f.id === id)!;

export const tenge = (n: number) => `${n.toLocaleString("ru-RU").replace(/,/g, " ")} ₸`;

export const RESORTS = [
  {
    name: "Шымбулак",
    note: "Главный курорт Алматы над Медеу. Пологие учебные склоны для первого урока и длинные трассы, когда захочется большего.",
    photo: "/photos/shymbulak-school.jpg",
    tag: "Лучший старт",
  },
  {
    name: "Ак-Булак",
    note: "Талгарское ущелье. Спокойная атмосфера, без суеты — хорошо для обучения и семейного отдыха.",
    photo: "/photos/resort-akbulak.jpg",
    tag: "Для семьи",
  },
  {
    name: "Ой-Карагай",
    note: "Горнолыжный курорт под Алматы, одна из четырёх площадок школы.",
    photo: "/photos/resort-oiqaragai.webp",
    tag: "Широкие склоны",
  },
  {
    name: "Лесная Сказка",
    note: "Курорт среди елей в горах под Алматы. Здесь тоже можно взять урок с инструктором школы.",
    photo: "/photos/resort-forest.webp",
    tag: "Среди леса",
  },
];

export const FAQ = [
  {
    q: "Я ни разу не катался. Это не страшно?",
    a: "Нет. Первый урок — на пологом учебном склоне: стойка, торможение, как безопасно упасть и встать. На трассу идёте, когда сами готовы.",
  },
  {
    q: "Что входит в стоимость?",
    a: "Работа инструктора всё оплаченное время. Ски-пасс, прокат и дорога до курорта — отдельно. С прокатом инструктор поможет.",
  },
  {
    q: "Где проходят занятия?",
    a: "На четырёх курортах у Алматы: Шымбулак, Ак-Булак, Ой-Карагай и Лесная Сказка. Для первого урока подскажем самый спокойный склон.",
  },
  {
    q: "С какого возраста можно детям?",
    a: "С 5 лет. Тренировка 1,5 часа, индивидуально или в группе. Цену назовём по телефону или в WhatsApp.",
  },
  {
    q: "Как подтверждается запись?",
    a: "После заявки позвоним или напишем в WhatsApp и подтвердим инструктора, время и место встречи.",
  },
];

