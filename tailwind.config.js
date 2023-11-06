const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{html, js,ts,svelte}'],
	darkMode: 'class',
	theme: {
		extend: {
			backgroundImage: {
				'radial-gradient': 'radial-gradient(circle,  #6fb0aa, var(--accent-color))',
				'radial-gradient_dark': 'radial-gradient(circle, #09233b, #131126)',
			},
			colors: {
				text_primary: 'var(--text-primary-color)',
				text_secondary: 'var(--text-secondary-color)',
				background: 'var(--background-color)',
				primary: 'var(--primary-color)',
				secondary: 'var(--secondary-color)',
				accent: 'var(--accent-color)',

				text_primary_dark: 'var(--text-primary-color-dark)',
				text_secondary_dark: 'var(--text-secondary-color-dark)',
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
