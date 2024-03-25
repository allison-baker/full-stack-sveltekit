<script lang="ts">
	export let data: any;
</script>

<div>
	<h1 class="m-4 text-3xl uppercase pb-2 border-b-2 border-primary-600-300-token">Movies</h1>
	<h2 class="text-lg m-4 text-secondary-700-200-token">{data.body.length} Movies rated PG, PG-13, or R from the year 1985.</h2>
	<div class="m-4 flex flex-wrap gap-4">
		{#each data.body as movie}
			<a href={`/movies/${movie._id}`} class="btn variant-ghost-surface">{movie.title}</a>
		{/each}
	</div>
</div>
