import { defineStore } from "pinia";
import { api } from "../services/api.js";

export const useAuthStore = defineStore("auth", {
	state: () => ({
		token: localStorage.getItem("token") || null,
		user: JSON.parse(localStorage.getItem("user") || "null"),
		loading: false,
		error: null
	}),

	getters: {
		isAuthenticated: (s) => !!s.token
	},

	actions: {
		async login({ email, password }) {
			this.loading = true;
			this.error = null;
			try {
				const res = await api.post("/users/login", { email, password });
				const { token, user } = res.data;

				this.token = token;
				this.user = user;

				localStorage.setItem("token", this.token);
				localStorage.setItem("user", JSON.stringify(this.user));

				return true;
			} catch (e) {
				this.error = e.response?.data?.message || "Invalid credentials";
				return false;
			} finally {
				this.loading = false;
			}
		},

		logout() {
			this.token = null;
			this.user = null;
			localStorage.removeItem("token");
			localStorage.removeItem("user");
		}
	}
});
