<script lang="ts">
	import Nested from '$lib/components/Nested.svelte';
	import PackageInfo from '$lib/components/PackageInfo.svelte';
	import { CodeBlock } from '@skeletonlabs/skeleton';
	import hljs from 'highlight.js/lib/core';
	import typescript from 'highlight.js/lib/languages/typescript';
	import xml from 'highlight.js/lib/languages/xml';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';

	hljs.registerLanguage('typescript', typescript);
	hljs.registerLanguage('xml', xml);
	storeHighlightJs.set(hljs);

	let pkg = {
		name: 'svelte',
		speed: 'blazing',
		version: 4,
		website: 'https://svelte.dev/'
	};
</script>

<h1 class="m-4 text-2xl">Props</h1>

<Nested answer={'42'} />

<p class="m-4 text-sm font-bold">
	This demonstrates passing data from a parent component to a child. The Nested.svelte page script
	block looks like this:
</p>

<CodeBlock language="typescript" code={`export let answer = ' a mystery';`} class="m-4 w-2/3" />

<p class="m-4 text-sm font-bold">With one line of HTML:</p>

<CodeBlock
	language="xml"
	code={`<p class="mx-4 my-2">The answer is {answer}</p>`}
	class="m-4 w-2/3"
/>

<p class="m-4 text-sm font-bold">
	After importing Nested from Nested.svelte, showing this on the current page only requires one
	line:
</p>

<CodeBlock language="xml" code={`<Nested answer={'42'} />`} class="m-4 w-2/3" />

<hr class="border-2" />

<Nested />

<p class="m-4 text-sm font-bold">
	This demonstrates default values for props. In the Nested.svelte script block, the answer variable
	is assigned to "a mystery" as the default value.
</p>

<CodeBlock language="xml" code={`<Nested />`} class="m-4 w-2/3" />

<hr class="border-2" />

<PackageInfo {...pkg} />

<p class="m-4 text-sm font-bold">
	This demonstrates spreading an array with values that matches a component's props onto a
	component.
</p>

<CodeBlock language="xml" code={`<PackageInfo {...pkg} />`} class="m-4 w-2/3" />

<p class="m-4 text-sm font-bold">The PackageInfo.svelte page script block looks like this:</p>

<CodeBlock
	language="typescript"
	code={`export let name;
export let speed;
export let version;
export let website;

$: href = \`https://www.npmjs.com/package/\${name}\`;`}
	class="m-4 w-2/3"
/>

<p class="m-4 text-sm font-bold">With this HTML:</p>

<CodeBlock
	language="xml"
	code={`<p class="mx-4 my-2">
	The <code>{name}</code> package is {speed} fast. Download version {version} from
	<a {href}>npm</a> and <a href={website}>learn more here</a>
</p>`}
	class="m-4 w-2/3"
/>
