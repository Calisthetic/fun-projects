module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {}
  }
}
// module.exports = {
//   plugins: [
//     require('postcss-import'),
//     require('tailwindcss/nesting')(require('postcss-nesting')),
//     require('autoprefixer'),
//     require('tailwindcss'),
//     //...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
//   ]
// }