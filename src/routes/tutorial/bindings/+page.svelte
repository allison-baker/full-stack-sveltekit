<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	import { marked } from 'marked';

	import { CodeBlock } from '@skeletonlabs/skeleton';
	import hljs from 'highlight.js/lib/core';
	import xml from 'highlight.js/lib/languages/xml';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';

	hljs.registerLanguage('xml', xml);
	storeHighlightJs.set(hljs);

	let name = 'Thor';

	let a = 1;
	let b = 2;

	let yes = false;

	let questions = [
		{
			id: 1,
			text: `Where did you go to school?`
		},
		{
			id: 2,
			text: `What is your mother's name?`
		},
		{
			id: 3,
			text: `What is another personal fact that an attacker could easily find with Google?`
		}
	];

	let selected: { id: any; text: any };

	let answer = '';

	const modalStore = getModalStore();

	function handleSubscribe() {
		const modal: ModalSettings = {
			type: 'alert',
			title: 'Thanks for opting in!',
			body: "We're totally not about to sell all of your personal information."
		};
		modalStore.trigger(modal);
	}

	function handleSubmit() {
		const modal: ModalSettings = {
			type: 'alert',
			title: 'Thanks for giving up your information!',
			body: `You've answered question ${selected.id} (${selected.text}) with "${answer}."`
		};
		modalStore.trigger(modal);
	}

	/* function handleSubmit() {
		alert(`answered question ${selected.id} (${selected.text}) with "${answer}"`);
	} */

	let scoops = 1;
	let flavours = [];

	const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });

	let value = `Some words are *italic*, some are **bold**\n\n- lists\n- are\n- cool`;
</script>

<h1 class="m-4 text-2xl">Bindings</h1>

<input class="mx-4 my-2 text-surface-800 p-2 rounded-md bg-tertiary-200" bind:value={name} />

<p class="mx-4 my-2">Hello {name}!</p>

<p class="m-4 text-sm font-bold">This section demonstrates binding an input value to a variable.</p>

<CodeBlock
	language="xml"
	code={`<input class="mx-4 my-2 text-surface-800 p-2 rounded-md bg-tertiary-200" bind:value={name} />`}
	class="m-4 w-2/3"
/>

<hr class="border-2" />

<label class="block mx-4 my-2">
	<input
		class="text-surface-800 my-2 p-2 rounded-md bg-tertiary-200"
		type="number"
		bind:value={a}
		min="0"
		max="10"
	/>
	<input class="text-surface-800 my-2" type="range" bind:value={a} min="0" max="10" />
</label>

<label class="block mx-4 my-2">
	<input
		class="text-surface-800 my-2 p-2 rounded-md bg-tertiary-200"
		type="number"
		bind:value={b}
		min="0"
		max="10"
	/>
	<input class="text-surface-800 my-2" type="range" bind:value={b} min="0" max="10" />
</label>

<p class="mx-4 my-2">{a} + {b} = {a + b}</p>

<p class="m-4 text-sm font-bold">
	This section demonstrates binding input types number and range to variables.
</p>

<CodeBlock
	language="xml"
	code={`<label class="block mx-4 my-2">
	<input
		class="text-surface-800 my-2 p-2 rounded-md bg-tertiary-200"
		type="number"
		bind:value={a}
		min="0"
		max="10"
	/>
	<input class="text-surface-800 my-2" type="range" bind:value={a} min="0" max="10" />
</label>`}
	class="m-4 w-2/3"
/>

<hr class="border-2" />

<label class="mx-4 my-2">
	<input class="my-2" type="checkbox" bind:checked={yes} />
	Yes! Send me regular email spam
</label>

