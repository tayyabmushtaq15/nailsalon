import axios from "axios";
import { useLoadingStore } from "../stores/loading";

const BASE_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json"
	}
});

// Request interceptor
apiClient.interceptors.request.use(
	(config) => {
		// 🔹 add token
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		// 🔹 show loader
		const loading = useLoadingStore();
		loading.start();

		return config;
	},
	(error) => {
		const loading = useLoadingStore();
		loading.stop();
		return Promise.reject(error);
	}
);

// Response interceptor
apiClient.interceptors.response.use(
	(response) => {
		const loading = useLoadingStore();
		loading.stop();
		return response;
	},
	(error) => {
		const loading = useLoadingStore();
		loading.stop();
		return Promise.reject(error);
	}
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

export default apiClient;
