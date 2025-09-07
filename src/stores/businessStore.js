import { defineStore } from "pinia";
import { api } from "../services/api"; // your helper

export const useBusinessStore = defineStore("business", {
	state: () => ({
		user: {
			email: "",
			password: "",
			first_name: "",
			last_name: "",
			role: "",
			image: "",
			country_code: "",
			phone: ""
		},
		business: {
			name: "",
			address: "",
			latitude: "",
			longitude: "",
			support_email: "",
			support_phone: "",
			status: "active"
		}
	}),
	actions: {
		setUser(data) {
			this.user = { ...this.user, ...data };
		},
		setBusiness(data) {
			this.business = { ...this.business, ...data };
		},
		async submitBusiness() {
			const payload = {
				user: this.user,
				business: this.business
			};
			return await api.post("/businesses", payload);
		}
	}
});
