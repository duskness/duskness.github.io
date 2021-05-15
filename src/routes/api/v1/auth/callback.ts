import endpoint from '$lib/server/endpoint';

export const post = endpoint().handle<{access_token: string}>( async ({ body }) => {
	console.log('body :>> ', body, typeof body);
	const access_token = body.access_token;
	const expires_in = 60 * 60 * 8;
	if (access_token) {
        const expires = new Date(Date.now() + expires_in * 1000);
        return {
            status: 204,
            headers: {
                'set-cookie': `sb:token=${access_token}; HttpOnly; Path=/; Expires=${expires.toUTCString()}; SameSite=lax; Secure`,
            }
        }
	}

	return {
		status: 400
	};
});

export const del = endpoint().handle(() => {
	return {
		status: 204,
		headers: {
			'set-cookie': 'sb:token=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/',
		}
	}
})
