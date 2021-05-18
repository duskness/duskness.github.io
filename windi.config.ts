import colors from 'windicss/colors';
import typography from 'windicss/plugin/typography';
import forms from 'windicss/plugin/forms';
import createPlugin from 'windicss/plugin';
import { defineConfig } from 'windicss/helpers';

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

export default defineConfig({
	darkMode: 'class',
	extract: {
		include: ['./src/**/*.{html,svelte}']
	},
	safelist: ['prose', 'prose-sm'],
	theme: {
		colors: {
			primary: "#b027b0",
			secondary: "#009688",
			error: "#f44336",
			success: "#4caf50",
			alert: "#ff9800",
			blue: "#2196f3",
			dark: "#212121"
		},
		extend: {}
	},
	shortcuts: {
		'form-input': ''
	},
	plugins: [typography, questionMark]
});



