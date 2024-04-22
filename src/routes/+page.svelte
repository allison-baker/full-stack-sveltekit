<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let loggedIn = $page.data.session?.user;
</script>

<div class="max-w-[1200px] h-full mx-auto flex flex-col justify-evenly items-center">
	<div class="flex flex-row gap-6 items-center max-w-[800px]">
		<img src="/profile_circle.png" alt="headshot" width="200" height="200" />
		<section>
			<h2 class="h2 mb-6 text-secondary-700-200-token">Welcome to my Svelte Portfolio.</h2>
			<p>
				Hello! My name is Al Baker, and I am a Web & App Development student at Utah Valley
				University. Over the course of two semesters, we learned how to utilize Svelte to build web
				applications. This is the result of that work. Enjoy!
			</p>
		</section>
	</div>
	<hr class="w-full" />
	{#if loggedIn}
		<p class="text-center">
			Welcome, <span class="font-bold">{$page.data.session?.user?.name}</span>!
		</p>
		<div class="flex flex-col gap-4">
			<p class="text-center">First Semester:</p>
			<section class="flex flex-row gap-4">
				<button class="btn variant-ghost-secondary" on:click={() => goto('/tutorial')}
					>Tutorial</button
				>
				<button class="btn variant-ghost-secondary" on:click={() => goto('/planets')}
					>Planets</button
				>
				<button class="btn variant-ghost-secondary" on:click={() => goto('/todo')}>Todo</button>
			</section>
		</div>
		<div class="flex flex-col gap-4">
			<p class="text-center">Second Semester:</p>
			<section class="flex flex-row gap-4">
				<button class="btn variant-ghost-secondary" on:click={() => goto('/movies')}>Movies</button>
				<button class="btn variant-ghost-secondary" on:click={() => goto('/airbnb')}>Airbnb</button>
				<button class="btn variant-ghost-secondary" on:click={() => goto('/sales')}>Sales</button>
			</section>
		</div>
	{:else}
		<section class="flex flex-col gap-4">
			<button class="btn variant-ghost-secondary" on:click={() => goto('/tutorial')}
				>Tutorial</button
			>
			<p>Sign in to view more!</p>
			<button class="btn variant-ghost-primary" on:click={() => signIn('github')}>Sign In</button>
		</section>
	{/if}
</div>
