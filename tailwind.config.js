/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Azul mariano: el mismo del sistema de gestión, para que la identidad
        // visual de la catequesis sea una sola en la web y en la aplicación.
        navy: {
          DEFAULT: "#1e3a8a",
          dark: "#152a63",
          deep: "#0e1c44",
          light: "#2f4fb0",
          soft: "#eaf0f7",
        },
        // Dorado suave, solo como acento (filetes, cifras, detalles).
        gold: {
          DEFAULT: "#c8a04a",
          light: "#e2c68a",
          soft: "#f7f0de",
        },
        // Verde muy sutil, reservado para estados positivos.
        sage: {
          DEFAULT: "#4f7d63",
          soft: "#eaf2ed",
        },
        // Marfil / blanco cálido de fondo.
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
        // Para las capas que se abren encima (visor, ficha del catequista): solo
        // opacidad. `reveal` lleva un translateY y un `transform` sobre un elemento
        // `position: fixed` lo desplaza y, mientras dura, pasa a ser el marco de
        // referencia de lo que lleve dentro.
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
