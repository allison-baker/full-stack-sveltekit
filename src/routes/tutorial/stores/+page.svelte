<script lang="ts">
	import { count } from '$lib/stores/count.ts';
	import Incrementer from '$lib/components/Incrementer.svelte';
	import Decrementer from '$lib/components/Decrementer.svelte';
	import Resetter from '$lib/components/Resetter.svelte';
	import { time, elapsed } from '$lib/stores/time.ts';
	import { customCount } from '$lib/stores/customCount.ts';
	import { name, greeting } from '$lib/stores/greeting.ts';
	import { CodeBlock } from '@skeletonlabs/skeleton';
	import hljs from 'highlight.js/lib/core';
	import xml from 'highlight.js/lib/languages/xml';
	import typescript from 'highlight.js/lib/languages/typescript';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';

	hljs.registerLanguage('xml', xml);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	const formatter = new Intl.DateTimeFormat('en', {
		hour12: true,
		hour: 'numeric',
		minute: '2-digit',
		second: '2-digit'
	});
</script>

<h1 class="text-2xl m-4">Stores</h1>

<div class="mx-4 my-2">
	<p class="my-2">The count is {$count}</p>

	<Incrementer />
	<Decrementer />
	<Resetter />
</div>

<p class="m-4 text-sm font-bold">
	This section uses a writable store and different components to increment, decrement, and reset a
	count. This page looks like this:
</p>

<CodeBlock
	language="xml"
	code={`<div class="mx-4 my-2">
	<p class="my-2">The count is {$count}</p>
	
	<Incrementer />
	<Decrementer />
	<Resetter />
</div>`}
	class="m-4 w-2/3"
/>

<p class="m-4 text-sm font-bold">
	The Incrementer.svelte and Decrementer.svelte have functions that change the count on click of a
	button, and Resetter.svelte sets the count to 0.
</p>

<CodeBlock
	language="typescript"
	code={`import { count } from '$lib/stores/count.ts';

function increment() {
	count.update((n) => n + 1);
}`}
	class="m-4 w-2/3"
/>

<p class="m-4 text-sm font-bold">The count.ts file that holds the count store looks like this:</p>

<CodeBlock
	language="typescript"
	code={`import { writable } from 'svelte/store';

export const count = writable(0);`}
	class="m-4 w-2/3"
/>

<hr class="border-2" />

<p class="mx-4 my-2">The time is {formatter.format($time)}</p>
<p class="mx-4 my-2">
	This page has been open for
	{$elapsed}
	{$elapsed === 1 ? 'second' : 'seconds'}
</p>

<p class="m-4 text-sm font-bold">
	This section uses a readable store to show the current time and a derived store that uses the time
	to show how long the page has been open.
</p>

<CodeBlock
	language="xml"
	code={`<p class="mx-4 my-2">The time is {formatter.format($time)}</p>
<p class="mx-4 my-2">
	This page has been open for
	{$elapsed}
	{$elapsed === 1 ? 'second' : 'seconds'}
</p>`}
	class="m-4 w-2/3"
/>

<p class="m-4 text-sm font-bold">This time.ts file that holds the elapsed store looks like this:</p>

<CodeBlock
	language="typescript"
	code={`import { readable, derived } from 'svelte/store';

export const time = readable(new Date(), function start(set) {
	const interval = setInterval(() => {
		set(new Date());
	}, 1000);
	
	return function stop() {
		clearInterval(interval);
	};
});
	
const start = new Date();
	
export const elapsed = derived(
	time,
	($time) => Math.round(($time - start) / 1000)
);`}
	class="m-4 w-2/3"
/>

<hr class="border-2" />

<div class="mx-4 my-2">
	<p class="my-2">The custom count is {$customCount}.</p>

	<button on:click={customCount.increment} class="btn variant-filled-secondary">+</button>
	<button on:click={customCount.decrement} class="btn variant-filled-secondary">-</button>
	<button on:click={customCount.reset} class="btn variant-filled-secondary">Reset</button>
</div>

<p class="m-4 text-sm font-bold">
	This section uses a custom writable store with increment, decrement, and reset methods to avoid
	exposing set and update. The customCount.ts file looks like this:
</p>

<CodeBlock
	language="typescript"
	code={`import { writable } from 'svelte/store';

function createCount() {
	const { subscribe, set, update } = writable(0);
	
	return {
		subscribe,
		increment: () => update(n => n + 1),
		decrement: () => update(n => n - 1),
		reset: () => set(0)
	};
}
	
export const customCount = createCount();`}
	class="m-4 w-2/3"
/>

<hr class="border-2" />

<label class="mx-4 my-2"
	>Your Name: <input
		type="text"
		bind:value={$name}
		class="text-surface-800 my-2 p-2 rounded-md bg-tertiary-200"
	/></label
>
<p class="mx-4">{$greeting}</p>
<button class="btn variant-filled-secondary mx-4 mt-2" on:click={() => ($name += '!')}
	>Add another exclamation mark!</button
>

<p class="m-4 text-sm font-bold">
	This section binds the value of an input field to a writable store, and allows the user to update
	the name directly inside the component using an onclick handler.
</p>

<CodeBlock
	language="xml"
	code={`<label class="mx-4 my-2">
Your Name: 
<input
	type="text"
	bind:value={$name}
	class="text-surface-800 my-2 p-2 rounded-md bg-tertiary-200"/>
</label>

<p class="mx-4">{$greeting}</p>
<button class="btn variant-filled-secondary mx-4 mt-2" on:click={() => ($name += '!')}>
	Add another exclamation mark!
</button>`}
	class="m-4 w-2/3"
/>
