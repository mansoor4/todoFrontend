import axios from '../axios';
import AuthResponse from '../types/auth/AuthResponse';

const refreshToken = (): Promise<boolean> => new Promise<boolean>((resolve, reject) => {
	const userId = localStorage.getItem('userId');
	axios.post<AuthResponse>('/auth/refreshToken', { userId })
		.then((response) => {
			const { data: { token } } = response;
			axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` };
			return resolve(true);
		})
		.catch((err) => reject(err));

});

export default refreshToken;