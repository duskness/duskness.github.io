import type { Locals as ILocals } from './types';
import type { RequestHandler, Request as ServerRequest, EndpointOutput } from '@sveltejs/kit';

export function formdata(request: Request, next: Next): Response {
	const { body, headers } = request;
	const content_type = (headers['content-type'] ?? '').toLowerCase();
	if (
		(content_type !== 'application/x-www-form-urlencoded' &&
			content_type !== 'multipart/form-data') ||
		body.constructor.name != 'ReadOnlyFormData'
	) {
		return next({
			status: 400,
			body: 'InvalidRequest'
		});
	}
	return next();
}

function requireLoggedIn(req: Request, next: Next): Response {
	const token = req.headers.authorization?.substring(7);
	// const { data: user, error } = await supabase.auth.api.getUser(token);
	const error = false;
	if (error) {
		return { status: 403 };
	}

	return next();
}

export type Request<Body = unknown> = ServerRequest<ILocals, Body>;
export type Response = void | EndpointOutput | Promise<EndpointOutput>;
export type Next = (err?: Response) => Response;
export type Middleware = (request: Request, next: Next) => Response;
export type Handler<Body = unknown> = RequestHandler<ILocals, Body>;
export type ErrorHandler = (Response, next: Next) => Response;

class EndpointBuilder {
	private _middlewares: Middleware[] = [];

	use(...middlewares: Middleware[]): EndpointBuilder {
		this._middlewares.push(...middlewares);
		return this;
	}

	authenticated(): EndpointBuilder {
		return this.use(requireLoggedIn);
	}

	guard_formdata(): EndpointBuilder {
		return this.use(formdata);
	}


	handle<Body = unknown>(handler: Handler<Body>): Handler<Body> {
		return (req: Request<Body>) => {
			const arr = this._middlewares;
			let res: Response;

			// Exit if only a single function
			const len = arr.length;
			if (len === 0) return handler(req);
			let i = 0;
			// Otherwise loop thru all middleware
			let finished = false;
			const next = (err?: Response) => {
				if (err) {
					res = err;
					finished = true;
				}
				return loop();
			};
			const loop = () => {
				if (finished) {
					return res;
				}
				if (i < len) {
					res = arr[i++](req, next);
				} else {
					return handler(req);
				}
				return res;
			};
			return loop(); // init
		};
	}

	static create(): EndpointBuilder {
		return new EndpointBuilder();
	}
}

export default EndpointBuilder.create;
