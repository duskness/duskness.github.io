export interface ApiOptions {
	headers?: Record<string, string>;
}

type HttpMethod = 'post' | 'put' | 'patch' | 'delete' | 'get';

export const post = <Response = void, Body = unknown>(
	path: string,
	body?: Body,
	options?: ApiOptions
): Promise<Response> => send<Response>(path, 'post', body, options);
export const del = <Response = void, Body = unknown>(
	path: string,
	body?: Body,
	options?: ApiOptions
): Promise<Response> => send<Response>(path, 'delete', body, options);

async function send<Response, Body = unknown>(
	path: string,
	method: HttpMethod,
	body?: Body,
	options?: ApiOptions
): Promise<Response> {

	const res = await fetch(path, {
		method,
		body: body ? JSON.stringify(body) : undefined,
		...options,
		headers: {
			Accept: 'application/json',
			...options?.headers
		}
	});

	try {
		return res.json();
	} catch {
		return {} as Response;
	}
}
