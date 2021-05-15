<script>
	import { getContext } from 'svelte';

	export let title;

	const { set_title } = getContext('layout_context');

	$: set_title(title);
</script>

<div class="prose lg:prose-xl container mx-auto">
	<slot />
</div>
