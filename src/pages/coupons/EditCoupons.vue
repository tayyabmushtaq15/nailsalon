<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { api } from "../../services/api";
import { useToast } from "primevue/usetoast";
import CouponsForm from "../../components/CouponsForm.vue";

const route = useRoute();
const router = useRouter();
const toast = useToast();

const coupon = ref(null);
const loading = ref(true);

const fetchCoupon = async () => {
	try {
		const res = await api.get(`/coupons/${route.params.id}`);
		coupon.value = res.data;
	} catch (error) {
		toast.add({
			severity: "error",
			summary: "Error",
			detail: "Failed to load coupon",
			life: 3000
		});
	} finally {
		loading.value = false;
	}
};

const handleSubmit = async (formData) => {
	try {
		const res = await api.put(`/coupons/${route.params.id}`, {
			...formData,
			valid_till: formData.valid_till ? formData.valid_till.toISOString() : null
		});

		toast.add({
			severity: "success",
			summary: "Success",
			detail: res?.data?.message || "Coupon updated successfully",
			life: 3000
		});

		router.push("/coupons");
	} catch (error) {
		toast.add({
			severity: "error",
			summary: "Error",
			detail: error.response?.data?.message || "Failed to update coupon",
			life: 3000
		});
	}
};

onMounted(fetchCoupon);
</script>

<template>
	<div class="p-6">
		<h2 class="text-xl font-semibold mb-4">Edit Coupon</h2>

		<div v-if="loading" class="text-gray-500">Loading...</div>

		<div v-else-if="coupon">
			<CouponsForm
				:initialData="coupon"
				ButtonText="Update"
				:showBackButton="true"
				@submit="handleSubmit"
				@back="router.push('/coupons')"
			/>
		</div>
	</div>
</template>
