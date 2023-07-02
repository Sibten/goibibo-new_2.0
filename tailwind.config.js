/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        qs: "Quicksand",
        nt: "Nunito",
        vr: "Varela Round",
        arial: "Arial",
      },
    },
  },
  plugins: [],
});
