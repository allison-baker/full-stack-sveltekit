<script lang="ts">
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';

    let allSalesData: any = [];
    $: uniqueStoreLocations = [...new Set(allSalesData.map((sale: any) => sale.storeLocation))];

    $: locationsWithItems = allSalesData.map((sale: any) => {
        
    });

    let valueSingle: string = 'books';

	async function getSalesData() {
		const response = await fetch('/api/sales');
		const data = await response.json();
		console.log(data);
	}

	async function postSalesData() {
		const response = await fetch('/api/sales', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			},
			body: JSON.stringify({
				name: 'John Doe',
				sale: 100
			})
		});
		const data = await response.json();
		console.log(data);
	}

    function handleLocationSelection(event: any) {
        console.log('handle store location')
    }
</script>

<div class="max-w-[1200px] mx-auto">
	<h1 class="m-4 text-3xl uppercase pb-2 border-b-2 border-primary-600-300-token">Sales Data</h1>
	<button class="m-4 btn variant-ghost-surface" on:click={getSalesData}>GET Sales Data</button>
	<button class="m-4 btn variant-ghost-surface" on:click={postSalesData}>POST Sales Data</button>
	<div class="m-4 flex flex-wrap gap-4">
		<p>Here is where the sales data will be displayed.</p>
	</div>
</div>
