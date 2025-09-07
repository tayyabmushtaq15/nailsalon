<script setup>
import { useRouter } from "vue-router";
import { api } from "../../services/api";
import { useToast } from "primevue/usetoast";
import CouponsForm from "../../components/CouponsForm.vue";

const router = useRouter();
const toast = useToast();

const handleSubmit = async (formData) => {
	try {
		const res = await api.post("/coupons/", {
			...formData,
			valid_till: formData.valid_till ? formData.valid_till.toISOString() : null
		});

		toast.add({
			severity: "success",
			summary: "Success",
			detail: res?.data?.message || "Coupon created successfully",
			life: 3000
		});

		router.push("/coupons");
	} catch (error) {
		toast.add({
			severity: "error",
			summary: "Error",
			detail: error.response?.data?.message || "Failed to create coupon",
			life: 3000
		});
	}
};
</script>

<template>
	<div class="p-6">
		<CouponsForm ButtonText="Create" @submit="handleSubmit" />
	</div>
</template>
