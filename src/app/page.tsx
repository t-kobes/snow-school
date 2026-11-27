import { BookingFlow } from "@/components/BookingFlow";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Lessons } from "@/components/Lessons";
import { PickerDialog } from "@/components/PickerDialog";
import { RevealObserver } from "@/components/Reveal";
import { Faq, Footer } from "@/components/Sections";
import { Why } from "@/components/Why";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Lessons />
        <Why />
        <BookingFlow />
        <Faq />
      </main>
      <Footer />
      <PickerDialog />
      <RevealObserver />
    </>
  );
}
