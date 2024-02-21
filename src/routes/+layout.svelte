<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import ThemeMenu from '$lib/navigation/ThemeMenu.svelte';
	import SideNav from '$lib/navigation/SideNav.svelte';
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import { browser } from '$app/environment';
	import { onNavigate } from '$app/navigation';
	import { Modal, getModalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	// let lightSrc = '/images/personal_logo225.png';
	// let darkSrc = '/images/personal_logo_transparent.png';
	// let imageSrc: string;

	let isDarkMode: boolean;
	$: if (browser) {
		isDarkMode = document.documentElement.classList.contains('dark');
		// if (isDarkMode) imageSrc = darkSrc;
		// else imageSrc = lightSrc;
	}

	initializeStores();

	const drawerStore = getDrawerStore();

	function drawerOpen(): void {
		drawerStore.open({});
	}
</script>

<Modal />

<Drawer width="w-56">
	<SideNav />
</Drawer>

<!-- App Shell -->
<AppShell slotSidebarLeft="bg-surface-500/5 w-0">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<div class="flex flex-row items-center" style="view-transition-name: name;">
					<button class="btn btn-sm mr-4" on:click={drawerOpen}>
						<span>
							<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
								<rect width="100" height="20" />
								<rect y="30" width="100" height="20" />
								<rect y="60" width="100" height="20" />
							</svg>
						</span>
					</button>
					<!-- <a href="/"
						><img src={imageSrc} height="60" width="60" alt="personal logo" class="mr-4" /></a
					> -->
					<a href="/"><strong class="text-3xl">Al Baker</strong></a>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<ThemeMenu on:click={() => (isDarkMode = !isDarkMode)} />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<SideNav />
	</svelte:fragment>
	<slot />
</AppShell>
