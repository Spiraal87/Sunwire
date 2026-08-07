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

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <BusinessCategories />
        <SectionDivider litCount={1} tintSide="bottom" />
        <Services />
        <SectionDivider litCount={2} tintSide="top" />
        <HowItWorks />
        <SectionDivider litCount={3} tintSide="bottom" />
        <Funnel />
        <SectionDivider litCount={4} tintSide="top" />
        <ROI />
        <SectionDivider litCount={5} tintSide="bottom" />
        <EmberCallWidget />
        <Contact />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}