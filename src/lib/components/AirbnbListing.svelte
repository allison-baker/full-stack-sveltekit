<script lang="ts">
	export let listings: [] = [];
</script>

<div class="max-w-3xl mx-auto my-4 bg-surface-100-800-token rounded-md shadow-md p-4">
	{#each listings as listing}
		<div class="card">
			<p>This should be an Airbnb individual listing.</p>
		</div>
	{/each}
</div>
