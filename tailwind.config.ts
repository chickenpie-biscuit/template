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
        // Vintage poster aesthetic color palette
        cream: {
          DEFAULT: "#F5F1E8",
          50: "#FDFCFA",
          100: "#F5F1E8",
          200: "#E8E0D0",
          300: "#D9CFB8",
        },
        red: {
          DEFAULT: "#E74C3C",
          50: "#FADBD8",
          100: "#F1948A",
          200: "#E74C3C",
          300: "#C0392B",
        },
        teal: {
          DEFAULT: "#4ECDC4",
          50: "#D5F4F2",
          100: "#85E0D9",
          200: "#4ECDC4",
          300: "#2E9B94",
        },
        goldenrod: {
          DEFAULT: "#F4A261",
          50: "#FCE4D6",
          100: "#F9C49A",
          200: "#F4A261",
          300: "#E67E22",
        },
        black: {
          DEFAULT: "#000000",
        },
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Space Mono"', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "65ch",
            color: "#000000",
            fontFamily: '"Space Mono", monospace',
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;

