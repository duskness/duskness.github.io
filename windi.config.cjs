const colors = require('windicss/colors');
const typography = require('windicss/plugin/typography');
const createPlugin = require('windicss/plugin');
const { defineConfig } = require('windicss/helpers');

const questionMark = createPlugin(({ addDynamic, addUtilities }) => {
	addDynamic('wtf', ({ Utility, Style, Keyframes }) => {
		if (Utility.raw === 'wtf') {
			return Style.generate(Utility.class, {
				'-webkit-animation': `question 0.5s ease-in-out alternate infinite`,
				animation: `question 0.5s ease-in-out alternate infinite`
			}).concat(
				Keyframes.generate('question', {
					'0%': {
						'box-shadow': 'inset 4px 4px rgb(236, 15, 170), inset -4px -4px rgb(236, 15, 170)'
					},
					'100%': {
						'box-shadow': 'inset 8px 8px rgb(236, 15, 170), inset -8px -8px rgb(236, 15, 170)'
					}
				})
			);
		}
	});
});

module.exports = defineConfig({
	darkMode: 'class',
	extract: {
		include: ['./src/**/*.{html,svelte}']
	},
	safelist: ['prose', 'prose-sm'],
	theme: {
		// colors: {
		// 	"dark-blue": "#413C69",
		// 	"light-blue": "#4a47a3",
		// 	"blue":"#709fb0",
		// 	"cold-blue": "#a7c5eb",

		// },
		extend: {}
	},
	shortcuts: {
		// 'form-input': ''
	},
	// preflight: {
	// 	includeAll: true
	// },
	plugins: [typography, questionMark]
});



