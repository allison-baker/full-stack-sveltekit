<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let loggedIn = $page.data.session?.user;
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h2 class="h2">Welcome to Skeleton.</h2>
		{#if loggedIn}
			<p>Welcome, <span class="font-bold">{$page.data.session?.user?.name}</span>!</p>
			<button class="btn variant-ghost-primary" on:click={() => signOut()}>Sign Out</button>
			<button class="btn variant-ghost-secondary" on:click={() => goto('/movies')}>Movies</button>
			<button class="btn variant-ghost-secondary" on:click={() => goto('/airbnb')}>Airbnb</button>
		{:else}
			<p>Sign in to view more!</p>
			<button class="btn variant-ghost-primary" on:click={() => signIn('github')}>Sign In</button>
		{/if}
	</div>
</div>
