/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavigateFunction } from 'react-router-dom';
import { Dispatch } from 'redux';
import { toast } from 'react-toastify';
import * as authActionTypes from './actionType';
import * as userActionTypes from '../user/actionType';
import * as loadingActionTypes from '../loading/actionType';
import axios from '../../axios';
import AuthResponse from '../../types/auth/AuthResponse';
import User from '../../types/user/User';
import errorHandler from '../../utils/errorHandler';


export const signin = (userData: User, navigate: NavigateFunction) => async (dispatch: Dispatch) => {
	try {
		dispatch({ type: authActionTypes.SIGNIN_START });
		dispatch({ type: loadingActionTypes.LOADING_START });

		const result = await axios.post<AuthResponse>('/auth/signin', userData);
		const { data: { user, profile, userId, token } } = result;
		localStorage.setItem('userId', userId!);
		axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` };
		dispatch({ type: authActionTypes.SIGNIN });
		dispatch({ type: userActionTypes.USER, payload: { user, profile } });
		dispatch({ type: loadingActionTypes.LOADING_END });
		navigate('/');
		toast.success('Signin Successfull!');

	} catch (err: any) {
		dispatch({ type: authActionTypes.SIGNIN_FAILED });
		dispatch({ type: loadingActionTypes.LOADING_END });
		errorHandler(err);
	}
};

export const signup = (userData: User, fileData: File | null, navigate: NavigateFunction) => async (dispatch: Dispatch) => {
	const { firstName, lastName, contact, address, email, username, password } = userData;
	try {
		dispatch({ type: authActionTypes.SIGNUP_START });
		dispatch({ type: loadingActionTypes.LOADING_START });
		const formdata = new FormData();
		formdata.append('firstName', firstName!);
		formdata.append('lastName', lastName!);
		formdata.append('contact', contact!);
		formdata.append('address', address!);
		formdata.append('email', email!);
		formdata.append('username', username!);
		formdata.append('password', password!);
		if (fileData) formdata.append('profile', fileData, fileData.name);

		await axios.post<AuthResponse>('/auth/signup', formdata);
		dispatch({ type: authActionTypes.SIGNUP });
		dispatch({ type: loadingActionTypes.LOADING_END });
		navigate('/signin');
		toast.success('Signup Successfull!');


	} catch (err: any) {
		dispatch({ type: authActionTypes.SIGNUP_FAILED });
		dispatch({ type: loadingActionTypes.LOADING_END });
		errorHandler(err);
	}
};

export const logout = (navigate: NavigateFunction) => async (dispatch: Dispatch) => {
	try {
		dispatch({ type: authActionTypes.LOGOUT_START });
		dispatch({ type: loadingActionTypes.LOADING_START });
		await axios.get<AuthResponse>('/auth/logout');
		dispatch({ type: authActionTypes.LOGOUT });
		dispatch({ type: loadingActionTypes.LOADING_END });
		localStorage.removeItem('userId');
		delete axios.defaults.headers.common['Authorization'];
		navigate('/signin');
		toast.success('Logout Successfull!');
	} catch (err) {
		dispatch({ type: authActionTypes.LOGOUT_FAILED });
		dispatch({ type: loadingActionTypes.LOADING_END });
		errorHandler(err);
	}
};