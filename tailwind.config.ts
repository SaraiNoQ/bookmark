import type { Config } from "tailwindcss";

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        'neu-light': '20px 20px 60px #d1d1d1, -20px -20px 60px #ffffff',
        'neu-dark': '20px 20px 60px #1a1a1a, -20px -20px 60px #262626',
        'neu-light-hover': '10px 10px 30px #d1d1d1, -10px -10px 30px #ffffff',
        'neu-dark-hover': '10px 10px 30px #1a1a1a, -10px -10px 30px #262626',
      },
    },
  },
  plugins: [],
} satisfies Config;
