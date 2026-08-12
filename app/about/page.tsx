import type { Metadata } from "next";
import About from "@/components/About";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

const DESCRIPTION =
  "Learn more about Sunforge Digital, the thinking behind the name, and who builds the websites and AI receptionist systems.";

export const metadata: Metadata = {
  title: "About",
  description: DESCRIPTION,
  openGraph: {
    title: "About Sunforge Digital",
    description: DESCRIPTION,
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        <About />
      </main>
      <Footer />
    </>
  );
}