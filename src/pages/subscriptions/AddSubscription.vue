<script setup>
import { useRouter } from "vue-router";
import SubscriptionForm from "../../components/SubscriptionForm.vue";
import api from "../../services/api";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const router = useRouter();

const handleSubmit = async (payload) => {
	try {
		await api.post("/available/subscription", payload);
		toast.add({
			severity: "success",
			summary: "Success",
			detail: "Subscription added!",
			life: 3000
		});
		router.push("/subscriptions");
	} catch (error) {
		toast.add({
			severity: "error",
			summary: "Error",
			detail: error.response?.data?.message || "Failed to add subscription",
			life: 3000
		});
	}
};
</script>

<template>
	<div class="p-6">
		<SubscriptionForm @submit="handleSubmit" />
	</div>
</template>
