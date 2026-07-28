import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#12152A",
        panel: "#1B2040",
        "panel-2": "#232A4E",
        line: "rgba(246,243,236,0.10)",
        gold: "#FFC759",
        coral: "#FF6B4A",
        "text-primary": "#F6F3EC",
        "text-muted": "#99A2C7",
        "text-muted-dark": "#6B729A",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-manrope)", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-accent": "linear-gradient(100deg, #FFC759, #FF6B4A)",
        "gradient-panel": "linear-gradient(160deg, #232A4E, #1B2040)",
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
