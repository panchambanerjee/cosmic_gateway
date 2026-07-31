/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        void: {
          950: "#07090f",
          900: "#0c1220",
          800: "#141c2e",
          700: "#1e2a42",
        },
        star: {
          50: "#f7f4ec",
          100: "#efe8d6",
          200: "#ddd0aa",
          300: "#c9b57a",
          400: "#b89a4f",
        },
        nebula: {
          400: "#6ec6c0",
          500: "#3aa8a1",
          600: "#2a8480",
        },
        signal: {
          400: "#f0a35a",
          500: "#e8883a",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "cosmos-radial":
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(58,168,161,0.22), transparent 55%), radial-gradient(ellipse 50% 40% at 90% 20%, rgba(240,163,90,0.12), transparent 45%), linear-gradient(180deg, #07090f 0%, #0c1220 45%, #141c2e 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
