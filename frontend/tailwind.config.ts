import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-pink': '#FF1493', // The pink from your wireframe
        'dark-bg': '#0A0A0A',   // The dark background color
      },
    },
  },
  plugins: [],
};
export default config;