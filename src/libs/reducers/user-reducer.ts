export const USER_ACTIONS = {
	CHANGE_USER: 'CHANGE_USER',
	CHANGE_CHECKOUT: 'CHANGE_CHECKOUT',
	CHANGE_NOTES: 'CHANGE_NOTES',
	CHANGE_LOCATION: 'CHANGE_LOCATION',
	CHANGE_FORM_ADDRESS: 'CHANGE_FORM_ADDRESS'
};

export interface IUserState {
	user: any;
	checkout_data: any;
    notes_checkout: string;
	location_user: any;
	form_insert_address: any;
}

export interface IUserAction {
	type: 
	| 'CHANGE_USER'
	| 'CHANGE_CHECKOUT'
	| 'CHANGE_NOTES'
	| 'CHANGE_LOCATION'
	| 'CHANGE_FORM_ADDRESS'
	data: IUserState;
}

export const userReducer = (state: IUserState, action: IUserAction): IUserState => {
	switch (action.type) {
		case USER_ACTIONS.CHANGE_USER:
			return {
				...state,
				user: action.data.user
			};
		case USER_ACTIONS.CHANGE_CHECKOUT:
			return {
				...state,
				checkout_data: action.data
			};
		case USER_ACTIONS.CHANGE_NOTES:
			return {
				...state,
				notes_checkout: action.data.notes_checkout
			};
		case USER_ACTIONS.CHANGE_LOCATION:
			return {
				...state,
				location_user: action.data
			};
		case USER_ACTIONS.CHANGE_FORM_ADDRESS:
			return {
				...state,
				form_insert_address: action.data
			};
		default:
			return state;
	}
};
