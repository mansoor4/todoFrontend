/* eslint-disable no-async-promise-executor */
import { useState } from 'react';
import User from '../types/user/User';
import { useAppDispatch } from './useRedux';
import * as actionTypes from '../redux/user/actionType';
import axios from '../axios';
import UserResponse from '../types/user/UserResponse';
import { toast } from 'react-toastify';
import * as loadingActionTypes from '../redux/loading/actionType';

const useUpdateUser = () => {
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useAppDispatch();
	const updateUser = (userData: User, fileData: File | null) => new Promise<boolean>(async (resolve, reject) => {
		const { firstName, lastName, contact, address, email, username, password, removeProfile } = userData;
		try {
			setIsLoading(true);
			dispatch({ type: loadingActionTypes.LOADING_START });
			const formdata = new FormData();
			formdata.append('firstName', firstName!);
			formdata.append('lastName', lastName!);
			formdata.append('contact', contact!);
			formdata.append('address', address!);
			formdata.append('email', email!);
			formdata.append('username', username!);
			formdata.append('removeProfile', removeProfile! ? 'true' : 'false');
			formdata.append('password', password!);
			if (fileData) formdata.append('profile', fileData, fileData.name);

			const result = await axios.put<UserResponse>('/user/', formdata);
			const { data: { user, profile } } = result;
			setIsLoading(false);
			dispatch({ type: actionTypes.USER, payload: { user, profile } });
			dispatch({ type: loadingActionTypes.LOADING_END });
			toast.success('Update Successfully!');
			return resolve(true);

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setIsLoading(false);
			dispatch({ type: loadingActionTypes.LOADING_END });
			return reject(err);
		}
	});

	return {
		isLoading,
		updateUser
	};

};

export default useUpdateUser;

