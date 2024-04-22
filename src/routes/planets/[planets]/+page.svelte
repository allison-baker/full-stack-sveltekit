<script lang="ts">
	import { goto } from '$app/navigation';
	export let data;

	let hidden = 'hidden';
	if (data.planet.image === '/no_results.webp') {
		hidden = '';
	}
</script>

<div
	class="max-w-[1200px] mx-auto h-full justify-center items-center flex flex-col"
>
	<article class="w-[500px]">
		<section
			class="relative text-center text-white w-full h-36 rounded-t-lg bg-cover bg-center bg-no-repeat"
			style="background-image: url({data.planet.image});"
		>
			<p
				id="noTag"
				class="{hidden} absolute top-[50%] bottom-[50%] w-full h-full font-bold text-lg"
			>
				No Image Found
			</p>
		</section>
		<section
			class="flex flex-col justify-center items-center bg-surface-100-800-token rounded-b-lg pb-8 py-6"
		>
			<h2 class="m-4 text-3xl font-bold text-secondary-700-200-token">{data.planet.name}</h2>
			<p class="text-lg mb-2">Mass (in Jupiters): {data.planet.mass}</p>
			<p class="text-lg mb-2">Radius (in Jupiters): {data.planet.radius}</p>
			<p class="text-lg mb-2">Temperature (in Kelvin): {data.planet.temperature}</p>
			<p class="text-lg mb-2">Distance from Earth (in light years): {data.planet.distance}</p>
			<p class="text-lg mb-2">Orbital Period around Earth (in days): {data.planet.period}</p>
			<button class="btn variant-ghost-tertiary m-4" on:click={() => goto('/planets')}
				>Back to View All</button
			>
		</section>
	</article>
</div>
