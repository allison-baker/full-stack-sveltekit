<script lang="ts">
	import { theme } from '$lib/stores/theme.ts';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';

	let modalStore = getModalStore();

	const handleSignOut = async () => {
		const modal: ModalSettings = {
			type: 'confirm',
			title: 'Signing Out',
			body: 'Do you really want to leave? Come back again soon!',
			response: (r: boolean) => {
				if (r) {
					signOut();
					goto('/');
				}
			}
		};
		modalStore.trigger(modal);
	};

	const popupCombobox: PopupSettings = {
		event: 'focus-click',
		target: 'popupCombobox',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};
</script>

<section class="flex gap-4 items-center" style="view-transition-name: themeMenuBar">
	<LightSwitch on:click />

	<div>
		<button class="btn variant-filled-tertiary w-56 justify-between" use:popup={popupCombobox}>
			<span class="capitalize">{$theme ?? 'Theme'}</span>
			<span>↓</span>
		</button>

		<div class="card w-56 shadow-xl py-2" data-popup="popupCombobox">
			<ListBox rounded="rounded-none">
				<ListBoxItem bind:group={$theme} name="medium" value="my-custom-theme"
					>Custom Theme</ListBoxItem
				>
				<ListBoxItem bind:group={$theme} name="medium" value="skeleton">Skeleton</ListBoxItem>
				<ListBoxItem bind:group={$theme} name="medium" value="modern">Modern</ListBoxItem>
				<ListBoxItem bind:group={$theme} name="medium" value="hamlindigo"
					>Hamlindigo</ListBoxItem
				>
				<ListBoxItem bind:group={$theme} name="medium" value="rocket">Rocket</ListBoxItem>
				<ListBoxItem bind:group={$theme} name="medium" value="sahara">Sahara</ListBoxItem>
				<ListBoxItem bind:group={$theme} name="medium" value="gold-nouveau">Gold Nouveau</ListBoxItem>
				<ListBoxItem bind:group={$theme} name="medium" value="vintage">Vintage</ListBoxItem>
				<ListBoxItem bind:group={$theme} name="medium" value="seafoam">Seafoam</ListBoxItem>
			</ListBox>
			<div class="arrow bg-surface-100-800-token" />
		</div>
	</div>

	<Avatar
		src={$page.data.session?.user?.image ?? ''}
		width="w-12"
		rounded="rounded-full"
		cursor="cursor-pointer"
		border="border-2 border-surface-300-600-token hover:border-primary-300-600-token"
		on:click={handleSignOut}
	/>
</section>
