module.exports = {
  purge: {
	enabled: false,
	content: [
		'./src/**/*.html',
		'./src/**/*.md',
		'./src/*.md',
		'./src/*.html',
	]
  },
  important: true,
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#333',
            a: {
              color: '#3182ce',
              '&:hover': {
                color: '#2c5282',
              },
            },
          },
        },
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
	require('@tailwindcss/forms'),
	require('@tailwindcss/typography'),
  ],
}
