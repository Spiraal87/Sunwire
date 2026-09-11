"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import ForgeHero from "@/components/ForgeHero";
import DimensionalService from "@/components/DimensionalService";
import BusinessCategories from "@/components/BusinessCategories";
import Services from "@/components/Services";
import StartingPoints from "@/components/StartingPoints";
import QuietDivider from "@/components/QuietDivider";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import ProblemSelector from "@/components/ProblemSelector";
import WebsiteDemo from "@/components/WebsiteDemo";

export default function Home() {
  const [servicesLit, setServicesLit] = useState(false);

  return (
    <>
      <Nav forge />
      <main className="sf-home">
        <ForgeHero />
        <DimensionalService />
        <div className="sf-continuation relative bg-panel-2-textured">
          <BusinessCategories />
          <ProblemSelector />
          <SectionDivider
            id="services"
            litCount={1}
            tintSide="bottom"
            ringScale={1.6}
            onIgnite={() => setServicesLit(true)}
          />
          <Services backlit={servicesLit} story="home" />
          <QuietDivider />
          <StartingPoints />
          <WebsiteDemo />
          <SectionDivider variant="contact" />
          <Contact />
          <FAQ />
        </div>
      </main>
      <Footer />
    </>
  );
}
