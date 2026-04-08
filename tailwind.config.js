/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-identity": "#0f1014",
        "brand-accent": "#d2ff5a",
        "brand-primary": "#6c63ff",
      },
    },
  },
  plugins: [],
};
