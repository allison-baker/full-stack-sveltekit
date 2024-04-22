<script lang="ts">
	import { page } from '$app/stores';
	import { signIn, signOut } from '@auth/sveltekit/client';

	let loggedIn = $page.data.session?.user;
</script>

<div class="max-w-[1200px] mx-auto h-full justify-center items-center flex flex-col">
	{#if !loggedIn}
		<p class="m-4">Please log in to continue:</p>
		<button class="btn variant-ghost-surface" on:click={() => signIn('github')}
			><span class="mr-2"><i class="fa fa-github" /></span>Log In with GitHub</button
		>
	{/if}
	{#if loggedIn}
		<section
			class="flex flex-col justify-center items-center bg-surface-100-800-token rounded-lg p-8"
		>
			<img
				src={$page.data.session?.user?.image}
				alt="profile"
				class="h-48 w-48 rounded-full m-4 border-4 border-tertiary-500-400-token"
			/>
			<h2 class="mt-4 mx-4 text-3xl font-bold text-secondary-700-200-token">
				Welcome, {$page.data.session?.user?.name}!
			</h2>
			<p class="mx-4 text-lg my-2">{$page.data.session?.user?.email}</p>
			<button class="btn variant-ghost-tertiary m-4" on:click={() => signOut()}>Sign Out</button>
		</section>
	{/if}
</div>
