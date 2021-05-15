<script context="module">

    export const router = false;

</script>

<script>
    import { updateSession } from '$lib/client/auth';
import { tick } from 'svelte';
//     import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    // debugger;
    onMount(async()=> {
        window.onhashchange = (ev) => {
            debugger;
        }
        await updateSession();
        await tick();
        location.href="/";
    //     await goto("/")
    })
</script>
