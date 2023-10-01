const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{html, js,ts,svelte}'],
	theme: {
		extend: {
			colors: {
				primary: '#071627',
				secondary: '#E4E5E7',
				accent: '#9C5454',
				background: '#CCCCCC'
				// 'secondary': '#d2d6d9',
				// 'secondaryFocused': '#BAC1C6'
			}
		}
	},
	safelist: [
		{
			pattern:
				/(bg|text|border|fill|stroke)-(red|blue|green|yellow|purple|pink|orange|indigo)-(500|600|700)/
		},
		'primary',
		'secondary',
		'accent',
		'background'
	],
	plugins: [
		plugin(function ({ addVariant, e }) {
			addVariant('not-last', ({ modifySelectors, separator }) => {
				modifySelectors(({ className }) => {
					return `.${e(`not-last${separator}${className}`)}:not(:last-child)`;
				});
			});
		})
	]
};
