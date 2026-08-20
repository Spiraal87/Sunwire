"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import BusinessCategories from "@/components/BusinessCategories";
import Services from "@/components/Services";
import SystemComparison from "@/components/SystemComparison";
import OperationsSpotlight from "@/components/OperationsSpotlight";
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
  const [servicesLit, setServicesLit] = useState(false);
  const [comparisonLit, setComparisonLit] = useState(false);
  const [howItWorksLit, setHowItWorksLit] = useState(false);
  const [funnelLit, setFunnelLit] = useState(false);
  const [roiLit, setRoiLit] = useState(false);
  const [emberLit, setEmberLit] = useState(false);

  return (
    <>
      <Nav />
      <main>
        <EnergyLine />
        <Hero />
        <div className="relative">
          <BusinessCategories />
          <SectionDivider
            id="services"
            litCount={1}
            tintSide="bottom"
            ringScale={1.6}
            onIgnite={() => setServicesLit(true)}
          />
          <Services backlit={servicesLit} />
          <SectionDivider
            litCount={2}
            tintSide="top"
            ringScale={1.6}
            onIgnite={() => setComparisonLit(true)}
          />
          <SystemComparison backlit={comparisonLit} />
          <OperationsSpotlight />
          <SectionDivider
            id="how-it-works"
            litCount={3}
            tintSide="bottom"
            ringScale={1.6}
            onIgnite={() => setHowItWorksLit(true)}
          />
          <HowItWorks backlit={howItWorksLit} />
          <SectionDivider
            litCount={4}
            tintSide="top"
            ringScale={1.6}
            onIgnite={() => setFunnelLit(true)}
          />
          <Funnel backlit={funnelLit} />
          <SectionDivider
            litCount={5}
            tintSide="bottom"
            ringScale={1.6}
            onIgnite={() => setRoiLit(true)}
          />
          <ROI backlit={roiLit} />
          <SectionDivider
            id="demo"
            litCount={5}
            tintSide="top"
            ringScale={1.6}
            onIgnite={() => setEmberLit(true)}
          />
          <EmberCallWidget backlit={emberLit} />
          <Contact />
          <FAQ />
        </div>
      </main>
      <Footer />
    </>
  );
}
