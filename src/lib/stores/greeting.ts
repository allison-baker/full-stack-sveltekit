import { writable, derived } from 'svelte/store';

export const name = writable('Thor');

export const greeting = derived(name, ($name) => `Hello ${$name}! Are you learning lots about Svelte?`);
