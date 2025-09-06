import { defineStore } from "pinia";

export const useBusinessUserStore = defineStore("user", {
	state: () => ({
		userDetail: null
	}),
	actions: {
		setUserDetail(detail) {
			this.userDetail = detail;
		},
		clearUserDetail() {
			this.userDetail = null;
		}
	}
});
