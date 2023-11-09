/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        backgroundDark: "var(--backgroundDark)",
        backgroundLight: "var(--backgroundLight)",
        backgroundHoverDark: "var(--backgroundHoverDark)",
        backgroundHoverLight: "var(--backgroundHoverLight)",
        backgroundSecondDark: "var(--backgroundSecondDark)",
        backgroundSecondLight: "var(--backgroundSecondLight)",
        backgroundThirdDark: "var(--backgroundThirdDark)",
        backgroundThirdLight: "var(--backgroundThirdLight)",
        backgroundAccentDark: "var(--backgroundAccentDark)",
        backgroundAccentLight: "var(--backgroundAccentLight)",
        borderDark: "var(--borderDark)",
        borderLight: "var(--borderLight)",
        textDark: "var(--textDark)",
        textLight: "var(--textLight)",
        buttonDark: "var(--buttonDark)",
        buttonLight: "var(--buttonLight)",
        buttonHoverDark: "var(--buttonHoverDark)",
        buttonHoverLight: "var(--buttonHoverLight)",
        iconDark: "var(--iconDark)",
        iconLight: "var(--iconLight)",
        shadowDark: "var(--shadowDark)",
        shadowLight: "var(--shadowLight)",
        success: "var(--success)",
        warning: "var(--warning)",
        error: "var(--error)",
      },
    },
  },
  plugins: [
    function ({addVariant}) {
      addVariant('child', '&>*');
      addVariant('child-hover', '&>*:hover');
    }
  ],
}