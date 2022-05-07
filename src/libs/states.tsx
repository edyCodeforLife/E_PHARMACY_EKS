import { createContext, useContext, useReducer } from 'react';
import { IUserState } from './reducers/user-reducer';
import { IAppState } from './reducers/app-reducer';

interface IInitialState {
	user: IUserState;
	application: IAppState;
}

export const StateContext = createContext({});
export const StateProvider = (
	{ reducer, initialState, children }:
		{ reducer: any, initialState: IInitialState, children?: any }
) => {
	// need to handle ie
	if (process.browser) {
		if (window && window.navigator) {
			const ua = window.navigator.userAgent;
			const msie = ua.indexOf('MSIE ');
			if (msie > -1 && window.document) {
				var flexibility = require('flexibility');
				flexibility(window.document.documentElement);
			}
		}
	}

	return (
		<StateContext.Provider value={useReducer(reducer, initialState)}>
			{children}
		</StateContext.Provider>
	)
};

export const useGlobalState = (): any => useContext(StateContext);