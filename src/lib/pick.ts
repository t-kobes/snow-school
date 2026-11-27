import { formatById, tenge, type FormatId, type Level, type Sport } from "./data";

export type Who = "adult" | "kid" | "family" | "friends";
export type Goal = "progress" | "fun" | "budget" | "calm";

export type PickInput = {
  who: Who;
  level: Level;
  sport: Sport | "unsure";
  goal: Goal;
  people: number;
};

export type PickResult = {
  format: FormatId;
  sport: Sport;
  duration: string;
  resort: string;
  price: string;
  title: string;
  why: string;
  tips: string[];
  source: "ai" | "rules";
};

export const WHO: Record<Who, string> = {
  adult: "Я сам(а)",
  kid: "Ребёнок",
  family: "Семья с детьми",
  friends: "Компания друзей",
};

export const GOAL: Record<Goal, string> = {
  progress: "Научиться быстро",
  fun: "Чтобы было весело",
  budget: "Выгоднее",
  calm: "Спокойно и без стресса",
};

export function priceFor(format: FormatId, people: number, duration?: string): string {
  const f = formatById(format);
  if (f.unit === "request") return "по запросу";
  const opt = f.options.find((o) => o.hours === duration) ?? f.options[0];
  return f.unit === "person" ? `${tenge(opt.price * people)} за ${people} чел.` : tenge(opt.price);
}

// Запасной подбор без AI — работает всегда, даже без сети
export function pickByRules(i: PickInput): PickResult {
  const sport: Sport = i.sport === "unsure" ? (i.who === "kid" ? "ski" : "snowboard") : i.sport;
  let format: FormatId;
  let duration: string;

  if (i.who === "kid" || (i.who === "family" && i.level === "beginner")) {
    format = "kids";
    duration = "1,5 ч";
  } else if (i.level === "advanced" && i.goal !== "calm") {
    format = i.goal === "progress" ? "freeride" : "individual";
    duration = format === "freeride" ? "6 ч" : "2 ч";
  } else if (i.people >= 2 && i.people <= 5 && (i.goal === "budget" || i.goal === "fun")) {
    format = "group";
    duration = "2 ч";
  } else {
    format = "individual";
    duration = i.level === "beginner" ? "1,5 ч" : "2 ч";
  }

  const resort = i.level === "beginner" || i.goal === "calm" ? "Ак-Булак или учебный склон Шымбулака" : "Шымбулак";
  const people = format === "group" ? Math.max(2, i.people) : i.people;

  return {
    format,
    sport,
    duration,
    resort,
    price: priceFor(format, people, duration),
    title: `${formatById(format).title}, ${duration}`,
    why:
      format === "group"
        ? "Вас несколько, и важно, чтобы было весело и разумно по цене. В группе до 5 человек инструктор успевает поправить каждого."
        : format === "kids"
          ? "Детская тренировка короче — 1,5 часа, чтобы ребёнок не устал и захотел вернуться. Инструктор работает с детьми от 5 лет."
          : format === "freeride"
            ? "Вы уверенно катаетесь по красным и чёрным — следующий шаг это целинный снег с гидом, который знает безопасные маршруты."
            : "Один на один инструктор подстраивается под ваш темп: первые повороты получаются уже на первом занятии.",
    tips: [
      "Ски-пасс и прокат оплачиваются отдельно — инструктор поможет подобрать снаряжение.",
      "Возьмите тёплые перчатки, маску и непромокаемую одежду.",
      i.level === "beginner" ? "Первый урок проходит на пологом учебном склоне." : "Расскажите инструктору, что уже получается — начнёте с этого места.",
    ],
    source: "rules",
  };
}
