import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import toml from '@iarna/toml';

const CONTENT_DIR = './src/routes/blog/posts';
const extensions = ['.svelte.md', '.md', '.svx'];

export interface Post {
	metadata: {
		title: string;
		description: string;
		slug: string;
		date?: Date;
		draft?: boolean;
	};
}

function get_all_posts(): Post[] {
	try {
		return fs
			.readdirSync(CONTENT_DIR)
			.filter((filename) => extensions.some((ext) => filename.endsWith(ext)))
			.map((filename) => {
				const content = fs.readFileSync(path.resolve(CONTENT_DIR, filename), { encoding: 'utf8' });
				let slug: string;
				for (const ext of extensions) {
					if (filename.endsWith(ext)) {
						slug = filename.slice(0, -ext.length);
						break;
					}
				}
				const parsed = matter(content, {
					engines: {
						toml: toml.parse.bind(toml)
					},
					language: 'toml',
					delimiters: '+++'
				});
				return ({
					// content: parsed.content,
					metadata: { ...parsed.data, slug }
				} as unknown) as Post;
			});
	} catch (error) {
		// Empty folder
		if (error.code === 'ENOENT') {
			return [];
		}
		throw error;
	}
}

const posts = get_all_posts().filter((post) => !post.metadata.draft);

export default posts;
