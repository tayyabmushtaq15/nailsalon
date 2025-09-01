<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { api } from "../../services/api";
import { useUserStore } from "../../stores/userStore";
import UserForm from "../../components/UserForm.vue";

const route = useRoute();
const router = useRouter();
const toast = useToast();
const userStore = useUserStore();

const userId = route.params.id;
const editUserData = ref(null);

onMounted(async () => {
	if (userStore.users.length === 0) {
		await userStore.fetchUsers();
	}

	editUserData.value = userStore.users.find((u) => u.id === userId);

	if (!editUserData.value) {
		toast.add({
			severity: "error",
			summary: "Not Found",
			detail: "User not found",
			life: 3000
		});
		router.push("/users");
	}
});

async function handleUserSubmit(userData) {
	try {
		const response = await api.put(`/users/${userId}`, userData);

		toast.add({
			severity: "success",
			summary: "User Updated",
			detail: `${response.message || "User updated successfully"}`,
			life: 3000
		});

		await userStore.fetchUsers();

		router.push("/users");
	} catch (error) {
		console.error("Error updating user:", error);

		toast.add({
			severity: "error",
			summary: "Update Failed",
			detail: error.response?.data?.message || "Failed to update user",
			life: 3000
		});
	}
}
</script>

<template>
	<div class="p-6">
		<UserForm
			v-if="editUserData"
			title="Edit User"
			:isEditMode="true"
			:initialData="editUserData"
			@submit="handleUserSubmit"
		/>
	</div>
</template>
