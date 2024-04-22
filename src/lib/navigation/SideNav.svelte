<script lang="ts">
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';

	const drawerStore = getDrawerStore();

	function drawerClose(): void {
		drawerStore.close();
	}
</script>

<nav class="list-nav p-4">
	{#if $page.data.session?.user}
		<ul>
			<li><a href="/" on:click={drawerClose}>Home</a></li>
			<hr />
			<li><a href="/tutorial" on:click={drawerClose}>Tutorial</a></li>
			<li><a href="/planets" on:click={drawerClose}>Planets</a></li>
			<li><a href="/todo" on:click={drawerClose}>Todo</a></li>
			<hr />
			<li><a href="/movies" on:click={drawerClose}>Movies</a></li>
			<li><a href="/airbnb" on:click={drawerClose}>Airbnb</a></li>
			<li><a href="/sales" on:click={drawerClose}>Sales</a></li>
			<hr />
			<li><a href="/user" on:click={drawerClose}>User</a></li>
		</ul>
	{:else}
		<ul>
			<li><a href="/" on:click={drawerClose}>Home</a></li>
			<hr />
			<li><a href="/tutorial" on:click={drawerClose}>Tutorial</a></li>
		</ul>
		<p class="mt-8">Please sign in to browse routes.</p>
	{/if}
</nav>
