<script lang="ts">
	import { send, receive } from './transition.ts';
	import { flip } from 'svelte/animate';

	export let store: any;
	export let done: boolean;
</script>

<ul>
	{#each $store.filter((todo) => todo.done === done) as todo (todo.id)}
		<li
			class="flex items-center p-3 mb-2 gap-2 rounded-md drop-shadow variant-soft-primary"
			in:receive={{ key: todo.id }}
			out:send={{ key: todo.id }}
			animate:flip={{ duration: 300 }}
		>
			<label class="w-full h-full flex items-center">
				<input
					type="checkbox"
					class="rounded-full"
					checked={todo.done}
					on:change={(e) => store.mark(todo, e.currentTarget.checked)}
				/>

				<span class="flex-1 ml-2">{todo.description}</span>

				<button on:click={() => store.remove(todo)} aria-label="Remove"
					><i class="fa fa-trash" aria-hidden="true" /></button
				>
			</label>
		</li>
	{/each}
</ul>