{#if yes}
	<p class="mx-4 my-2">Thank you. We will bombard your inbox and sell your personal details.</p>
{:else}
	<p class="mx-4 my-2">You must opt in to continue. If you're not paying, you're the product.</p>
{/if}

<button class="btn variant-filled-secondary mx-4 my-2" disabled={!yes} on:click={handleSubscribe}
	>Subscribe</button
>

<p class="m-4 text-sm font-bold">This section demonstrates using bind:checked to toggle states.</p>

<CodeBlock
	language="xml"
	code={`<label class="mx-4 my-2">
	<input class="my-2" type="checkbox" bind:checked={yes} />
	Yes! Send me regular email spam
</label>`}
	class="m-4 w-2/3"
/>

<hr class="border-2" />

<h2 class="text-lg mx-4 my-2 text-primary-600 dark:text-primary-400 font-bold">
	Insecurity Questions
</h2>

<form class="mx-4" on:submit|preventDefault={handleSubmit}>
	<select
		class="text-surface-800 p-2 rounded-md bg-tertiary-200"
		bind:value={selected}
		on:change={() => (answer = '')}
	>
		{#each questions as question}
			<option class="text-surface-800" value={question}>
				{question.text}
			</option>
		{/each}
	</select>

	<input class="text-surface-800 p-2 rounded-md bg-tertiary-200" bind:value={answer} />

	<button class="btn variant-filled-secondary m-2" disabled={!answer} type="submit">
		Submit
	</button>
</form>

<p class="mx-4 my-2">
	You've selected question {selected ? selected.id : '[waiting...]'}
</p>

<p class="m-4 text-sm font-bold">This form uses bind:value with a select element.</p>

<CodeBlock
	language="xml"
	code={`<select
	class="text-surface-800 p-2 rounded-md bg-tertiary-200"
	bind:value={selected}
	on:change={() => (answer = '')}
>
	{#each questions as question}
		<option class="text-surface-800" value={question}>
			{question.text}
		</option>
	{/each}
</select>

<input class="text-surface-800 p-2 rounded-md bg-tertiary-200" bind:value={answer} />`}
	class="m-4 w-2/3"
/>

<hr class="border-2" />

<h2 class="text-lg mx-4 my-2 text-primary-600 dark:text-primary-400 font-bold">Size</h2>

{#each [1, 2, 3] as number}
	<label class="mx-2">
		<input type="radio" name="scoops" value={number} bind:group={scoops} />

		{number}
		{number === 1 ? 'Scoop' : 'Scoops'}
	</label>
{/each}

<h2 class="text-lg mx-4 my-2 text-primary-600 dark:text-primary-400 font-bold">Flavours</h2>

<select class="mx-2 text-surface-800 p-2 rounded-md bg-tertiary-200" multiple bind:value={flavours}>
	{#each ['Chocolate Chip Cookie Dough', 'Mint Brownie', 'Rocky Road'] as flavour}
		<option>{flavour}</option>
	{/each}
</select>

{#if flavours.length === 0}
	<p class="mx-4 my-2">Please select at least one flavour.</p>
{:else if flavours.length > scoops}
	<p class="mx-4 my-2">Can't order more flavours than scoops!</p>
{:else}
	<p class="mx-4 my-2">
		You ordered {scoops}
		{scoops === 1 ? 'scoop' : 'scoops'}
		of {formatter.format(flavours)}
	</p>
{/if}

<p class="m-4 text-sm font-bold">
	This section demonstrates using bind:group for radio inputs, and bind:value with select multiple.
</p>

<CodeBlock
	language="xml"
	code={`<input type="radio" name="scoops" value={number} bind:group={scoops} />`}
	class="m-4 w-2/3"
/>

<hr class="border-2" />

<div class="grid m-4 grid-rows-2 gap-4 grid-cols-[5rem_1fr]">
	<h2 class="text-lg text-primary-600 dark:text-primary-400 font-bold">Input</h2>
	<textarea
		class="flex-[1] resize-none text-surface-800 p-2 rounded-md bg-tertiary-200"
		bind:value
	/>

	<h2 class="text-lg text-primary-600 dark:text-primary-400 font-bold">Output</h2>
	<div>{@html marked(value)}</div>
</div>

<p class="m-4 text-sm font-bold">This section binds a value to a textarea.</p>

<CodeBlock
	language="xml"
	code={`<textarea class="flex-[1] resize-none text-surface-800 p-2 rounded-md bg-tertiary-200" bind:value></textarea>`}
	class="m-4 w-2/3"
/>
