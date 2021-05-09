
const path = require("path")
const toml = require("@iarna/toml")
const markdown_layout = path.join(__dirname, "./src/lib/MarkdownLayout.svelte");

module.exports = {
	extensions: [".svelte.md", ".md", ".svx"],
	layout: markdown_layout,
	frontmatter: {
		marker: "+",
		parse: (frontmatter, messages) => {
			try {
				return toml.parse(frontmatter);
			} catch (err) {
				messages.push(err.message)
			}
		},
		type: "toml"
	},
	smartypants: {
		dashes: "oldschool",
	},
	remarkPlugins: [
		[require("remark-github"), {
			repository: "https://github.com/duskness/duskness.github.io.git",
		}],
		require("remark-abbr"),
	],
	rehypePlugins: [
		require("rehype-slug"),
		[require("rehype-autolink-headings"), {
			behavior: "wrap",
		}],
	],
};
