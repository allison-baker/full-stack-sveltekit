<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { CodeBlock } from '@skeletonlabs/skeleton';
	import hljs from 'highlight.js/lib/core';
	import typescript from 'highlight.js/lib/languages/typescript';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';

	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	let pokeImg: string;
	let pokeName: string;

	onMount(async () => {
		let randomPokeID = Math.floor(Math.random() * 100) + 1;
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokeID}`);
		const pokemon = await response.json();
		pokeImg = pokemon.sprites?.other?.['official-artwork']?.front_default;
		pokeName = pokemon.name;
	});

	let text = 'Select some of this text and hit the tab key to toggle between upper and lowercase.';

	async function handleKeydown(this: any, event: { key: string; preventDefault: () => void }) {
		if (event.key !== 'Tab') return;

		event.preventDefault();

		const { selectionStart, selectionEnd, value } = this;
		const selection = value.slice(selectionStart, selectionEnd);

		const replacement = /[a-z]/.test(selection) ? selection.toUpperCase() : selection.toLowerCase();

		text = value.slice(0, selectionStart) + replacement + value.slice(selectionEnd);

		await tick();
		this.selectionStart = selectionStart;
		this.selectionEnd = selectionEnd;
	}
</script>

<h1 class="m-4 text-2xl">Lifecycle</h1>

<div class="flex flex-col justify-center items-center mb-4">
	{#if pokeImg}
		<img src={pokeImg} alt={pokeName} class="h-96 w-96" />
		<p class="font-bold text-lg text-center">
			{pokeName.toUpperCase()}
		</p>
	{:else}
		<p>Loading...</p>
	{/if}
</div>

<p class="m-4 text-sm font-bold">
	This section shows a new Pokemon every time the document loads (onMount).
</p>

<CodeBlock
	language="typescript"
	code={`onMount(async () => {
	let randomPokeID = Math.floor(Math.random() * 100) + 1;
	const response = await fetch(\`https://pokeapi.co/api/v2/pokemon/\${randomPokeID}\`);
	const pokemon = await response.json();
	pokeImg = pokemon.sprites?.other?.['official-artwork']?.front_default;
	pokeName = pokemon.name;
});`}
	class="m-4 w-2/3"
/>

<hr class="border-2" />

<textarea
	value={text}
	on:keydown={handleKeydown}
	class="text-surface-800 p-2 rounded-md bg-tertiary-200 w-2/3 mx-4 mt-4"
/>

<p class="m-4 text-sm font-bold">
	This textarea allows you to toggle the selection between upper and lower case by hitting the tab
	key.
</p>

<CodeBlock
	language="typescript"
	code={`let text = 'Select some of this text and hit the tab key to toggle between upper and lowercase.';

async function handleKeydown(this: any, event: { key: string; preventDefault: () => void }) {
	if (event.key !== 'Tab') return;

	event.preventDefault();

	const { selectionStart, selectionEnd, value } = this;
	const selection = value.slice(selectionStart, selectionEnd);

	const replacement = /[a-z]/.test(selection) ? selection.toUpperCase() : selection.toLowerCase();

	text = value.slice(0, selectionStart) + replacement + value.slice(selectionEnd);

	await tick();
	this.selectionStart = selectionStart;
	this.selectionEnd = selectionEnd;
}`}
	class="m-4 w-2/3"
/>
