<script setup>
import UserForm from "../../components/UserForm.vue";
import { useToast } from "primevue/usetoast";
import { api } from "../../services/api";
import { useRouter } from "vue-router";

const toast = useToast();
const router = useRouter();
async function handleUserSubmit(userData) {
	try {
		const response = await api.post("/users/register", userData);

		toast.add({
			severity: "success",
			summary: "User Added",
			detail: `${response.message}`,
			life: 3000
		});
		router.push("/users");

		console.log("User added successfully:", response);
	} catch (error) {
		console.error("Error adding user:", error);

		toast.add({
			severity: "error",
			summary: "Error",
			detail: error.response?.data?.message || "Failed to add user",
			life: 3000
		});
	}
}
</script>

<template>
	<div class="p-6">
		<UserForm
			title="Add New User"
			@submit="handleUserSubmit"
			:isEditMode="false"
		/>
	</div>
</template>
