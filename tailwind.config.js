/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        2: "repeat(auto-fit, minmax(320px, 1fr))",
      },
    },
  },
  plugins: [],
};
