const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{html, js,ts,svelte}'],
	darkMode: 'class',
	theme: {
		extend: {
			// colors: {
			// 	primary: '#071627',
			// 	secondary: '#E4E5E7',
			// 	accent: '#548896',
			// 	background: '#CCCCCC',
			// 	textLight: '#FFFFFF',
			//  	textDark: '#071627',
			// }
			// colors: {
			// 	primary: '#488377',
			// 	secondary: '#DBCFAD',
			// 	accent: '#6D6670',
			// 	background: '#ECEBEA',
			// 	textLight: '#FFFFFF',
			// 	textDark: '#071627',
			// }

			colors: {
				text: 'var(--text-color)',
				background: 'var(--background-color)',
				primary: 'var(--primary-color)',
				secondary: 'var(--secondary-color)',
				accent: 'var(--accent-color)',

				text_dark: 'var(--text-color-dark)',
				background_dark: 'var(--background-color-dark)',
				primary_dark: 'var(--primary-color-dark)',
				secondary_dark: 'var(--secondary-color-dark)',
				accent_dark: 'var(--accent-color-dark)',
		},
	},
	},
	safelist: [
		{
			pattern:
				/(bg|text|border|fill|stroke)-(red|blue|green|yellow|purple|pink|orange|indigo)-(500|600|700)/
		},
		'primary',
		'secondary',
		'accent',
		'background',
		'dark',
		'light',
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
}
