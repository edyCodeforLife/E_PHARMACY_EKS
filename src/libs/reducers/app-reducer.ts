
export const APP_ACTIONS = {
	CHANGE_TOKEN: 'CHANGE_TOKEN',
	CHANGE_APP_STATUS: 'CHANGE_APP_STATUS',
	CHANGE_REALTIME_CONNECTION: 'CHANGE_REALTIME_CONNECTION',
};

export interface IAppState {
	appReady: boolean;
	isMobile?: boolean;
	token?: string;
	RTConnection?: any;
}

export interface IAppAction {
	type:
	| 'CHANGE_TOKEN'
	| 'CHANGE_APP_STATUS'
	| 'CHANGE_REALTIME_CONNECTION'
	data: IAppState;
}

export const appReducer = (state: IAppState, action: IAppAction): IAppState => {
	switch (action.type) {
		case APP_ACTIONS.CHANGE_TOKEN:
			return {
				...state,
				token: action.data.token
			};
		case APP_ACTIONS.CHANGE_APP_STATUS:
			return {
				...state,
				appReady: action.data.appReady
			};
		case APP_ACTIONS.CHANGE_REALTIME_CONNECTION:
			return {
				...state,
				RTConnection: action.data.RTConnection
			};
		default:
			return state;
	}
};
