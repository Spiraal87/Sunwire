import type { Metadata } from "next";
import About from "@/components/About";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "About Sunforge Digital",
  description:
    "Learn more about Sunforge Digital, the thinking behind the name, and who builds the websites and AI receptionist systems.",
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