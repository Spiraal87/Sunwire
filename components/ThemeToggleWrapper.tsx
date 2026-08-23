import dynamic from "next/dynamic";

const ThemeToggleContent = dynamic(
  () => import("./ThemeToggle").then((mod) => mod.ThemeToggleButton),
  { ssr: false, loading: () => <div className="p-2 w-5 h-5" /> }
);

export function ThemeToggle() {
  return <ThemeToggleContent />;
}
