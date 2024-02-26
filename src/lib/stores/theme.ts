import type { Writable } from 'svelte/store';
import { localStorageStore } from '@skeletonlabs/skeleton';
import { browser } from '$app/environment';

export const themeStore: Writable<string | null> = localStorageStore(
	'themeStore',
	browser ? document.body.dataset.theme ?? 'custom' : 'custom'
);

themeStore.subscribe((value) => {
	if (browser) {
		document.body.dataset.theme = value as string;
	}
});
