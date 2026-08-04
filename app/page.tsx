import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import AboutOperator from "@/components/AboutOperator";
import HowItWorks from "@/components/HowItWorks";
import Funnel from "@/components/Funnel";
import ROI from "@/components/ROI";
import Demo from "@/components/Demo";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import About from "@/components/About";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SectionDivider litCount={1} />
        <Services />
        <SectionDivider litCount={2} />
        <HowItWorks />
        <SectionDivider litCount={3} />
        <Funnel />
        <SectionDivider litCount={4} />
        <ROI />
        <SectionDivider litCount={5} />
        <Demo />
        <FAQ />
        <Contact />
        <About />
        <AboutOperator />
      </main>
      <Footer />
    </>
  );
}
