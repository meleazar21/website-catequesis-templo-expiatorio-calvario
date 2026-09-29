/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Marian blue: the same as the management system, so the catechesis has a
        // single visual identity across the website and the app.
        navy: {
          DEFAULT: "#1e3a8a",
          dark: "#152a63",
          deep: "#0e1c44",
          light: "#2f4fb0",
          soft: "#eaf0f7",
        },
        // Soft gold, only as an accent (rules, numbers, details).
        gold: {
          DEFAULT: "#c8a04a",
          light: "#e2c68a",
          soft: "#f7f0de",
        },
        // Very subtle green, reserved for positive states.
        sage: {
          DEFAULT: "#4f7d63",
          soft: "#eaf2ed",
        },
        // Ivory / warm white background.
        ivory: {
          DEFAULT: "#faf8f3",
          deep: "#f3efe6",
        },
        ink: {
          DEFAULT: "#1d2433",
          soft: "#5b6475",
          faint: "#8a93a3",
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ["Manrope", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      maxWidth: { content: "1180px" },
      boxShadow: {
        card: "0 1px 2px rgba(30,58,138,0.04), 0 8px 24px rgba(30,58,138,0.06)",
        lift: "0 10px 34px rgba(30,58,138,0.12)",
      },
      keyframes: {
        reveal: {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "none" },
        },
        // For layers that open on top (viewer, catechist profile): opacity only.
        // `reveal` has a translateY, and a `transform` on a `position: fixed` element
        // shifts it and, while it lasts, becomes the containing block for whatever
        // is inside it.
        fade: { from: { opacity: "0" }, to: { opacity: "1" } },
      },
      animation: {
        reveal: "reveal 0.6s cubic-bezier(0.22,1,0.36,1) both",
        fade: "fade 0.25s ease-out both",
      },
    },
  },
  plugins: [],
};
