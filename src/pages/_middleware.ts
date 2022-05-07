
import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { PUBLIC_URL, COOKIES_NAME } from '../libs/variables';
import { removeToken } from '../libs/hooks/auth-token';

export function middleware(req: NextRequest, ev: NextFetchEvent) {
	const token = req.cookies?.[COOKIES_NAME];
	const { pathname } = req.nextUrl;
	const ENTRY_POINT: any = process.env.NEXT_PUBLIC_BASE_URL_ENTRYPOINT + 'user/profile/me';

	if (!token || token === undefined) {
		if (
			PUBLIC_URL.indexOf(pathname) < 0
		) {
			return NextResponse.redirect('/blankpage');
		}
	} else {
		fetch(ENTRY_POINT, {
			method: 'GET',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			},
			referrerPolicy: 'no-referrer',
		}).then((response) => {
			if (response.status === 200) {
				if (PUBLIC_URL.indexOf(pathname) === 1) {
					return NextResponse.redirect('/');
				}
			} else {
				if (response.status === 401) {
					removeToken({});
					setTimeout(() => {
						(() => {
							return NextResponse.redirect('/blankpage');
						})();
					}, 250);
				}

			}
		});
	}
}