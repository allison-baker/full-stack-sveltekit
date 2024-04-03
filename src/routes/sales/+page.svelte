<script lang="ts">
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';

	let allSalesData: any = [];
	$: uniqueStoreLocations = [...new Set(allSalesData.map((sale: any) => sale.storeLocation))];

	let salesStats = {
		totalItemsSold: 0,
		totalSales: 0,
		averageSales: 0
	};

	let singleLocation: string = '';

	async function getSalesData() {
		const response = await fetch('/api/sales');
		const data = await response.json();
		allSalesData = data;
	}

	async function postSalesData() {
		// post
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
	<button class="m-4 btn variant-ghost-surface" on:click={getSalesData}>GET Sales Data</button>
	<button class="m-4 btn variant-ghost-surface" on:click={postSalesData}>POST Sales Data</button>
	<div class="m-4 flex flex-wrap gap-4">
		<ListBox class="w-48">
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
		<div>
			<h2 class="text-2xl">Sales Stats for {singleLocation}</h2>
			<p>Total Items Sold: {salesStats.totalItemsSold}</p>
			<p>Total Sales: {salesStats.totalSales}</p>
			<p>Average Sales: {salesStats.averageSales}</p>
			<button
				class="btn btn-sm variant-filled-primary"
				disabled={!singleLocation}
				on:click={exportSalesData}>Export Sales Data</button
			>
		</div>
	</div>
</div>
