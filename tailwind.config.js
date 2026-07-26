/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./assets/js/**/*.js"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: "#050816",
        surface: "#101726",
        gold: "#D4AF37",
        electric: "#4F9CF9",
        violet: "#8B5CF6",
        muted: "#94A3B8"
      },
      fontFamily: {
        display: ["Space Grotesk", "Inter", "sans-serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      boxShadow: {
        glow: "0 22px 80px rgba(79,156,249,.16)"
      }
    }
  },
  plugins: []
};
