/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#0f1010",
        secondary: "#aaabab",
        tertiary: "#e66d2e",
        quaternary: "#8a1e00",
      },
    },
  },
  plugins: [],
}