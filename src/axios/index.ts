import axios from 'axios';
import getToken from '../utils/getToken';

const axiosInstance = axios.create({
	baseURL: 'https://todo-backend2022.herokuapp.com',
});

axiosInstance.interceptors.request.use(function (config) {
	const token = getToken();
	if (config.headers && token) config.headers.Authorization = token ? `Bearer ${token}` : '';
	return config;
});

export default axiosInstance;