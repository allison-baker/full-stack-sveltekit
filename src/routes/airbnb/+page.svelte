<script lang="ts">
	import { Ratings } from '@skeletonlabs/skeleton';
	import AirbnbListing from '$lib/components/AirbnbListing.svelte';
	import { page } from '$app/stores';
	import { fly, slide } from 'svelte/transition';
	import ReviewCarousel from '$lib/components/ReviewCarousel.svelte';

	export let data: any;
	export let form: any;
	let divScroll: HTMLElement;

	let rating = { current: 3, max: 5 };
	let formVisible = false;
	let listingName: string;

	function iconClick(event: CustomEvent<{ index: number }>): void {
		rating.current = event.detail.index;
	}

	function handleCancel() {
		formVisible = false;
	}

	function handleReview(event: CustomEvent<{ show: boolean; name: string }>) {
		formVisible = event.detail.show;
		listingName = event.detail.name;
		divScroll.scrollIntoView({ behavior: 'smooth' });
	}

	let reviewsVisible = false;
	let reviewsName = '';
	let currReviews: Array<Object>;

	function handleCarousel(
		event: CustomEvent<{ show: boolean; name: string; reviews: Array<Object> }>
	) {
		reviewsVisible = event.detail.show;
		reviewsName = event.detail.name;
		currReviews = event.detail.reviews;
	}

	function hideReviews() {
		reviewsVisible = false;
	}
</script>

<div bind:this={divScroll} class="max-w-[1200px] mx-auto">
	{#if form?.error}
		<div class="bg-red-100 border-red-500 text-red-700 px-4 py-3 rounded relative" role="alert">
			<strong class="font-bold">Error!</strong>
			<span class="block sm:inline">{form.error}</span>
		</div>
	{/if}
	{#if formVisible}
		<div
			class="max-w-[1200px] mx-auto my-4 bg-surface-100-800-token rounded-md shadow-md p-4"
			in:fly={{ y: 200 }}
			out:slide
		>
			<form method="POST" action="?/submitReview">
				<input id="username" name="username" type="hidden" value={$page.data.session?.user?.name} />
				<input id="listingName" name="listingName" type="hidden" value={listingName} />
				<input id="ratingValue" name="ratingValue" type="hidden" value={rating.current} />
				<fieldset class="my-4">
					<h1 class="mb-4 text-xl text-primary-700-200-token">
						Review of: <span class="font-bold">{listingName}</span>
					</h1>
					<label for="rating" class="font-bold text-sm mb-2">Your Rating:</label>
					<Ratings
						bind:value={rating.current}
						max={rating.max}
						interactive
						on:icon={iconClick}
						id="rating"
						justify="left"
					>
						<svelte:fragment slot="empty"><i class="fa-regular fa-star fa-xl"></i></svelte:fragment>
						<svelte:fragment slot="half"
							><i class="fa-solid fa-star-half-stroke fa-xl"></i></svelte:fragment
						>
						<svelte:fragment slot="full"><i class="fa-solid fa-star fa-xl"></i></svelte:fragment>
					</Ratings>
				</fieldset>
				<fieldset>
					<label for="review" class="block font-bold text-sm"
						>Review:
						<textarea
							class="block font-normal mt-2 textarea"
							id="review"
							name="review"
							placeholder="Your Review"
							rows="4"
							required
						></textarea>
					</label>
				</fieldset>
				<button class="btn variant-ghost-surface my-4" on:click={handleCancel}>Cancel</button>
				<button class="btn variant-ghost-primary my-4" type="submit">Submit Review</button>
			</form>
		</div>
	{/if}
	{#if data}
		<h1
			class="m-4 text-3xl uppercase pb-2 border-b-2 border-primary-600-300-token"
		>
			Airbnbs
		</h1>
		<AirbnbListing
			listings={data.body}
			on:showReviewForm={handleReview}
			on:showListingReviews={handleCarousel}
		/>
	{/if}
	{#if reviewsVisible}
		<div class="absolute top-16 left-0 bg-surface-100-800-token py-8 px-4 w-full">
			<button class="btn variant-ghost-surface mx-4" on:click={hideReviews}>Hide Reviews</button>
			<ReviewCarousel reviews={currReviews} name={reviewsName} />
		</div>
	{/if}
</div>
