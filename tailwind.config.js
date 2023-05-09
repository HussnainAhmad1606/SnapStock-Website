/** @type {import('tailwindcss').Config} */
module.exports = {

  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}"
],
  theme: {
    extend: {},
  },

  daisyui: {
    themes: ["cupcake", "synthwave", "night"],
  },
  
  plugins: [require("daisyui")]
}

