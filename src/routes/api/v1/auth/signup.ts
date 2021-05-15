import type { Locals } from '$lib/server/types';
import type { RequestHandler } from '@sveltejs/kit';
import { guard_formdata } from '$lib/server/endpoint';

export const post: RequestHandler<Locals, FormData> = guard_formdata(async (request) => {
	const email = request.body.get('email');
	const password = request.body.get('password');

	const { user, session, error, data } = await request.locals.supabase.auth.signUp({
		email,
		password
	});

	if (error) {
		console.log(error);
		return {
			status: 303,
			headers: {
				location: '/auth/login?state=error'
			}
		};
	}
	console.log('user, session, data, url, provider :>> ', user, session, data);
	return {
		status: 303,
		headers: {
			location: '/'
		}
	};
});
