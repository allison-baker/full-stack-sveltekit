import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

interface Planets {
    name: string;
    mass: string;
    radius: string;
    temperature: string;
    distance: string;
    period: string;
    image: string;
}

export const planetsStore: Writable<Planets[]> = writable([]);