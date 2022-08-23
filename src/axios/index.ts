import axios, { AxiosError, AxiosResponse } from 'axios';
import refreshToken from '../utils/refreshToken';

const axiosInstance = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	withCredentials: true,
});

axiosInstance.interceptors.request.use((request) => {
	const { url } = request;
	const containAuth = url ? url.includes('auth') : false;
	const userId = localStorage.getItem('userId');

	if (!userId && !containAuth) throw new axios.Cancel('Session expired!');
	return request;
}, (error) => Promise.reject(error));

axiosInstance.interceptors.response.use((response: AxiosResponse) => response, async (error: AxiosError) => {
	const status = error.response ? error.response.status : null;

	if (status === 401) {
		await refreshToken();
		return axiosInstance.request(error.config);
	}
	return Promise.reject(error);
});

export default axiosInstance;