<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';

	let loggedIn: boolean;

	function handleClick() {
		if ($page.data.session?.user) {
			signOut;
			loggedIn = false;
		} else {
			signIn('github');
			loggedIn = true;
		}
		console.log($page.data.session?.user);
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h2 class="h2">Welcome to Skeleton.</h2>
		<p>{$page.data.session?.user?.email}</p>
		<button class="btn variant-ghost-primary" on:click={handleClick}
			>{loggedIn ? 'Sign Out' : 'Sign In'}</button
		>
	</div>
</div>
