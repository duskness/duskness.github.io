import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import toml from '@iarna/toml'


const CONTENT_DIR = './src/routes/blog/posts';
const extensions = [".svelte.md", ".md", ".svx"];

function get_all_posts() {
	try {
		return fs
			.readdirSync(CONTENT_DIR)
			.filter((filename) => extensions.some((ext) => filename.endsWith(ext)))
			.map((filename) => {
				const content = fs.readFileSync(path.resolve(CONTENT_DIR, filename), { encoding: 'utf8' });
                let slug;
                for(let ext of extensions) {
                    if (filename.endsWith(ext)) {
                        slug = filename.slice(0, - ext.length);
                    }
                }
				const parsed = matter(content, {
                    engines: {
                        toml: toml.parse.bind(toml)
                    },
                    language: 'toml',
                    delimiters: '+++'
                });
				return {
					content: parsed.content,
					metadata: {...parsed.data, slug}
				};
			});
	} catch (error) {
		// Empty folder
		if (error.code === 'ENOENT') {
			return [];
		}
		throw error;
	}
}

const posts = get_all_posts();

export default posts;
