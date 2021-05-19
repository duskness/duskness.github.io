import { mdsvex } from 'mdsvex';
import { mdsvexConfig } from './mdsvex.config.js';
import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import WindiCSS from 'vite-plugin-windicss'
// import pkg from './package.json'

console.log('import.meta.env :>> ', process.env);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],
	preprocess: [
		mdsvex(mdsvexConfig),
		preprocess()
	],
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		adapter: adapter(),
		target: '#svelte',
		appDir: 'public',
		vite: () =>({
			plugins: [
				WindiCSS.default(),
			  ],
			define: {
				__APP_VERSION__: JSON.stringify(process.env.npm_package_version),
				__BUILD_TIME__: Date.now()
			}
		})
	}
};

export default config;
