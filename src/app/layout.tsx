import type { Metadata, Viewport } from "next";
import { Inter_Tight, Manrope } from "next/font/google";
import "./globals.css";

const display = Inter_Tight({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["800", "900"],
  style: ["italic"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Snow School — школа сноуборда и горных лыж в Алматы",
  description:
    "Уроки сноуборда и горных лыж с сертифицированным инструктором на Шымбулаке, Ак-Булаке, Ой-Карагае и в Лесной Сказке. Индивидуально от 45 000 ₸, в группе 40 000 ₸ с человека. Дети с 5 лет.",
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${display.variable} ${body.variable} antialiased`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
