<script lang="ts">
	let elemReviews: HTMLDivElement;
	export let reviews: any;
	export let name: string;

	function multiColumnLeft(): void {
		let x = elemReviews.scrollWidth;
		if (elemReviews.scrollLeft !== 0) x = elemReviews.scrollLeft - elemReviews.clientWidth;
		elemReviews.scroll(x, 0);
	}

	function multiColumnRight(): void {
		let x = 0;
		// -1 is used because different browsers use different methods to round scrollWidth pixels.
		if (elemReviews.scrollLeft < elemReviews.scrollWidth - elemReviews.clientWidth - 1)
			x = elemReviews.scrollLeft + elemReviews.clientWidth;
		elemReviews.scroll(x, 0);
	}

	function getListingName(id: string) {
		console.log('get listing name from id');
		return "Haven't built function";
	}
</script>

<h1 class="text-2xl font-bold uppercase text-tertiary-600-300-token m-4">{name}</h1>
<div class="m-4 grid grid-cols-[auto_1fr_auto] gap-4 items-center">
	<!-- Button: Left -->
	<button type="button" class="btn-icon variant-filled" on:click={multiColumnLeft}>
		<i class="fa-solid fa-arrow-left" />
	</button>
	<!-- Carousel -->
	<div
		bind:this={elemReviews}
		class="snap-x snap-mandatory scroll-smooth flex gap-4 pb-2 overflow-x-auto"
	>
		{#each reviews as review}
			<div class="card min-w-48 h-64 p-4 flex flex-col bg-surface-100-800-token shadow-sm">
				<h2 class="text-primary-500-400-token font-bold uppercase mb-2 text-lg">{review.reviewer_name}</h2>
				<p class="line-clamp-[8] text-sm">"{review.comments}"</p>
			</div>
		{/each}
	</div>
	<!-- Button-Right -->
	<button type="button" class="btn-icon variant-filled" on:click={multiColumnRight}>
		<i class="fa-solid fa-arrow-right" />
	</button>
</div>
