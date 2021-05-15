<script>
	import { setContext } from 'svelte';
	import client from '$lib/shared/supabase';
	import { useAuth } from '$lib/client/auth';

	import '../app.postcss';


	const {user, signOut} = useAuth();

	let title_parts = {};

	function set_title_part(part, title) {
		title_parts[part] = title;
	}

	set_title_part('z', 'Duskness');

	setContext('layout_context', {
		set_title_part,
		set_title: (title) => set_title_part('main', title)
	});
	$: title = Object.keys(title_parts)
		.sort()
		.map((part) => title_parts[part])
		.join(' - ');
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>
{JSON.stringify($user)}
<header class="flex items-stretch relative">
	<div class="container mx-auto px-4 py-3">
		<div class="flex">
			<nav class="flex space-x-2">
				<a href="/">Trang chủ</a>
				<a href="/blog">Blog</a>
			</nav>
			<ul class="flex ml-auto space-x-2">
				{#if $user}
					<li>
						<a href="/auth/logout" on:click|preventDefault={signOut}>Logout</a>
					</li>	
					
				{:else}
					<li><a href="/auth/login">Login</a></li>
				{/if}
				<li><a href="https://github.com/duskness">Github</a></li>
			</ul>
		</div>
	</div>
</header>
<slot />
