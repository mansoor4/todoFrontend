import { AnyAction, Reducer } from 'redux';
import AuthState from '../../types/auth/AuthState';
import * as actionTypes from './actionType';

const initialState: AuthState = {
	isLoading: false,
};

const authReducer: Reducer<AuthState, AnyAction> = (state = initialState, action) => {
	const { type } = action;
	switch (type) {
	case actionTypes.SIGNIN_START:
		return {
			...state,
			isLoading: true,
		};

	case actionTypes.SIGNIN_FAILED:
		return {
			...state,
			isLoading: false,
		};

	case actionTypes.SIGNIN:
		return {
			...state,
			isLoading: false,
		};

	case actionTypes.SIGNUP_START:
		return {
			...state,
			isLoading: true,
		};

	case actionTypes.SIGNUP_FAILED:
		return {
			...state,
			isLoading: false,
		};

	case actionTypes.SIGNUP:
		return {
			...state,
			isLoading: false,
		};

	case actionTypes.LOGOUT_START:
		return {
			...state,
			isLoading: true,
		};

	case actionTypes.LOGOUT_FAILED:
		return {
			...state,
			isLoading: false,
		};

	case actionTypes.LOGOUT:
		return {
			...state,
			isLoading: false,
		};

	default:
		return state;
	}
};

export default authReducer;