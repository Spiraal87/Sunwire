"use client";

import { useState } from "react";
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
  // Flipped once each divider's beam flare ignites (see onIgnite on
  // SignalGraphic/SectionDivider) so the section right below it can pick up
  // a matching backlight — lifted up here since it's the shared parent of
  // each divider/section pair.
  const [servicesLit, setServicesLit] = useState(false);
  const [howItWorksLit, setHowItWorksLit] = useState(false);
  const [funnelLit, setFunnelLit] = useState(false);
  const [roiLit, setRoiLit] = useState(false);
  const [emberLit, setEmberLit] = useState(false);

  return (
    <>
      <Nav />
      <main>
        <div className="relative">
          <EnergyLine />
          <Hero />
          <BusinessCategories />
          <SectionDivider
            id="services"
            litCount={1}
            tintSide="bottom"
            ringScale={1.4}
            onIgnite={() => setServicesLit(true)}
          />
          <Services backlit={servicesLit} />
          <SectionDivider
            id="how-it-works"
            litCount={2}
            tintSide="top"
            ringScale={1.4}
            onIgnite={() => setHowItWorksLit(true)}
          />
          <HowItWorks backlit={howItWorksLit} />
          <SectionDivider
            litCount={3}
            tintSide="bottom"
            ringScale={1.4}
            onIgnite={() => setFunnelLit(true)}
          />
          <Funnel backlit={funnelLit} />
          <SectionDivider
            litCount={4}
            tintSide="top"
            ringScale={1.4}
            onIgnite={() => setRoiLit(true)}
          />
          <ROI backlit={roiLit} />
          <SectionDivider
            id="demo"
            litCount={5}
            tintSide="bottom"
            ringScale={1.4}
            onIgnite={() => setEmberLit(true)}
          />
          <EmberCallWidget backlit={emberLit} />
        </div>
        <Contact />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}