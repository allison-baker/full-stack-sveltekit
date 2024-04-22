<script lang="ts">
	import { count } from '$lib/stores/count.ts';

	function decrement() {
		count.update((n) => n - 1);
	}
</script>

<button on:click={decrement} class="btn variant-filled-secondary">
	-
</button>
