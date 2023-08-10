const plugin = require('tailwindcss/plugin')


/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{html, js,ts,svelte}",
    ],
    theme: {
        extend: {
            colors: {
                'accent': '#071525',
                'background': '#D9D9D9',
                'formBackground': '#d2d6d9',
                'formBackgroundFocused': '#BAC1C6'
            }
        },
    },
    safelist: [
        {
            pattern: /(bg|text|border|fill|stroke)-(red|blue|green|yellow|purple|pink|orange|indigo)-(500|600|700)/,
        },
        'accent',
        'background',
        'formBackground',
        'formBackgroundFocused'
    ],
    plugins: [
        plugin(function ({ addVariant, e }) {
            addVariant('not-last', ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => {
                    return `.${e(`not-last${separator}${className}`)}:not(:last-child)`
                })
            })
        })
    ]
}

