<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { useBusinessUserStore } from "../../stores/businessUserStore";
import api from "../../services/api";
import { InputText } from "primevue";
import Button from "../../components/Button.vue";
import { useRoute } from "vue-router";
const route = useRoute();
const email = ref("");
const loading = ref(false);

const router = useRouter();
const toast = useToast();
const userStore = useBusinessUserStore();

const submitForm = async () => {
	if (!email.value) {
		toast.add({
			severity: "warn",
			summary: "Validation",
			detail: "Please enter an email",
			life: 3000
		});
		return;
	}

	try {
		loading.value = true;

		const res = await api.get(
			`/businesses/user?email=${encodeURIComponent(email.value)}`
		);
		userStore.setUserDetail(res.data.data.user_detail[0]);
		console.log("Full response:", res.data);
		router.push("/business/business-login/business-stepper");
	} catch (error) {
		console.error("API error:", error);
		router.push("/business/business-user-form");
		toast.add({
			severity: "error",
			summary: "Error",
			detail: error.response?.data?.message || "Failed to fetch user",
			life: 3000
		});
	} finally {
		loading.value = false;
	}
};
</script>

<template>
	<router-view />

	<div
		v-if="route.name !== 'BusinessStepper'"
		class="flex items-center justify-center mt-24"
	>
		<div
			class="bg-white shadow-md w-full max-w-md border border-collapse p-8 rounded-lg"
		>
			<h1 class="text-2xl font-bold mb-6 text-center">Enter Your Email</h1>

			<form @submit.prevent="submitForm" class="space-y-4">
				<span class="p-float-label w-full">
					<label for="email">Email</label>
					<InputText id="email" v-model="email" class="w-full" />
				</span>

				<Button
					label="Submit"
					:loading="loading"
					type="submit"
					class="w-full !bg-primary hover:*:border-primary hover:!text-white hover:!bg-secondary !text-white !border-white rounded-md px-4 py-2"
				/>
			</form>
		</div>
	</div>
</template>
