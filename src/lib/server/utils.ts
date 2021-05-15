import cookie from 'cookie';
import type { CookieSerializeOptions } from 'cookie';
import { base } from '$app/paths';

export function parse_cookie_header(str: string): Record<string, string | undefined> {
	return cookie.parse(str);
}

const DEFAULT_COOKIE_SERIALIZE_OPTIONS: CookieSerializeOptions = {
	httpOnly: true,
	sameSite: 'lax',
	path: base
};

export function format_cookie(
	name: string,
	value: string,
	expire = -1,
	options?: Partial<CookieSerializeOptions>
): string {
	const expires = expire ? new Date(Date.now() + expire) : undefined;

	return cookie.serialize(name, value, {
		...DEFAULT_COOKIE_SERIALIZE_OPTIONS,
		...options,
		expires
	});
}
