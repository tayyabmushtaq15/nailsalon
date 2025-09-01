// src/stores/userStore.js
import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "../services/api";

export const useUserStore = defineStore("userStore", () => {
	const users = ref([]);
	const loading = ref(false);

	// Fetch users from API
	const fetchUsers = async () => {
		loading.value = true;
		try {
			const res = await api.get("/users/");
			users.value = res.data.users;
		} catch (error) {
			console.error("Failed to fetch users:", error);
		} finally {
			loading.value = false;
		}
	};

	// Delete user
	const deleteUser = async (id) => {
		try {
			await api.delete(`/users/${id}`);
			users.value = users.value.filter((u) => u.id !== id);
			return true;
		} catch (error) {
			console.error("Delete failed:", error);
			return false;
		}
	};

	return {
		users,
		loading,
		fetchUsers,
		deleteUser
	};
});
