import { defineStore } from "pinia";

export const useSubscriptionStore = defineStore("subscriptionStore", {
	state: () => ({
		subscriptions: []
	}),
	actions: {
		setSubscriptions(data) {
			this.subscriptions = data;
		},
		addSubscription(subscription) {
			this.subscriptions.push(subscription);
		},
		deleteSubscription(id) {
			this.subscriptions = this.subscriptions.filter((sub) => sub.id !== id);
		}
	}
});
