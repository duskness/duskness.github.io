import supabase from '$lib/shared/supabase';
import type { User } from '@supabase/supabase-js';
import { writable, get } from 'svelte/store';
import * as api from './api';
import { session } from '$app/stores';
import { browser } from '$app/env';
/**
 * Update the session client & server side.
 */
export async function updateSession(): Promise<void> {
	const sess = supabase.auth.session();
	const newUser = sess?.user;
	await api.post('/api/v1/auth/callback', { access_token: sess?.access_token }, {headers: {
		'Content-Type': 'application/json'
	}});
	userStore.set(newUser);
	session.set({ user: newUser });
}

/**
 * Destroy the session client & server side.
 */
async function destroySession() {
	await api.del('/api/v1/auth/callback');
	userStore.set(null);
	session.set({});
}
const userStore = writable(supabase.auth.user(), (set) => {
	const user: User | null = get(session).user;
	if (user) {
		set(user);
	}

	const cleanup = supabase.auth.onAuthStateChange((event, session) => {
		console.log('event, session :>> ', event, session);
		// eslint-disable-next-line no-debugger
		debugger;
		if (session) {
			updateSession();
		} else {
			destroySession();
		}
	});

	return () => {
		cleanup.data?.unsubscribe();
	};
});

async function signIn(provider: 'github') {
	await supabase.auth.signIn({ provider }, {
		redirectTo: location.origin + "/auth/callback111"
	});
}
async function signOut() {
	await supabase.auth.signOut();
}

export const useAuth = () => ({
	user: {
		subscribe: userStore.subscribe
	},
	signIn,
	signOut
});
