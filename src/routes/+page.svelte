<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';

	let loggedIn = $page.data.session?.user;
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h2 class="h2">Welcome to Skeleton.</h2>
		{#if loggedIn}
			<p>{$page.data.session?.user?.email}</p>
			<button class="btn variant-ghost-primary" on:click={() => signOut()}>Sign Out</button>
		{:else}
			<button class="btn variant-ghost-primary" on:click={() => signIn()}>Sign In</button>
		{/if}
	</div>
</div>
