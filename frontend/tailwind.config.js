/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#327521",
        secondary: "#285e1a",
      },
    },
  },
  plugins: [],
};
