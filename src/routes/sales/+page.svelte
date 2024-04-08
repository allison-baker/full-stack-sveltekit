<script lang="ts">
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';

	let allSalesData: any = [];
	$: uniqueStoreLocations = [...new Set(allSalesData.map((sale: any) => sale.storeLocation))];

	let salesStats = {
		totalItemsSold: 0,
		totalSales: 0,
		averageSales: 0
	};

	let singleLocation: string = '';

	Chart.defaults.backgroundColor = '#45484a';
	let canvasElement: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;

	onMount(() => (ctx = canvasElement.getContext('2d')));

	function graphSalesData() {
		if (ctx && allSalesData.length > 0) {
			new Chart(ctx, {
				type: 'bar',
				data: {
					labels: uniqueStoreLocations,
					datasets: [
						{
							label: '# of Sales',
							data: uniqueStoreLocations.map((location: any) => totalSalesByLocation(location)),
							borderWidth: 1,
							backgroundColor: 'rgba(38, 80, 59, 0.5)'
						}
					]
				},
				options: {
					scales: {
						y: { beginAtZero: true }
					}
				}
			});
		}
	}

	function totalSalesByLocation(location: string) {
		return allSalesData.filter((sale: any) => sale.storeLocation === location).length;
	}

	let itemName: string = '';
	let coupon: boolean = false;
	let age: number;

	async function getSalesData() {
		// Reset all data so screen appears in default state while loading new data
		allSalesData = [];
		salesStats = {
			totalItemsSold: 0,
			totalSales: 0,
			averageSales: 0
		};
		singleLocation = '';

		// Fetch new data from API
		const response = await fetch(`/api/sales/?itemName=${itemName}&coupon=${coupon}&age=${age}`);
		const data = await response.json();
		allSalesData = data;

		// Reset form fields
		itemName = '';
		coupon = false;
		age = NaN
	}

	let statsTitle = '[Please GET Sales Data]';
	$: {
		if (allSalesData.length === 0) statsTitle = '[Please GET Sales Data]';
		else if (singleLocation === '') statsTitle = '[Please Select a Location]';
		else statsTitle = `${singleLocation} Sales Stats`;
	}

	function handleLocationSelection(event: any) {
		singleLocation = event.target.value;
		const selectedLocationData = allSalesData.filter(
			(sale: any) => sale.storeLocation === singleLocation
		);
		salesStats.totalItemsSold = selectedLocationData.reduce(
			(acc: number, sale: any) => acc + sale.items.length,
			0
		);
		salesStats.totalSales = selectedLocationData.length;
		salesStats.averageSales = salesStats.totalItemsSold / salesStats.totalSales;
	}

	async function exportSalesData(event: any) {
		const response = await fetch('/api/sales', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			},
			body: JSON.stringify({
				storeLocation: singleLocation,
				totalItemsSold: salesStats.totalItemsSold,
				totalSales: salesStats.totalSales,
				averageSales: salesStats.averageSales
			})
		});
		const data = await response.json();
		console.log(data);
	}
</script>

<div class="max-w-[1200px] mx-auto">
	<h1 class="m-4 text-3xl uppercase pb-2 border-b-2 border-primary-600-300-token">Sales Data</h1>
	<form
		class="bg-surface-100-800-token rounded-md shadow-md p-4 m-4 w-1/2"
		on:submit|preventDefault={getSalesData}
	>
		<label for="itemName" class="font-bold text-sm block">
			Item Name:
			<input
				class="block font-normal input w-64 mt-2"
				name="itemName"
				type="text"
				bind:value={itemName}
				placeholder="Item Name"
			/>
		</label>
		<label for="coupon" class="font-bold text-sm block mt-4">
			<input
				class="checkbox mr-1"
				type="checkbox"
				name="coupon"
				bind:checked={coupon}
				placeholder="Coupon"
			/>
			Use Coupon?
		</label>
		<label for="age" class="block font-bold text-sm mt-4">
			Age: <span class="font-normal">{age}</span>
			<input class="mt-2" type="range" name="age" max="100" bind:value={age} />
		</label>
		<button class="btn variant-ghost-primary mt-4" type="submit">GET Filtered Sales Data</button>
	</form>
	<button class="m-4 btn variant-ghost-surface" on:click={getSalesData}>GET All Sales Data</button>
	<div class="m-4 flex gap-4">
		{#if allSalesData.length === 0}
			<div class="bg-surface-100-800-token p-4 rounded-md shadow-md">
				<h2 class="text-xl font-bold mb-2">No Sales Data</h2>
			</div>
		{:else}
			<ListBox class="w-48 bg-surface-100-800-token shadow-md">
				{#each uniqueStoreLocations as location}
					<ListBoxItem
						class="text-center"
						bind:group={singleLocation}
						name="medium"
						value={location}
						on:click={handleLocationSelection}>{location}</ListBoxItem
					>
				{/each}
			</ListBox>
		{/if}
		<div class="bg-surface-100-800-token p-4 rounded-md shadow-md flex flex-col justify-between">
			<section>
				<h2 class="text-xl font-bold mb-2">{statsTitle}</h2>
				<p class="text-sm mb-1">Total Items Sold: {salesStats.totalItemsSold}</p>
				<p class="text-sm mb-1">Total Sales: {salesStats.totalSales}</p>
				<p class="text-sm mb-4">Average Sales: {salesStats.averageSales}</p>
			</section>
			<button
				class="btn variant-ghost-primary"
				disabled={!singleLocation}
				on:click={exportSalesData}>Export Sales Data</button
			>
		</div>
	</div>

	<button
		class="m-4 btn variant-ghost-surface"
		on:click={graphSalesData}
		disabled={allSalesData.length === 0}>Graph All Sales Data</button
	>
	<div class="w-1/2 m-4">
		<canvas bind:this={canvasElement}></canvas>
	</div>
</div>
