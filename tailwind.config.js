module.exports = {
  mode: 'jit',
  purge: {
    enabled: true,
    content: ['./src/**/*.{html,ts}']
  },
  theme: {
    colors: {
      ascendere: {
        blueLighter: '#00A6BD',
        blue: '#00ACC1',
        blueDarker: '#015981',
        yellow: '#FFAB02',
        yellowDarker: '#FFBC13',
      },
      white: '#fff',
      whiteDarker: '#efefef',
      black: '#000',
      gray: '#505050',
      transparent: '#00000000'
    },
    extend: {
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(300px, 1fr))',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
