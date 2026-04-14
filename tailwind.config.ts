import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neutral template palette — override via CSS variables at :root
        background: "var(--color-bg)",
        foreground: "var(--color-fg)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",
        muted: "var(--color-muted)",
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
        pixel: ["var(--font-pixel)"],
      },
      typography: {
        DEFAULT: {
          css: {
            color: "var(--color-fg)",
            fontFamily: "var(--font-body)",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;