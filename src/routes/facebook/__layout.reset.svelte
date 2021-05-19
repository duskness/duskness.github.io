<script lang="ts">
import { onMount } from 'svelte';
    import Header from './_Header.svelte';

    import 'virtual:windi-base.css';
	import 'virtual:windi-components.css';
	import 'virtual:windi-utilities.css';

    	onMount(() => {
		(document.querySelector('#svelte') as any).style.cssText = '';
	});

</script>
<!-- svelte-ignore missing-declaration -->
<div>
    <Header />
	{__APP_VERSION__}
    <slot></slot>
</div>