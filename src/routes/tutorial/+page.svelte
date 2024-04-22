<script lang="ts">
	import { CodeBlock } from '@skeletonlabs/skeleton';
	import hljs from 'highlight.js/lib/core';
	import typescript from 'highlight.js/lib/languages/typescript';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';

	let name = 'Svelte Tutorials';
	let gifName = 'cat';
	let src = 'https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif';

	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);
</script>

<h1 class="text-2xl m-4 text-secondary-600 dark:text-secondary-300 font-bold">
	Welcome to my {name.toUpperCase()} Introduction page!
</h1>

<img {src} alt="animated {gifName}.gif" class="m-4 rounded" />

<p class="mx-4 my-2">I put this cat gif in here by assigning some attributes in the image tag to variables in my script tag!</p>

<p class="text-sm font-bold m-4">
	Look out for these lines throughout the application! They will tell you what each tutorial is
	demonstrating.
</p>

<CodeBlock language="ts" code={`const message: string = 'Watch out for code blocks throughout!';`} class="m-4 w-2/3"></CodeBlock>
