<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	import { CodeBlock } from '@skeletonlabs/skeleton';
	import hljs from 'highlight.js/lib/core';
	import xml from 'highlight.js/lib/languages/xml';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';

	hljs.registerLanguage('xml', xml);
	storeHighlightJs.set(hljs);

	let count = 0;
	$: doubled = count * 2;

	function increment() {
		count += 1;
	}

	function reset() {
		count = 0;
	}

	$: {
		console.log(`the count is ${count}`);
		console.log("wow, you're counting a lot!");
	}

	const modalStore = getModalStore();

	function countAlert() {
		const modal: ModalSettings = {
			type: 'alert',
			title: 'Stop it!',
			body: "Cut it out, you've counted enough now."
		};
		modalStore.trigger(modal);
	}

	$: if (count >= 20) {
		countAlert();
	}

	let numbers = [1, 2, 3, 4];

	function addNumber() {
		numbers[numbers.length] = numbers.length + 1;
	}

	$: sum = numbers.reduce((total, currentNumber) => total + currentNumber, 0);
</script>

<h1 class="text-2xl m-4">Reactivity</h1>

<div class="mx-4 my-2">
	<button class="btn variant-filled-secondary my-2" on:click={increment}>
		Clicked {count}
		{count === 1 ? 'time' : 'times'}
	</button>

	<p>{count} doubled is {doubled}</p>
	<button class="btn variant-filled-secondary my-2" on:click={reset}> Reset Count </button>
</div>

<p class="m-4 text-sm font-bold">This section demonstrates reactive values.</p>

<CodeBlock
	language="xml"
	code={`<div class="mx-4 my-2">
	<button class="btn variant-filled-secondary my-2" on:click={increment}>
		Clicked {count}
		{count === 1 ? 'time' : 'times'}
	</button>
	
	<p>{count} doubled is {doubled}</p>
	<button class="btn variant-filled-secondary my-2" on:click={reset}> Reset Count </button>
</div>`}
	class="m-4 w-2/3"
/>

<hr class="border-2" />

<div class="mx-4 my-2">
	<p>{numbers.join(' + ')} = {sum}</p>
	<button class="btn variant-filled-secondary my-2" on:click={addNumber}>Add a Number</button>
</div>

<p class="m-4 text-sm font-bold">
	This section demonstrates grouping reactive statements together with a block.
</p>

<CodeBlock
	language="xml"
	code={`<div class="mx-4 my-2">
	<p>{numbers.join(' + ')} = {sum}</p>
	<button class="btn variant-filled-secondary my-2" on:click={addNumber}>Add a Number</button>
</div>`}
	class="m-4 w-2/3"
/>
