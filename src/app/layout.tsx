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
  metadataBase: new URL("https://snow-school-almaty.vercel.app"),
  openGraph: {
    title: "Snow School — без страха, с инструктором, с улыбкой",
    description: "Уроки сноуборда и горных лыж в Алматы с 2005 года. Подбор урока за 30 секунд.",
    images: [{ url: "/photos/hero-smile.jpg", width: 2000, height: 1333 }],
    locale: "ru_RU",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: "Snow School Almaty",
  description: "Школа сноуборда и горных лыж в Алматы, обучаем с 2005 года",
  telephone: "+77775259885",
  address: { "@type": "PostalAddress", addressLocality: "Алматы", addressCountry: "KZ" },
  url: "https://snow-school-almaty.vercel.app",
  priceRange: "40 000 ₸ – 240 000 ₸",
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${display.variable} ${body.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-dvh">
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
