<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	// const modalStore = getModalStore();

	export let listings: [] = [];

	interface Listing {
		listing_url: string;
		name: string;
		summary: string;
		description: string;
		space: string;
		room_type: string;
		price: number;
		bedrooms: number;
		bathrooms: number;
		security_deposit: number;
		reviews: Array<Object>;
	}

	$: convertedListings = listings.map((item: any) => convertToListing(item));

	function convertToListing(data: any): Listing {
		return {
			listing_url: data.listing_url || '',
			name: data.name || '',
			summary: data.summary || '',
			description: data.description || '',
			space: data.space || '',
			room_type: data.room_type || '',
			price: data.price || 0,
			bedrooms: data.bedrooms || 0,
			bathrooms: data.bathrooms || 0,
			security_deposit: data.security_deposit || 0,
			reviews: data.reviews || []
		};
	}

	function showReviewForm(listing: Listing): void {
		dispatch('showReviewForm', { show: true, name: listing.name });
	}

	const showReviews = async (listing: Listing) => {
		dispatch('showListingReviews', { show: true, name: listing.name, reviews: listing.reviews });
	};
</script>

<div
	class="m-4 bg-surface-100-800-token rounded-md shadow-md p-4 grid grid-cols-2 gap-4"
>
	{#each convertedListings as listing}
		<div class="card p-4 bg-surface-200-700-token flex flex-col justify-between">
			<div>
				<h2 class="text-xl font-bold mb-1">{listing.name}</h2>
				<p class="text-sm mb-1">{listing.summary}</p>
			</div>
			<div class="flex flex-row justify-between align-center mt-4">
				<button class="btn variant-ghost-primary" on:click={() => showReviews(listing)}
					>Show Reviews</button
				>
				<button
					class="btn-icon btn-icon-md bg-secondary-600-300-token"
					on:click={() => showReviewForm(listing)}
					><i class="fa-regular fa-star fa-lg text-surface-100-800-token"></i></button
				>
			</div>
		</div>
	{/each}
</div>
