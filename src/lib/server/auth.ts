import { parse_cookie_header } from './utils';
export interface IAuthTokens {
	access_token?: string;
}
export function get_auth_tokens(cookie_header: string): IAuthTokens {
	const cookies = parse_cookie_header(cookie_header);

	return {
		access_token: cookies.access_token
	};
}
