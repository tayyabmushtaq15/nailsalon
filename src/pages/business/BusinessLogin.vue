<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { useBusinessUserStore } from "../../stores/businessUserStore";
import api from "../../services/api";
import { InputText } from "primevue";
import Button from "../../components/Button.vue";

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

		console.log("Full response:", res.data);

		const user = res?.data?.data?.user_detail?.[0];

		if (res.status && user) {
			userStore.setUserDetail(user);
			router.push("business/business-home");
		} else {
			toast.add({
				severity: "error",
				summary: "Not Found",
				detail: "No user found with this email",
				life: 3000
			});
		}
	} catch (error) {
		console.error("API error:", error);
		toast.add({
			severity: "error",
			summary: "Error",
			detail: "Something went wrong",
			life: 3000
		});
	} finally {
		loading.value = false;
	}
};
</script>

<template>
	<div class="flex items-center justify-center mt-24">
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
