import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Site-wide theme — same neutral dark + blue as the course pages.
        bg: "#1b1c20",
        "bg-alt": "#212226",
        "bg-alt2": "#2a2b30",
        fg: "#f2f2f4",
        "fg-dim": "#c4c5cc",
        "fg-faint": "#8e8f97",
        accent: "#2b7bf6",
        "accent-dim": "#1f5fc4",
        "accent-fg": "#0b1730",
        line: "#2e2f35",
        "line-strong": "#3f4047",
        // Course player (dashboard + lesson pages) — neutral dark theme.
        "c-bg": "#1b1c20",
        "c-card": "#212226",
        "c-hover": "#2a2b30",
        "c-line": "#33343a",
        "c-track": "#2e2f35",
        "c-text": "#f2f2f4",
        "c-body": "#d6d6db",
        "c-dim": "#a1a2aa",
        "c-blue": "#2b7bf6",
      },
      fontFamily: {
        display: ["Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        inter: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
