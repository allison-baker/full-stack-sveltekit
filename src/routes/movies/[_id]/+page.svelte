<script lang="ts">
	import { goto } from '$app/navigation';
	export let data: any;

	function toggleDropdown() {
		let dropdown = document.querySelector('#moreFacts');
		let plus = document.querySelector('#plusIcon');
		let down = document.querySelector('#downIcon');
		dropdown?.classList.toggle('hidden');
		plus?.classList.toggle('hidden');
		down?.classList.toggle('hidden');
	}
</script>

<div>
	<div class="max-w-5xl mx-auto my-4 bg-surface-100-800-token rounded-md shadow-md grid grid-cols-[256px_1fr]">
		<img src={data.body.poster} alt="movie poster" class="object-cover w-full h-full rounded-tl-md rounded-bl-md" />
		<section class="relative p-4">
			<h3 class="text-primary-700-200-token">{data.body.year}</h3>
			<h1 class="my-4 text-2xl">{data.body.title}</h1>
			<p>{data.body.fullplot}</p>
			<h3 class="my-4 text-secondary-700-200-token mb-16">Rated {data.body.rated}</h3>
			<button class="btn variant-ghost-surface absolute bottom-4" on:click={() => goto('/movies')}
				>Return to Movie List</button
			>
		</section>
	</div>
	<button
		class="max-w-5xl mx-auto my-4 bg-surface-100-800-token rounded-md shadow-md flex flex-row justify-between items-center p-4 w-full"
		on:click={() => toggleDropdown()}
	>
		<h3>Learn More</h3>
		<i id="plusIcon" class="fa-solid fa-plus"></i>
		<i id="downIcon" class="fa-solid fa-caret-down hidden"></i>
	</button>
	<div id="moreFacts" class="max-w-5xl mx-auto my-4 bg-surface-100-800-token rounded-md shadow-md p-4 hidden">
		<h2 class="text-xl mb-4 text-secondary-700-200-token">More About {data.body.title}</h2>
		<div class="flex flex-wrap justify-evenly gap-4">
			{#if data.body.genres}
				<div class="bg-tertiary-50-900-token rounded-md p-4">
					<h3 class="mb-2">Genre(s):</h3>
					<ul class="pl-6">
						{#each data.body.genres as genre}
							<li class="list-disc">{genre}</li>
						{/each}
					</ul>
				</div>
			{/if}
			{#if data.body.cast}
				<div class="bg-tertiary-50-900-token rounded-md p-4">
					<h3 class="mb-2">Cast:</h3>
					<ul class="pl-6">
						{#each data.body.cast as person}
							<li class="list-disc">{person}</li>
						{/each}
					</ul>
				</div>
			{/if}
			{#if data.body.languages}
				<div class="bg-tertiary-50-900-token rounded-md p-4">
					<h3 class="mb-2">Language(s):</h3>
					<ul class="pl-6">
						{#each data.body.languages as lang}
							<li class="list-disc">{lang}</li>
						{/each}
					</ul>
				</div>
			{/if}
			{#if data.body.directors}
				<div class="bg-tertiary-50-900-token rounded-md p-4">
					<h3 class="mb-2">Director(s):</h3>
					<ul class="pl-6">
						{#each data.body.directors as director}
							<li class="list-disc">{director}</li>
						{/each}
					</ul>
				</div>
			{/if}
			{#if data.body.imdb}
				<div class="bg-tertiary-50-900-token rounded-md p-4">
					<h3 class="mb-2">IMDB:</h3>
					<ul class="pl-6">
						<li class="list-disc">Rating: {data.body.imdb.rating}</li>
						<li class="list-disc">Votes: {data.body.imdb.votes}</li>
					</ul>
				</div>
			{/if}
			{#if data.body.awards}
				<div class="bg-tertiary-50-900-token rounded-md p-4">
					<h3 class="mb-2">Awards:</h3>
					<ul class="pl-6">
						<li class="list-disc">Wins: {data.body.awards.wins}</li>
						<li class="list-disc">Nominations: {data.body.awards.nominations}</li>
					</ul>
				</div>
			{/if}
		</div>
	</div>
</div>
