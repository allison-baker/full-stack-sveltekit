<script lang="ts">
	export let data: any;

	async function fetchMovie(id: string) {
		const res = await fetch('../api/movie');
		const movie = await res.json();
		console.log(movie);
	}
</script>

<div>
	<h1 class="m-4 text-2xl">Movies</h1>
	<h2 class="text-lg m-4">{data.body.length} Movies rated PG, PG-13, or R from the year 1985.</h2>
	<div class="m-4 flex flex-wrap gap-4">
		{#each data.body as movie}
			<div
				class="flex flex-col items-center p-4 bg-surface-300 hover:bg-surface-500 rounded-md shadow-md"
			>
				<a href={`/movies/${movie._id}`}><h2 class="">{movie.title}</h2></a>
				<!-- <button class="btn variant-ghost-primary" on:click={() => fetchMovie(movie._id)}
					>Details</button
				> -->
			</div>
		{/each}
	</div>
</div>
