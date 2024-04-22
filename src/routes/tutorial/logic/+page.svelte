<script lang="ts">
	import Thing from '$lib/components/Thing.svelte';
	import { getRandomNumber } from '$lib/utils/delayFunction.ts';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { faker } from '@faker-js/faker';
	import { CodeBlock } from '@skeletonlabs/skeleton';
	import hljs from 'highlight.js/lib/core';
	import xml from 'highlight.js/lib/languages/xml';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';

	hljs.registerLanguage('xml', xml);
	storeHighlightJs.set(hljs);

	let count = 0;

	function increment() {
		count += 1;
	}

	let colors = ['#aa4c4b', '#324f4d', '#404e5c', '#e5969c', '#b8804c', '#7d4a63', '#535050'];
	let selected = colors[0];

	let things = [
		{ id: 1, name: 'apple' },
		{ id: 2, name: 'banana' },
		{ id: 3, name: 'carrot' },
		{ id: 4, name: 'doughnut' },
		{ id: 5, name: 'egg' }
	];

	function handleClick() {
		things = things.slice(1);
	}

	let promise = getRandomNumber();

	function handlePromise() {
		promise = getRandomNumber();
	}

	const twentyFiveAvatars = [...Array(25)].map(() => {
		const lastName = faker.person.lastName();
		return {
			lastName,
			avatar: `https://api.dicebear.com/7.x/pixel-art-neutral/svg?seed=${lastName}`
		};
	});
</script>

<h1 class="m-4 text-2xl">Logic</h1>

<button class="btn variant-filled-secondary mx-4 my-2" on:click={increment}>
	Clicked {count}
	{count === 1 ? 'Time' : 'Times'}
</button>

{#if count >= 10}
	<p class="mx-4 my-2">{count} is greater than or equal to 10</p>
{:else if count < 5}
	<p class="mx-4 my-2">{count} is between 0 and 5</p>
{:else}
	<p class="mx-4 my-2">{count} is between 5 and 10</p>
{/if}

<p class="m-4 text-sm font-bold">
	This button uses if and else if statements to show where count is between 0, 5, and 10.
</p>

<CodeBlock
	language="xml"
	code={`<button class="btn variant-filled-secondary mx-4 my-2" on:click={increment}>
	Clicked {count}
	{count === 1 ? 'Time' : 'Times'}
</button>

{#if count >= 10}
	<p class="mx-4 my-2">{count} is greater than or equal to 10</p>
{:else if count < 5}
	<p class="mx-4 my-2">{count} is between 0 and 5</p>
{:else}
	<p class="mx-4 my-2">{count} is between 5 and 10</p>
{/if}`}
	class="m-4 w-2/3"
/>

<hr class="border-2" />

<h1 style="color: {selected}" class="mx-4 my-2 text-xl font-bold">Pick a Color</h1>

<div class="mx-4 my-2 grid grid-cols-7 gap-2 max-w-md">
	{#each colors as color, i}
		<button
			class="btn rounded-full hover:-translate-y-2 hover:scale-110 aria-selected:shadow-xl"
			aria-current={selected === color}
			aria-label={color}
			style="background: {color}"
			on:click={() => (selected = color)}
			>{i + 1}
		</button>
	{/each}
</div>

<p class="m-4 text-sm font-bold">
	This section uses and each block to go through an array of colors.
</p>

<CodeBlock
	language="xml"
	code={`<div class="mx-4 my-2 grid grid-cols-7 gap-2 max-w-md">
	{#each colors as color, i}
		<button
			class="btn rounded-full hover:-translate-y-2 hover:scale-110 aria-selected:shadow-xl"
			aria-current={selected === color}
			aria-label={color}
			style="background: {color}"
			on:click={() => (selected = color)}>{i + 1}
		</button>
	{/each}
</div>`}
	class="m-4 w-2/3"
/>

<hr class="border-2" />

<button class="btn variant-filled-secondary m-4" on:click={handleClick}>
	Remove First Thing
</button>

{#each things as thing (thing.id)}
	<Thing name={thing.name} />
{/each}

<p class="m-4 text-sm font-bold">
	This section uses an each block to display an array of things with a key so they can be removed.
</p>

<CodeBlock
	language="xml"
	code={`{#each things as thing (thing.id)}
	<Thing name={thing.name} />
{/each}`}
	class="m-4 w-2/3"
/>

<hr class="border-2" />

<button class="btn variant-filled-secondary m-4" on:click={handlePromise}>
	Generate Random Number
</button>

{#await promise}
	<div class="mx-4 my-2"><ProgressRadial value={undefined} /></div>
{:then number}
	<p class="mx-4 my-2">The number is {number}</p>
{:catch error}
	<p class="text-error-500 mx-4 my-2">{error.message}</p>
{/await}

<p class="m-4 text-sm font-bold">This section uses an await block to handle a promise.</p>

<CodeBlock
	language="xml"
	code={`{#await promise}
	<div class="mx-4 my-2"><ProgressRadial value={undefined} /></div>
{:then number}
	<p class="mx-4 my-2">The number is {number}</p>
{:catch error}
	<p class="text-error-500 mx-4 my-2">{error.message}</p>
{/await}`}
	class="m-4 w-2/3"
/>

<hr class="border-2" />

<div class="flex flex-wrap bg-secondary-300 justify-center">
	{#each twentyFiveAvatars as { lastName, avatar }}
		<div class="flex flex-col items-center m-4">
			<img src={avatar} alt={lastName} class="w-24 h-24 rounded-full" />
			<p class="text-surface-900 font-bold">{lastName}</p>
		</div>
	{/each}
</div>

<p class="m-4 text-sm font-bold">
	This section uses an each block to iterate through an array of objects and display them.
</p>

<CodeBlock
	language="xml"
	code={`<div class="flex flex-wrap bg-secondary-300 justify-center">
	{#each twentyFiveAvatars as { lastName, avatar }}
		<div class="flex flex-col items-center m-4">
			<img src={avatar} alt={lastName} class="w-24 h-24 rounded-full" />
			<p class="text-surface-900 font-bold">{lastName}</p>
		</div>
	{/each}
</div>`}
	class="m-4 w-2/3"
/>
