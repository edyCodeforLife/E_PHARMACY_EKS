import { IAppState } from './reducers/app-reducer';
import { IUserState } from './reducers/user-reducer';
import getConfig from 'next/config';

const isMobile: boolean =
	getConfig().publicRuntimeConfig.isMobile === 'yes';

export const initialState: {
	user: IUserState;
	application: IAppState;
} = {
	user: {
		user: {},
		checkout_data: {},
		notes_checkout: '',
		location_user: {},
		form_insert_address: {}
	},
	application: {
		appReady: false,
		isMobile: isMobile,
		token: '',
		RTConnection: null
	}
};