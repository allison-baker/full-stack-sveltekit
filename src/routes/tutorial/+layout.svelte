<script lang="ts">
	import '../../app.postcss';
	import { page } from '$app/stores';
	import { TabGroup, TabAnchor } from '@skeletonlabs/skeleton';

	let loggedIn = false;
	if ($page.data.session?.user) {
		loggedIn = true;
	} else {
		loggedIn = false;
	}
</script>

<div style="view-transition-name: topNavigation;" class="max-w-[1200px] mx-auto">
	<TabGroup
		border="border-b-2 border-primary-500-400-token"
		padding="p-4"
		rounded="rounded-none"
		hover="hover:variant-soft-primary"
		active="variant-soft-primary"
		justify="justify-center"
	>
		<TabAnchor href="/tutorial" selected={$page.url.pathname === '/tutorial'}
			>Introduction</TabAnchor
		>
		<TabAnchor href="/tutorial/reactivity" selected={$page.url.pathname === '/tutorial/reactivity'}
			>Reactivity</TabAnchor
		>
		<TabAnchor href="/tutorial/props" selected={$page.url.pathname === '/tutorial/props'}
			>Props</TabAnchor
		>
		<TabAnchor href="/tutorial/logic" selected={$page.url.pathname === '/tutorial/logic'}
			>Logic</TabAnchor
		>
		<TabAnchor href="/tutorial/events" selected={$page.url.pathname === '/tutorial/events'}
			>Events</TabAnchor
		>
		<TabAnchor href="/tutorial/bindings" selected={$page.url.pathname === '/tutorial/bindings'}
			>Bindings</TabAnchor
		>
		<TabAnchor href="/tutorial/lifecycle" selected={$page.url.pathname === '/tutorial/lifecycle'}
			>Lifecycle</TabAnchor
		>
		<TabAnchor href="/tutorial/stores" selected={$page.url.pathname === '/tutorial/stores'}
			>Stores</TabAnchor
		>
	</TabGroup>
</div>

<div class="max-w-[1200px] mx-auto">
	<slot />
</div>
