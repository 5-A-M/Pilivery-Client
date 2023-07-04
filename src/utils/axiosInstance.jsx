/* eslint-disable no-param-reassign */
import axios from 'axios';
import store from '../redux/store/store';

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 6000,
});

export default axiosInstance;

axiosInstance.interceptors.request.use((config) => {
	const { accessToken } = store.getState().user;

	config.headers.Authorization = accessToken;

	return config;
});
