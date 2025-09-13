<script setup>
import { ref, onMounted } from "vue";
import { api } from "../../services/api";
import { useToast } from "primevue/usetoast";
import { Button } from "primevue";
import { useRouter } from "vue-router";
import ConfirmationModal from "../../components/ConfirmationModal.vue";

const coupons = ref([]);
const toast = useToast();
const router = useRouter();

const showDeleteModal = ref(false);
const selectedCouponId = ref(null);
const fetchCoupons = async () => {
	try {
		const res = await api.get("/coupons/all");
		coupons.value = res?.data?.coupons || [];
	} catch (error) {
		toast.add({
			severity: "error",
			summary: "Error",
			detail: "Failed to load coupons",
			life: 3000
		});
	}
};

const copyCode = (code) => {
	navigator.clipboard.writeText(code);
	toast.add({
		severity: "success",
		summary: "Copied!",
		detail: `Coupon code ${code} copied to clipboard`,
		life: 2000
	});
};

onMounted(fetchCoupons);
const goToAddCoupons = () => {
	router.push("/coupons/add-coupons");
};
const editCoupon = (id) => {
	router.push(`/coupons/edit-coupons/${id}`);
};
const deleteCoupon = (id) => {
	selectedCouponId.value = id;
	showDeleteModal.value = true;
};

const confirmDeleteCoupon = async () => {
	try {
		await api.delete(`/coupons/${selectedCouponId.value}`);
		toast.add({
			severity: "success",
			summary: "Deleted",
			detail: "Coupon deleted successfully",
			life: 3000
		});
		showDeleteModal.value = false;
		selectedCouponId.value = null;
		fetchCoupons();
	} catch (error) {
		toast.add({
			severity: "error",
			summary: "Error",
			detail: "Failed to delete coupon",
			life: 3000
		});
	}
};
</script>

<template>
	<div class="p-6">
		<div class="flex items-center justify-between mb-2">
			<h2 class="text-xl font-bold mb-6 text-gray-800">🎟 Available Coupons</h2>
			<Button
				class="w-auto rounded-lg p-2 !bg-primary hover:!bg-secondary text-white font-semibold text-md tracking-wide transition duration-300"
				@click="goToAddCoupons"
			>
				+ Add New Coupons
			</Button>
		</div>

		<!-- Grid Layout -->
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
			<div
				v-for="coupon in coupons"
				:key="coupon.id"
				class="relative bg-gradient-to-r from-indigo-50 to-blue-100 shadow-lg rounded-2xl overflow-hidden border-2 border-dashed border-indigo-400"
			>
				<!-- Cutout Edges -->
				<div
					class="absolute top-1/2 left-0 -translate-y-1/2 w-6 h-6 bg-white rounded-full border border-indigo-200"
				></div>
				<div
					class="absolute top-1/2 right-0 -translate-y-1/2 w-6 h-6 bg-white rounded-full border border-indigo-200"
				></div>

				<!-- Discount Section -->
				<div class="bg-indigo-600 text-white text-center py-6">
					<p class="text-4xl font-extrabold">
						{{
							coupon.discount_type === "fixed"
								? "$" + coupon.discount_value
								: coupon.discount_value + "%"
						}}
					</p>
					<p class="uppercase tracking-wide text-sm">OFF</p>
				</div>

				<!-- Details -->
				<div class="p-9 text-gray-700">
					<h3 class="text-xl font-bold text-indigo-700">
						{{ coupon.business?.name }}
					</h3>
					<p class="mt-1 text-sm">
						Valid till:
						<span class="font-medium">
							{{ new Date(coupon.valid_till).toLocaleDateString() }}
						</span>
					</p>
					<p class="text-gray-700">
						Discount Type:
						<span class="text-lg font-bold text-indigo-900">
							{{ coupon.discount_type || "N/A" }}</span
						>
					</p>
					<p class="mt-1 text-sm">
						Status:
						<span
							:class="
								coupon.status === 'ACTIVE'
									? 'text-green-600 font-bold'
									: 'text-red-500 font-bold'
							"
						>
							{{ coupon.status }}
						</span>
					</p>

					<!-- Coupon Code -->
					<div
						class="mt-4 flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg border border-dashed border-gray-400"
					>
						<span class="font-mono text-lg font-semibold text-gray-800">{{
							coupon.code
						}}</span>
						<Button
							icon="pi pi-copy"
							class="!p-2 !bg-indigo-500 !border-none hover:!bg-indigo-600"
							@click="copyCode(coupon.code)"
						/>
					</div>
					<div class="mt-4 flex gap-3">
						<Button
							label="Edit"
							icon="pi pi-pencil"
							class="w-full !bg-primary hover:!bg-secondary !border-none text-white"
							@click="editCoupon(coupon.id)"
						/>
						<Button
							label="Delete"
							icon="pi pi-trash"
							class="w-full !bg-red-500 hover:!bg-red-600 !border-none text-white"
							@click="deleteCoupon(coupon.id)"
						/>
					</div>
				</div>
			</div>
		</div>
		<ConfirmationModal
			v-model:visible="showDeleteModal"
			title="Delete Coupon"
			message="Are you sure you want to delete this coupon?"
			@confirm="confirmDeleteCoupon"
		/>
	</div>
</template>
