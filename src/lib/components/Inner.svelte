<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function sayHello() {
		dispatch('message', {
			text: 'You must have clicked the message button. Good job!'
		});
	}
</script>

<button class="btn variant-filled-secondary mx-4 mt-4" on:click={sayHello}>
	Click for Message
</button>
