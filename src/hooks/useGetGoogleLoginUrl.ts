import { useState } from 'react';
import axios from '../axios';
import errorHandler from '../utils/errorHandler';
import { useAppDispatch } from './useRedux';
import * as loadingActionTypes from '../redux/loading/actionType';

const useGetGoogleLoginUrl = () => {
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useAppDispatch();

	const getGoogleLoginUrl = async () => {
		try {
			setIsLoading(true);
			dispatch({ type: loadingActionTypes.LOADING_START });
			const result = await axios.get<string>('/auth/getGoogleLoginUrl');
			const { data: url } = result;
			setIsLoading(false);
			dispatch({ type: loadingActionTypes.LOADING_END });
			window.location.href = url;
		} catch (err) {
			setIsLoading(false);
			dispatch({ type: loadingActionTypes.LOADING_END });
			errorHandler(err);
		}
	};
	return {
		isLoading,
		getGoogleLoginUrl
	};

};

export default useGetGoogleLoginUrl;

