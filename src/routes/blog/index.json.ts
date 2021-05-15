import posts from './posts/_posts';

export function get() {
	return {
		body: posts
	};
}
