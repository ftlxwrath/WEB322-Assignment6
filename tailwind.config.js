/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`./views/**/*.ejs`],
  daisyui: {
    themes: ['corporate'],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}

