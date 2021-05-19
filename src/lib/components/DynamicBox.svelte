<!-- Example dynamic component -->
<script lang="ts">
	import { onMount } from 'svelte';

	export let as = 'div';

	let container;
	let originalContainer;

	onMount(() => {
		originalContainer = container;

		return () => {
			container.parent.replaceChild(originalContainer, container);
		};
	});

	$: originalContainer && swap(as);

	function swap(as) {
		if (container.nodeName === as.toUpperCase()) return;

		const target = document.createElement(as);
		console.log(container.childNodes.length);
		while (container.childNodes.length) {
			target.appendChild(container.childNodes[0]);
		}
		container.parentNode.replaceChild(target, container);
		container = target;
	}

</script>

<div bind:this={container}><slot /></div>
