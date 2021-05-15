<script>
    import Nested from './Nested.svelte.md';
    export let count = 21;
</script>

# This is an example of an mdsvex component.

You can `import` it as `$lib/Example.svelte.md`.
Just **delete** this file if you don't care.

_By the way, the count is {count}._

<Nested />
