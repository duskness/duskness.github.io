<script context="module">
	export async function load({ fetch }) {
		const res = await fetch('/blog.json');
		const posts = await res.json();
		return {
			props: { posts }
		};
	}
</script>

<script>
	export let posts;
</script>

<div class="container mx-auto">
	<ul>
		{#each posts as post, _ (post.slug)}
			<li><a href="/blog/posts/{post.metadata.slug}">{post.metadata.title}</a></li>
		{/each}
	</ul>
</div>
