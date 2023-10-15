/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      NotoSansSC: ["Noto Sans SC", "sans-serif"],
    },
    extend: {
      screens: {
        "1200px": "1200px",
        "1100px": "1100px",
        "1000px": "1000px",
        "900px": "900px",
        "800px": "800px",
        "700px": "700px",
        "600px": "600px",
        "500px":"500px",
        "400px":"400px",
      },
      gridTemplateColumns: {
        'fluid': 'repeat(auto-fill, minmax(126px, 1fr))',
        'auto-fill-280': 'repeat(auto-fill, minmax(280px, 1fr))',
        'auto-fill-260': 'repeat(auto-fill, minmax(260px, 1fr))',
        'auto-fill-245': 'repeat(auto-fill, minmax(245px, 1fr))',
        'auto-fill-210': 'repeat(auto-fill, minmax(210px, 1fr))',
        'auto-fill-170': 'repeat(auto-fill, minmax(170px, 1fr))',
        'auto-fill-150': 'repeat(auto-fill, minmax(150px, 1fr))',
        'auto-fill-145': 'repeat(auto-fill, minmax(145px, 1fr))',
        'auto-fill-120': 'repeat(auto-fill, minmax(120px, 1fr))',
      }
    },
  },
  plugins: [],
}

