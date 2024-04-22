<script lang="ts">
	// import Inner from "$lib/components/Inner.svelte";
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	import Outer from '$lib/components/Outer.svelte';
	import BigRedButton from '$lib/components/BigRedButton.svelte';

	import { CodeBlock } from '@skeletonlabs/skeleton';
	import hljs from 'highlight.js/lib/core';
	import xml from 'highlight.js/lib/languages/xml';
	import typescript from 'highlight.js/lib/languages/typescript';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';

	hljs.registerLanguage('xml', xml);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	let m = { x: 0, y: 0 };

	const modalStore = getModalStore();

	function handleClick() {
		const modal: ModalSettings = {
			type: 'alert',
			title: 'Blue Button',
			body: 'Thanks for helping demonstrate event forwarding!'
		};
		modalStore.trigger(modal);
	}

	function handleMessage(event: { detail: { text: any } }) {
		const modal: ModalSettings = {
			type: 'alert',
			title: 'Hello!',
			body: event.detail.text
		};
		modalStore.trigger(modal);
		//alert(event.detail.text)
	}

	/* function handleClick() {
		alert('You clicked the big blue button!');
	} */
</script>

<h1 class="m-4 text-2xl">Events</h1>

<div
	class="left-0 top-0 h-96 p-4 bg-secondary-300 mx-4"
	on:pointermove={(e) => {
		m = { x: Math.floor(e.clientX), y: Math.floor(e.clientY) };
	}}
>
	<p class="text-surface-900 font-bold">The pointer is at {m.x} x {m.y}</p>
</div>
<p class="m-4 text-sm font-bold">
	This div uses the on:pointermove event handler to show your current pointer location within the
	div.
</p>

<CodeBlock
	language="xml"
	code={`<div
	class="left-0 top-0 w-full h-96 p-4 bg-secondary-300"
	on:pointermove={(e) => {
		m = { x: Math.floor(e.clientX), y: Math.floor(e.clientY) };
	}}
>
	<p class="text-surface-900 font-bold">The pointer is at {m.x} x {m.y}</p>
</div>`}
	class="m-4 w-2/3"
/>

<hr class="border-2" />

<button class="btn variant-filled-secondary mx-4 mt-4" on:click={() => alert('clicked')}>
	Click Me
</button>

<p class="m-4 text-sm font-bold">This button demonstrates a simple on:click event handler.</p>

<CodeBlock
	language="xml"
	code={`<button class="btn variant-filled-secondary mx-4 mt-4" on:click={() => alert('clicked')}>
	Click Me
</button>`}
	class="m-4 w-2/3"
/>

<hr class="border-2" />

<Outer on:message={handleMessage} />

<p class="m-4 text-sm font-bold">
	This button demonstrates event forwarding from an Inner component to an Outer component to this
	page.
</p>

<CodeBlock language="xml" code={`<Outer on:message={handleMessage} />`} class="m-4 w-2/3" />

<p class="m-4 text-sm font-bold">The Outer.svelte script block looks like this:</p>

<CodeBlock
	language="typescript"
	code={`import Inner from './Inner.svelte';
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

// can say on:message={forward} and perform this function or on:message without a value does the same
/* function forward(event: any) {
        dispatch('message', event.detail)
} */`}
	class="m-4 w-2/3"
/>

<p class="m-4 text-sm font-bold">The Inner.svelte script block looks like this:</p>

<CodeBlock
	language="typescript"
	code={`import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

function sayHello() {
	dispatch('message', {
		text: 'You must have clicked the message button. Good job!'
	});
}`}
	class="m-4 w-2/3"
/>

<p class="m-4 text-sm font-bold">
	The Inner.svelte page also has the button that gets clicked and starts the chain of event
	forwarding:
</p>

<CodeBlock
	language="xml"
	code={`<button class="btn variant-filled-secondary mx-4 mt-4" on:click={sayHello}>
	Click for Message
</button>`}
	class="m-4 w-2/3"
/>

<hr class="border-2" />

<BigRedButton on:click={handleClick} />

<p class="m-4 text-sm font-bold">This button forwards an on:click event from another component.</p>

<CodeBlock language="xml" code={`<BigRedButton on:click={handleClick} />`} class="m-4 w-2/3" />

<p class="m-4 text-sm font-bold">The BigRedButton.svelte page looks like this:</p>

<CodeBlock
	language="xml"
	code={`<button class="btn variant-filled-tertiary mx-4 mt-4" on:click> Forward Click </button>`}
	class="m-4 w-2/3"
/>
