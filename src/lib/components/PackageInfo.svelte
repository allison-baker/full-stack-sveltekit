<script lang="ts">
	export let name: string;
	export let speed: string;
	export let version: number;
	export let website: string;

	$: href = `https://www.npmjs.com/package/${name}`;
</script>

<p class="mx-4 my-2">
	The <code>{name}</code> package is {speed} fast. Download version {version} from
	<a {href}>npm</a> and <a href={website}>learn more here</a>
</p>
