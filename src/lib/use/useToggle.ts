import { Readable, Writable } from 'svelte/store';

interface UseToggle extends Readable<boolean> {
    toggle(): void
}

export function useToggle(value: boolean | Writable<boolean>): UseToggle {
    
}