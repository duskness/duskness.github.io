import endpoint from '$lib/server/endpoint';

export const post = endpoint()
	.guard_formdata()
	.handle<FormData>(async (request) => {
		const email = request.body.get('email');
		const password = request.body.get('password');

		const { user, session, error, data, url, provider } = await request.locals.supabase.auth.signIn(
			{
				email,
				password
			}
		);

		if (error) {
			console.log(error);
			return {
				status: 303,
				headers: {
					location: '/auth/login?state=error'
				}
			};
		}
		console.log('user, session, data, url, provider :>> ', user, session, data, url, provider);
		return {
			status: 303,
			headers: {
				location: '/'
			}
		};
	});
