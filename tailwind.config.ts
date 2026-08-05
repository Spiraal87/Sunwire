import type { Config } from "tailwindcss";

// Design System: Molten
// Charcoal steel backgrounds, warm bronze highlights, subtle sunrise
// illumination, precision line work, forged craftsmanship.
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#08080a",
        panel: "#141210",
        "panel-2": "#0d0b09",
        line: "rgba(247,246,243,0.07)",
        gold: "#E6A84B",
        coral: "#D38A34",
        highlight: "#F2C870",
        "text-primary": "#F7F6F3",
        "text-muted": "#A8A8AC",
        "text-muted-dark": "#6B6B6F",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-manrope)", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-accent": "linear-gradient(135deg, #F2C870 0%, #E6A84B 45%, #D38A34 100%)",
        "gradient-panel": "linear-gradient(160deg, #141210, #0d0b09)",
      },
      boxShadow: {
        surface: "0 24px 48px -32px rgba(0,0,0,0.55)",
        forge: "0 0 0 1px rgba(230,168,75,0.18), 0 12px 28px -16px rgba(211,138,52,0.35)",
        glow: "0 0 0 1px rgba(230,168,75,0.45), 0 0 40px 4px rgba(230,168,75,0.25), 0 0 90px 12px rgba(211,138,52,0.12)",
      },
      borderRadius: {
        panel: "20px",
        card: "16px",
        btn: "10px",
      },
    },
  },
  plugins: [],
};
export default config;
