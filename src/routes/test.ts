import endpoint from '$lib/server/endpoint';

export const get = endpoint()
	.use((req, next) => {
		console.log(1);
		return next();
	})
	.use((req, next) => {
		console.log(2);
		return next({body: "Error"});
	})
	.use((req, next) => {
		console.log(3);
		return next();
	})
	.handle((req) => {
		console.log('end');
		return {
			body: 'Hello world'
		};
	});
