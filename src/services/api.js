import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json"
	}
});

apiClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

export const api = {
	get: (path, config = {}) =>
		apiClient.get(path, config).then((res) => res.data),
	post: (path, body, config = {}) =>
		apiClient.post(path, body, config).then((res) => res.data),
	put: (path, body, config = {}) =>
		apiClient.put(path, body, config).then((res) => res.data),
	delete: (path, config = {}) =>
		apiClient.delete(path, config).then((res) => res.data)
};

export default api;
