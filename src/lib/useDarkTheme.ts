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

const darkMode = browser ? useDarkTheme() : writable(false)

export default  darkMode;