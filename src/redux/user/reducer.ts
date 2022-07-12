import { AnyAction, Reducer } from 'redux';
import UserState from '../../types/user/UserState';
import * as actionTypes from './actionType';

const initialState: UserState = {
	user: {
		userId: '',
		firstName: '',
		lastName: '',
		address: '',
		contact: '',
		email: '',
		username: '',
	},
	profile: {
		name: '',
		fileName: '',
		url: '',
	},
};

const userReducer: Reducer<UserState, AnyAction> = (state = initialState, action) => {
	const { type } = action;
	const { payload} = action;
	const {user,profile}=payload || {};

	switch (type) {

	case actionTypes.USER:
		return {
			...state,
			user: user,
			profile: profile,
		};
	default:
		return state;
	}
};

export default userReducer;