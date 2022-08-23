import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import AuthResponse from '../types/auth/AuthResponse';
import errorHandler from '../utils/errorHandler';
import * as userActionTypes from '../redux/user/actionType';
import { useAppDispatch } from '../hooks/useRedux';
import { toast } from 'react-toastify';
import * as loadingActionTypes from '../redux/loading/actionType';

const useUserVerify = () => {
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const userVerify = async (code: string) => {
		try {
			setIsLoading(true);
			dispatch({ type: loadingActionTypes.LOADING_START });
			const result = await axios.post<AuthResponse>('/auth/verifyUser', { code });
			setIsLoading(false);
			const { data: { user, profile, userId, token } } = result;
			localStorage.setItem('userId', userId!);
			axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` };
			dispatch({ type: userActionTypes.USER, payload: { user, profile } });
			dispatch({ type: loadingActionTypes.LOADING_END });
			navigate('/');
			toast.success('Signin Successfull!');
		} catch (err) {
			setIsLoading(false);
			dispatch({ type: loadingActionTypes.LOADING_END });
			navigate('/signin');
			errorHandler(err);
		}
	};
	return {
		isLoading,
		userVerify
	};

};

export default useUserVerify;

