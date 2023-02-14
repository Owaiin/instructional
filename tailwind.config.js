/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "dm-display": "DM Serif Display",
      },
      height: {
        "70vh": "70vh",
        "80vh": "80vh",
        "90vh": "90vh",
      },
    },
  },
  plugins: [],
};
