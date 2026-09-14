import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "oklch(0.17 0.014 55)",
        "bg-alt": "oklch(0.205 0.016 55)",
        "bg-alt2": "oklch(0.245 0.018 55)",
        fg: "oklch(0.97 0.006 60)",
        "fg-dim": "oklch(0.74 0.02 60)",
        "fg-faint": "oklch(0.58 0.02 60)",
        accent: "oklch(0.76 0.15 55)",
        "accent-dim": "oklch(0.5 0.1 55)",
        "accent-fg": "oklch(0.16 0.02 55)",
        line: "oklch(1 0 0 / 0.09)",
        "line-strong": "oklch(1 0 0 / 0.16)",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "system-ui", "sans-serif"],
        body: ["'IBM Plex Sans'", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
