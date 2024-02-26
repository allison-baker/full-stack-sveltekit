<script lang="ts">
	export let data: any;
	import { Ratings } from '@skeletonlabs/skeleton';

	let rating = {
		current: 3,
		max: 5
	};

	function iconClick(event: CustomEvent<{ index: number }>): void {
		rating.current = event.detail.index;
	}

	console.log(data);
</script>

<div>
	<div class="max-w-3xl mx-auto my-4 bg-surface-100-800-token rounded-md shadow-md p-4">
		<h1 class="mb-4 text-2xl text-primary-700-200-token">Review the Airbnb</h1>
		<form method="POST">
			<fieldset>
				<label for="name" class="block font-bold text-sm"
					>Full Name:
					<input
						class="block input font-normal mt-2"
						type="text"
						id="name"
						placeholder="Your Name"
						required
					/></label
				>
			</fieldset>
			<fieldset class="my-4">
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
						placeholder="Your Review"
						rows="4"
						required
					></textarea>
				</label>
			</fieldset>
		</form>
	</div>
	<!-- SHOW AIRBNB LISTINGS HERE ATER LOAD() FUNCTION RETRIEVES -->
</div>
