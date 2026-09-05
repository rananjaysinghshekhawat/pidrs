/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Big Shoulders Display"', "sans-serif"],
        body: ['"IBM Plex Sans"', "sans-serif"],
      },
      colors: {
        asphalt: "#1C1F22",
        paper: "#ECEBE4",
        card: "#F6F5F0",
        amber: "#E19A34",
        signal: "#B8433B",
        civic: "#3C6E52",
        steel: "#3A5A78",
        ink: "#1C1F22",
      },
    },
  },
  plugins: [],
};
