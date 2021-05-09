import { mdsvex } from "mdsvex";
import { mdsvexConfig } from "./mdsvex.config.js";
import preprocess from "svelte-preprocess";
import adapter from '@sveltejs/adapter-static'


/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: [".svelte", ...mdsvexConfig.extensions],
	preprocess: [
		mdsvex(mdsvexConfig),
		preprocess({
			postcss: true
		}),
	],
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		adapter: adapter(),
		target: '#svelte',
		appDir: 'public',
	}
};

export default config;
