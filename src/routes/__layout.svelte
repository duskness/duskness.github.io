<script>
	import { setContext } from "svelte";

	import "../app.postcss";

	let title_parts = {};

	function set_title_part(part, title) {
		title_parts[part] = title;
	}

	set_title_part("z", "Duskness");

	setContext("layout_context", {
		set_title_part,
		set_title: title => set_title_part("main", title)
	});
	$: title = Object.keys(title_parts).sort().map(part => title_parts[part]).join(" - ");
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<header class="flex items-stretch relative">
	<div class="container mx-auto px-4 py-3">
		<div class="flex">
			<nav class="flex space-x-2">
				<a href="/">Trang chủ</a>
				<a href="/blog">Blog</a>
			</nav>
			<ul class="flex ml-auto">
				<li><a  href="https://github.com/duskness">Github</a></li>
			</ul>
		</div>
	</div>
</header>
<slot />

