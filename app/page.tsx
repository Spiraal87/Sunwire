import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import BusinessCategories from "@/components/BusinessCategories";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Funnel from "@/components/Funnel";
import ROI from "@/components/ROI";
import EmberCallWidget from "@/components/EmberCallWidget";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import EnergyLine from "@/components/EnergyLine";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <div className="relative">
          <EnergyLine />
          <Hero />
          <BusinessCategories />
          <SectionDivider litCount={1} tintSide="bottom" ringScale={1.4} />
          <Services />
          <SectionDivider litCount={2} tintSide="top" ringScale={1.4} />
          <HowItWorks />
          <SectionDivider litCount={3} tintSide="bottom" ringScale={1.4} />
          <Funnel />
          <SectionDivider litCount={4} tintSide="top" ringScale={1.4} />
          <ROI />
          <SectionDivider litCount={5} tintSide="bottom" ringScale={1.4} />
          <EmberCallWidget />
        </div>
        <Contact />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}