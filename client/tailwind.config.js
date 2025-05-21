// tailwind.config.js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,html}',
  ],
  theme: {
    darkMode: 'class',
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        aboreto: ['Aboreto', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
