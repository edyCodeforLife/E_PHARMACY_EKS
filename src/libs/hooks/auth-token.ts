
import { destroyCookie, parseCookies, setCookie } from 'nookies';

import { COOKIES_NAME } from '../variables';

export const getToken = (ctx: any): string | null => {
	const c = parseCookies(ctx, { path: '/' });

	return c[COOKIES_NAME];
};

export const setToken = (ctx: any, token: string, _expired?: Date): void => {
	if (!token) return;

	setCookie(ctx, COOKIES_NAME, 'fromClient', { path: '/' });
};

export const removeToken = (ctx: any): void => {
	try {
		destroyCookie(ctx, COOKIES_NAME, { path: '/' });
	} catch (e) {
		console.log(e);
	}
};
