module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["autumn"],
  },
  plugins: [require("daisyui"),require('@tailwindcss/line-clamp'),],
}
