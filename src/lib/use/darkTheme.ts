import { Writable, writable } from 'svelte/store';
import { browser } from "$app/env";

function useDarkTheme(): Writable<boolean> {
    let theme = window.localStorage.getItem("theme");

    if(!theme) {
        theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : '';
    }
    const isDarkActive = theme === "dark";
    return writable(isDarkActive)
}


export const darkMode = browser ? useDarkTheme() : writable(false);

export const darkToggle = {
    subscribe: darkMode.subscribe,
    toggle: ():void => darkMode.update((value) => !value)
}