import dynamic from "next/dynamic";

const ThemeToggleContent = dynamic(
  () => import("./ThemeToggle").then((mod) => mod.ThemeToggleButton),
  { ssr: false }
);

export function ThemeToggle() {
  return <ThemeToggleContent />;
}
