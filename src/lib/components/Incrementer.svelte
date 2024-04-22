<script lang="ts">
	import { count } from '$lib/stores/count.ts';

	function increment() {
		count.update((n) => n + 1);
	}
</script>

<button on:click={increment} class="btn variant-filled-secondary">
	+
</button>