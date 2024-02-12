<script lang="ts">
	import { goto } from '$app/navigation';
	export let data: any;
</script>

<div>
	<div class="max-w-5xl mx-auto my-4 bg-white rounded-md shadow-md flex flex-row">
		<img src={data.body.poster} alt="movie poster" class="max-w-64 rounded-tl-md rounded-bl-md" />
		<section class="relative p-4">
			<h3 class="text-primary-500">{data.body.year}</h3>
			<h1 class="my-4 text-2xl">{data.body.title}</h1>
			<p>{data.body.fullplot}</p>
			<h3 class="my-4 text-secondary-500">Rated {data.body.imdb.rating} on IMDB</h3>
			<button class="btn variant-ghost-surface absolute bottom-4" on:click={() => goto('/movies')}
				>Return to Movie List</button
			>
		</section>
	</div>
</div>
