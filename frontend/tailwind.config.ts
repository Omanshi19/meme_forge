import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sun:   "#FFB800",
        coral: "#FF6B4A",
        sky:   "#4AB8FF",
        sand: {
          DEFAULT: "#FFFBF0",
          mid:     "#FFF3C4",
          deep:    "#F0D9A0",
        },
        bark:  "#8B5E3C",
      },
    },
  },
  plugins: [],
};
export default config;