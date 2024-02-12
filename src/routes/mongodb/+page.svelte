<script lang="ts">
	export let data: any;

	$: console.log(data.body.message);
</script>

<h1>{data.body.message}</h1>
