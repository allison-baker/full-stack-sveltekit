<script lang="ts">
	import Inner from './Inner.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	// can say on:message={forward} and perform this function or on:message without a value does the same
	/* function forward(event: any) {
        dispatch('message', event.detail)
    } */
</script>

<Inner on:message />
