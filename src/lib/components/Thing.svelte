<script lang="ts">
	const emojis = {
		apple: '🍎',
		banana: '🍌',
		carrot: '🥕',
		doughnut: '🍩',
		egg: '🥚'
	};

	// the name is updated whenever the prop value changes...
	export let name = 'emoji name';

	// ...but the "emoji" variable is fixed upon initialisation
	// of the component because it uses `const` instead of `$:`
	// @ts-ignore
	const emoji = emojis[name];
</script>

<p class="mx-4 my-2">{emoji} = {name}</p>
