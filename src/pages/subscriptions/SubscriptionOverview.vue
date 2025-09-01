<script setup>
import { ref, onMounted } from "vue";
import SubscriptionCard from "../../components/SubscriptionCard.vue";
import { api } from "../../services/api";
import { useRouter } from "vue-router";
import { useToast } from "primevue";
import { useSubscriptionStore } from "../../stores/subscriptionStores";
const subscriptions = ref([]);
const router = useRouter();
const toast = useToast();
const subscriptionStore = useSubscriptionStore();

onMounted(async () => {
	try {
		const data = await api.get("/available/subscription");
		subscriptions.value = data.data.subscriptions;
		subscriptionStore.setSubscriptions(data.data.subscriptions);
	} catch (err) {
		console.error("Error fetching subscriptions:", err);
	}
});
const goToAddSubscription = () => {
	router.push("/subscriptions/add-subscriptions");
};

const deleteSubscription = async (id) => {
	try {
		await api.delete(`/available/subscription/${id}`);
		subscriptions.value = subscriptions.value.filter((sub) => sub.id !== id);
		toast.add({
			severity: "success",
			summary: "Success",
			detail: "Subscription deleted successfully!",
			life: 3000
		});
	} catch (err) {
		toast.add({
			severity: "error",
			summary: "Error",
			detail: err?.response?.data?.message || "Failed to add subscription",
			life: 3000
		});
		console.error("Error deleting subscription:", err);
	}
};
const goToEditSubscription = (subscription) => {
	router.push(`/subscriptions/edit-subscriptions/${subscription.id}`);
};
</script>

<template>
	<div class="flex flex-row justify-between items-center mb-2">
		<p></p>
		<Button
			class="w-auto rounded-lg p-2 !bg-primary hover:!bg-secondary text-white font-semibold text-md tracking-wide transition duration-300"
			@click="goToAddSubscription"
		>
			+ Add New Subscription
		</Button>
	</div>

	<div class="flex flex-wrap justify-center gap-6 p-3 bg-gray-100 rounded-md">
		<SubscriptionCard
			v-for="sub in subscriptions"
			:id="sub.id"
			:title="sub.title"
			:tagline="sub.tagline"
			:price="sub.price"
			:duration="sub.duration_in_days"
			:features="[
				'Transaction Fee: ' + sub.transaction_fee,
				'Member Limit: ' + sub.member_limit
			]"
			:description="sub.description"
			:button-label="sub.price > 0 ? 'Subscribe' : 'Start Free'"
			@delete="deleteSubscription"
			@edit="goToEditSubscription(sub)"
		/>
	</div>
</template>
