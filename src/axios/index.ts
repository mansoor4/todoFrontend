import axios, { AxiosError, AxiosResponse } from 'axios';

const axiosInstance = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	withCredentials: true,
});

axiosInstance.interceptors.response.use((response: AxiosResponse) => response, async (error: AxiosError) => {
	const status = error.response ? error.response.status : null;
	const userId = localStorage.getItem('userId');

	if (status === 401) {
		await axiosInstance.post('/auth/refreshToken', { userId });
		return axiosInstance.request(error.config);
	}
	return Promise.reject(error);
});

export default axiosInstance;