<script lang="ts">
	import { onMount } from 'svelte';
	import { planetsStore } from '$lib/stores/planetsStore.ts';

	interface Planets {
		name: string;
		mass: string;
		radius: string;
		temperature: string;
		distance: string;
		period: string;
		image: string;
	}

	const api_key = '1JMQnEy0RPLJV4tBNDZCow==0istE6CwLcnJjg1s';

	onMount(async () => {
		const res = await fetch('https://api.api-ninjas.com/v1/planets?max_distance_light_year=11.98', {
			method: 'GET',
			headers: {
				'X-API-Key': api_key,
				'Content-Type': 'application/json;charset=utf-8'
			}
		});
		const data = await res.json();

		planetsStore.set(data as Planets[]);
	});
</script>

<div class="max-w-[1200px] mx-auto">
	<h1 class="m-4 text-3xl uppercase pb-2 border-b-2 border-primary-600-300-token">View Planets Information</h1>
	{#if $planetsStore.length === 0}
		<h2 class="text-lg m-4 text-secondary-700-200-token">Loading Planet Data...</h2>
	{:else}
		<section class="grid grid-cols-5 gap-4 mx-4">
			{#each $planetsStore as { name }}
				<a
					href={`/planets/${name}`}
					class=" btn variant-ghost-surface">{name}</a
				>
			{/each}
		</section>
	{/if}
</div>
