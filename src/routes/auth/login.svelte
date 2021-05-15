<script context="module">
	import Auth, { load } from './_Auth.svelte';

	export { load };
</script>

<Auth {...$$restProps} />
