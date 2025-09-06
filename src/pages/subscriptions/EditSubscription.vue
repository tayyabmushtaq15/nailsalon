<script setup>
import { useRouter, useRoute } from "vue-router";
import { useSubscriptionStore } from "../../stores/subscriptionStores";
import SubscriptionForm from "../../components/SubscriptionForm.vue";
import api from "../../services/api";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const router = useRouter();
const route = useRoute();

const subscriptionStore = useSubscriptionStore();

const { id } = route.params;
console.log("Editing subscription with UUID:", id);
const subscriptionData = subscriptionStore.subscriptions.find(
	(sub) => sub.id === id
);

const handleSubmit = async (payload) => {
	try {
		await api.put(`/available/subscription/${id}`, payload);
		toast.add({
			severity: "success",
			summary: "Success",
			detail: "Subscription updated!",
			life: 3000
		});
		router.push("/subscriptions");
	} catch (error) {
		toast.add({
			severity: "error",
			summary: "Error",
			detail: error.response?.data?.message || "Failed to update subscription",
			life: 3000
		});
	}
};
</script>

<template>
	<div class="p-2">
		<SubscriptionForm @submit="handleSubmit" :initialData="subscriptionData" />
	</div>
</template>
