import { Booking } from "@/components/Booking";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Lessons } from "@/components/Lessons";
import { Picker } from "@/components/Picker";
import { Marquee } from "@/components/Marquee";
import { Pricing } from "@/components/Pricing";
import { RevealObserver } from "@/components/Reveal";
import { Faq, FirstDay, Footer, Gallery, Partner, Resorts, Safety } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Lessons />
        <Marquee top="Без страха — с улыбкой —" bottom="С 2005 года · 4 курорта · группы до 5 · дети с 5 лет ·" />
        <Picker />
        <Safety />
        <FirstDay />
        <Pricing />
        <Resorts />
        <Gallery />
        <Marquee top="Шымбулак · Ак-Булак · Ой-Карагай · Лесная Сказка ·" bottom="Первый спуск ждёт —" />
        <Faq />
        <Booking />
        <Partner />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
