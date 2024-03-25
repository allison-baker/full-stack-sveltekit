<script lang='ts'>
    async function getSalesData() {
        const response = await fetch('/api/sales');
        const data = await response.json();
        console.log(data);
    }
</script>

<div>
	<h1 class="m-4 text-3xl uppercase pb-2 border-b-2 border-primary-600-300-token">Sales Data</h1>
    <button class="btn variant-ghost-surface">Get Sales</button>
	<div class="m-4 flex flex-wrap gap-4">
		<p>Here is where the sales data will be displayed.</p>
	</div>
</div>