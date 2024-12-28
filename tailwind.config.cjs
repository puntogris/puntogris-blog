const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      colors: {
        background: "#121212",
        content: "#21262D",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
