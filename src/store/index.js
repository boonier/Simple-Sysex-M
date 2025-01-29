import { writable } from "svelte/store";

export const SELECTED_TONE = writable(0);

export const inputPort = writable(0);
export const outputPort = writable(0);
