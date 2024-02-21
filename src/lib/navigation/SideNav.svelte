<script lang="ts">
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();

	function drawerClose(): void {
		drawerStore.close();
	}
</script>

<nav class="list-nav p-4" style="view-transition-name: navigation">
	<ul>
		<li><a href="/" on:click={drawerClose}>Home</a></li>
		<li><a href="/movies" on:click={drawerClose}>Movies</a></li>
		<li><a href="/airbnb" on:click={drawerClose}>Airbnb</a></li>
		<!-- <li><a href="/user" on:click={drawerClose}>Account</a></li> -->
	</ul>
</nav>
