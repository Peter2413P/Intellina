module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#d41111",
        "background-dark": "#1a0b0b",
        "card-dark": "#2a1515",
      },
      boxShadow: {
        neon: "0 0 10px rgba(212,17,17,0.5), 0 0 20px rgba(212,17,17,0.3)",
      },
    },
  },
  plugins: [],
};
