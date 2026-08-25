"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import BusinessCategories from "@/components/BusinessCategories";
import Services from "@/components/Services";
import SystemComparison from "@/components/SystemComparison";
import OperationsSpotlight from "@/components/OperationsSpotlight";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import EnergyLine from "@/components/EnergyLine";

export default function Home() {
  const [servicesLit, setServicesLit] = useState(false);
  const [comparisonLit, setComparisonLit] = useState(false);

  return (
    <>
      <Nav />
      <main>
        <EnergyLine />
        <Hero
          heading={
            <>
              Capture customers through{" "}
              <span className="gradient-text">calls and online.</span>
            </>
          }
          subhead="Build a complete customer-capture system with an AI receptionist that answers calls and a website that converts visitors. Start with what your business needs most, then layer in the rest as you grow."
          eyebrow="A Suite of Systems for Local Business"
          secondaryCta={{
            label: "Try the AI Demo",
            href: "/receptionist#demo",
            cta: "ai_receptionist_demo",
            placement: "homepage_hero",
          }}
        />
        <div className="relative bg-panel-2-textured">
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
          <Contact />
          <FAQ />
        </div>
      </main>
      <Footer />
    </>
  );
}
