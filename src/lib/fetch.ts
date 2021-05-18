interface JsonResponse<T> extends Response {
	parsedBody?: T;
}

export const fetch_json = async <T>(
	input: RequestInfo,
	init?: RequestInit
): Promise<JsonResponse<T>> => {
	const res: JsonResponse<T> = await fetch(input, init);

	try {
		res.parsedBody = await res.json();
	} catch (error) {
		/* */
	}
	if (!res.ok) {
		throw new Error(res.statusText);
	}
	return res;
};

export type FetchFn = typeof fetch;

export const useFetchCancelable = (fetchFn = fetch): { fetch: FetchFn; abort: () => void } => {
	const controller = new AbortController();
	const signal = controller.signal;

	const fetch: FetchFn = async (url, options) => {
		return await fetchFn(url, { ...options, signal });
	};

	const abort = controller.abort;

	return {
		fetch,
		abort
	};
};
