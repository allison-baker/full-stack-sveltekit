<script lang="ts">
	import { count } from '$lib/stores/count.ts';

	function reset() {
		count.set(0);
	}
</script>

<button on:click={reset} class="btn variant-filled-secondary">
	Reset
</button>
