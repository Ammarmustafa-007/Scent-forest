module.exports = {
  theme: {
    extend: {
      keyframes: {
        spinIn: {
          "0%": { transform: "rotate(-360deg) scale(0)", opacity: "0" },
          "100%": { transform: "rotate(0) scale(1)", opacity: "1" },
        },
        fadeUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        spinIn: "spinIn 1s ease-out",
        fadeUp: "fadeUp 0.8s ease-out",
      },
    },
  },
  plugins: [],
};
