<script setup>
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import ServiceProviderForm from "../../components/SPForm.vue"; // adjust path
import { api } from "../../services/api"; // your helper

const router = useRouter();
const toast = useToast();

async function handleSubmit(formData) {
	try {
		// 🔹 Call API
		await api.post("/printing-service-providers/", formData);

		toast.add({
			severity: "success",
			summary: "Success",
			detail: "Service Provider added successfully",
			life: 3000
		});

		// Redirect to listing page (adjust path if needed)
		router.push("/printing-service-providers");
	} catch (error) {
		toast.add({
			severity: "error",
			summary: "Error",
			detail: error.response?.data?.message || "Failed to add service provider",
			life: 4000
		});
	}
}

function handleBack() {
	router.back();
}
</script>

<template>
	<div class="mx-auto p-6">
		<h1 class="text-2xl font-bold mb-6">Add Service Provider</h1>

		<ServiceProviderForm
			:isBackButton="true"
			ButtonText="Save"
			@submit="handleSubmit"
			@back="handleBack"
		/>
	</div>
</template>
