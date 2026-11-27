import { Booking } from "@/components/Booking";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Lessons } from "@/components/Lessons";
import { Picker } from "@/components/Picker";
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
        <Picker />
        <Safety />
        <FirstDay />
        <Pricing />
        <Resorts />
        <Gallery />
        <Faq />
        <Booking />
        <Partner />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
