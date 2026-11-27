import { FORMATS, LEVELS, SPORTS, type FormatId, type Sport } from "@/lib/data";
import { GOAL, WHO, pickByRules, priceFor, type PickInput, type PickResult } from "@/lib/pick";

const MODEL = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";

const PRICE_LIST = FORMATS.map(
  (f) =>
    `- ${f.id} (${f.title}): ${f.options
      .map((o) => `${o.hours} — ${o.price ? `${o.price} ₸${f.unit === "person" ? " с человека" : " за урок"}` : "цена по запросу"}`)
      .join("; ")}; людей ${f.minPeople}–${f.maxPeople}`,
).join("\n");

const SYSTEM = `Ты — администратор школы сноуборда и горных лыж Snow School в Алматы (обучаем с 2005 года, сертифицированные инструкторы).
Подбери клиенту один формат урока строго из прайса. Пиши по-русски, тепло и спокойно: человек должен почувствовать, что это безопасно и радостно.
Не выдумывай цены, скидки, факты и имена. Курорты: Шымбулак, Ак-Булак, Ой-Карагай, Лесная Сказка. Новичкам — пологие учебные склоны.
Дети — формат kids (с 5 лет). Группа — 2–5 человек. Вне трасс (freeride) — только для опытных.
Прайс:
${PRICE_LIST}
Ски-пасс и прокат оплачиваются отдельно, инструктор помогает подобрать снаряжение.`;

const SCHEMA = {
  type: "object",
  properties: {
    format: { type: "string", enum: FORMATS.map((f) => f.id) },
    sport: { type: "string", enum: ["snowboard", "ski"] },
    duration: { type: "string", description: "Длительность из прайса, например «2 ч»" },
    resort: { type: "string" },
    title: { type: "string", description: "Короткое название рекомендации, до 40 символов" },
    why: { type: "string", description: "Почему это подходит, 1–2 предложения" },
    tips: { type: "array", items: { type: "string" }, description: "2–3 коротких практических совета" },
  },
  required: ["format", "sport", "duration", "resort", "title", "why", "tips"],
};

function isValid(input: unknown): input is PickInput {
  const i = input as PickInput;
  return (
    !!i &&
    i.who in WHO &&
    LEVELS.some((l) => l.id === i.level) &&
    (i.sport === "unsure" || i.sport in SPORTS) &&
    i.goal in GOAL &&
    Number.isInteger(i.people) &&
    i.people >= 1 &&
    i.people <= 10
  );
}

export async function POST(req: Request) {
  const input = await req.json().catch(() => null);
  if (!isValid(input)) return Response.json({ error: "Некорректные данные" }, { status: 400 });

  const key = process.env.GEMINI_API_KEY;
  if (!key) return Response.json(pickByRules(input));

  const prompt = `Клиент: кто катается — ${WHO[input.who]}; уровень — ${LEVELS.find((l) => l.id === input.level)!.title}; на чём — ${
    input.sport === "unsure" ? "пока не знает" : SPORTS[input.sport]
  }; что важнее — ${GOAL[input.goal]}; человек — ${input.people}.`;

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
      method: "POST",
      headers: { "content-type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM }] },
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json", responseSchema: SCHEMA, temperature: 0.6 },
      }),
      signal: AbortSignal.timeout(12000),
    });
    if (!res.ok) throw new Error(`Gemini ${res.status}`);
    const data = await res.json();
    const ai = JSON.parse(data.candidates[0].content.parts[0].text) as Omit<PickResult, "price" | "source">;
    const format = FORMATS.some((f) => f.id === ai.format) ? (ai.format as FormatId) : pickByRules(input).format;
    const people = format === "group" ? Math.min(5, Math.max(2, input.people)) : input.people;
    const result: PickResult = {
      ...ai,
      format,
      sport: (ai.sport in SPORTS ? ai.sport : "ski") as Sport,
      tips: ai.tips.slice(0, 3),
      price: priceFor(format, people, ai.duration),
      source: "ai",
    };
    return Response.json(result);
  } catch (e) {
    console.error("pick: fallback to rules", e);
    return Response.json(pickByRules(input));
  }
}
