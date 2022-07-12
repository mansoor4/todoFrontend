import { useState } from 'react';
import { useAppDispatch } from './useRedux';
import * as actionTypes from '../redux/user/actionType';
import axios from '../axios';
import UserResponse from '../types/user/UserResponse';
import errorHandler from '../utils/errorHandler';
import getToken from '../utils/getToken';
import * as loadingActionTypes from '../redux/loading/actionType';


const useGetUser = () => {
	const token = getToken();
	const [isLoading, setIsLoading] = useState(token ? true : false);
	const dispatch = useAppDispatch();
	const getUser = async () => {
		try {
			setIsLoading(true);
			dispatch({ type: loadingActionTypes.LOADING_START });
			const result = await axios.get<UserResponse>('/user/');
			const { data: { user, profile } } = result;
			setIsLoading(false);
			dispatch({ type: actionTypes.USER, payload: { user, profile } });
			dispatch({ type: loadingActionTypes.LOADING_END });

		} catch (err) {
			setIsLoading(false);
			dispatch({ type: loadingActionTypes.LOADING_END });
			errorHandler(err);
		}
	};
	return {
		isLoading,
		getUser
	};

};

export default useGetUser;

