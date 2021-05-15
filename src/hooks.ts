import cookie from 'cookie';
import { v4 as uuid } from '@lukeed/uuid';
import type { Handle, GetSession } from '@sveltejs/kit';
import supabase from '$lib/shared/supabase';
import type { Locals } from '$lib/server/types';

export const handle: Handle<Locals> = async ({ request, render }) => {
	const cookies = cookie.parse(request.headers.cookie || '');
	request.locals.userid = cookies.userid || uuid();

	request.locals.supabase = supabase;

	// TODO https://github.com/sveltejs/kit/issues/1046
	if (request.query.has('_method')) {
		request.method = request.query.get('_method').toUpperCase();
	}

	const response = await render(request);

	if (!cookies.userid) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		response.headers['set-cookie'] = `userid=${request.locals.userid}; Path=/; HttpOnly`;
	}

	return response;
};

export const getSession: GetSession<Locals> = async (req) => {
	const cookies = req.headers.cookie || '';
	const values: Record<string, string> = cookies.split(/; */).reduce((result, cur) => {
		const [key, ...value] = cur.split('=');
		return { ...result, [key]: decodeURIComponent(value.join('=')) };
	}, {});

	try {
		const token = values['sb:token'];
		// console.log(await supabase.auth.api.getUserByCookie(req));
		const { data } = await supabase.auth.api.getUser(token);

		return { user: data };
	} catch {
		return { user: null };
	}
};
