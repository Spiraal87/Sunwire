import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav forge />
      <main className="sf-page sf-editorial">{children}</main>
      <Footer />
    </>
  );
}
