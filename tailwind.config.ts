import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        unrollScroll: {
          '0%': { 'background-size': '100% 0%' },
          '100%': { 'background-size': '100% 100%' },
        },
        revealContent: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        unrollScroll: 'unrollScroll 2s ease forwards',
        revealContent: 'revealContent 2s ease-in forwards',
      },
    },
  },
  plugins: [],
};
export default config;
