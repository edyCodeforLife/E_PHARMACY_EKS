
import '../styles/styles-root.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { AppProps } from 'next/app';
import { appReducer, IAppState } from '../libs/reducers/app-reducer';
import { IUserState, userReducer } from '../libs/reducers/user-reducer';
import { StateProvider } from '../libs/states';
import { initialState } from '../libs/initial-state';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../styles/theme';
import createEmotionCache from '../libs/createEmotionCache';
import '../interceptor.ts';

const clientSideEmotionCache = createEmotionCache();

interface myAppProps extends AppProps {
	emotionCache?: EmotionCache
}

function MyApp(props: myAppProps) {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
	const mainReducer = (
		{
			user,
			application,
		}: { user: IUserState; application: IAppState; },
		action: any
	) => ({
		user: userReducer(user, action),
		application: appReducer(application, action)
	});
	return (
		<StateProvider
			initialState={initialState}
			reducer={mainReducer}
		>
			<CacheProvider value={emotionCache}>
				<Head>
					<meta name="viewport" content="initial-scale=1, width=device-width" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Component {...pageProps} />
				</ThemeProvider>
			</CacheProvider>
		</StateProvider>
	)
}

export default MyApp
