<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import { useToast } from "primevue/usetoast";
import { api } from "../../services/api";
import BusinessForm from "../../components/BusinessForm.vue";
import ConfirmationModal from "../../components/ConfirmationModal.vue";

const route = useRoute();
const toast = useToast();
const router = useRouter();
const businessId = route.params.id;
const business = ref(null);
const loading = ref(false);
const showDeleteModal = ref(false);

async function fetchBusinessDetails() {
	try {
		loading.value = true;
		const res = await api.get(`/businesses/${businessId}`);
		business.value = res?.data || null;
	} catch (err) {
		toast.add({
			severity: "error",
			summary: "Error",
			detail: "Failed to load business details",
			life: 3000
		});
	} finally {
		loading.value = false;
	}
}

async function updateBusiness(payload) {
	try {
		await api.put(`/businesses/${businessId}`, payload);
		toast.add({
			severity: "success",
			summary: "Updated",
			detail: "Business updated successfully",
			life: 3000
		});
		// refresh data
		fetchBusinessDetails();
	} catch (err) {
		toast.add({
			severity: "error",
			summary: "Error",
			detail: "Failed to update business",
			life: 3000
		});
	}
}

onMounted(() => {
	fetchBusinessDetails();
});

const deleteBusiness = async (id) => {
	try {
		await api.delete(`/businesses/${id}`);
		toast.add({
			severity: "success",
			summary: "Deleted",
			detail: "Business deleted successfully",
			life: 3000
		});
		router.push("/business");
	} catch (err) {
		toast.add({
			severity: "error",
			summary: "Error",
			detail: "Failed to delete business",
			life: 3000
		});
	}
};
</script>

<template>
	<div class="p-4">
		<div class="flex flex-row justify-between items-center mb-2">
			<h2 class="text-xl font-semibold mb-4">
				Business Details - {{ business?.name || "Loading..." }}
			</h2>
			<Button
				class="w-auto rounded-lg p-2 !bg-red-600 hover:!bg-red-500 text-white font-semibold text-md tracking-wide transition duration-300"
				@click="showDeleteModal = true"
			>
				Delete Business
			</Button>
		</div>

		<TabView>
			<!-- Basic Details -->
			<TabPanel header="Basic Details">
				<div v-if="loading" class="py-6 text-center text-gray-500">
					Loading...
				</div>
				<div v-else-if="business">
					<BusinessForm
						:initialData="business"
						@submit="updateBusiness"
						:isBackButton="false"
						ButtonText="Save"
					/>
				</div>
				<p v-else class="text-center text-gray-500 py-6">No details found.</p>
			</TabPanel>

			<!-- Customer Details -->
			<TabPanel header="Customer Details">
				<p>Customer details content here...</p>
			</TabPanel>

			<!-- Subscription History -->
			<TabPanel header="Subscription History">
				<p>Subscription history content here...</p>
			</TabPanel>

			<!-- Transaction History -->
			<TabPanel header="Transaction History">
				<p>Transaction history content here...</p>
			</TabPanel>
		</TabView>
		<ConfirmationModal
			v-model:visible="showDeleteModal"
			title="Delete Business"
			:message="`Are you sure you want to delete ${business?.name}?`"
			@confirm="deleteBusiness(businessId)"
			@cancel="showDeleteModal = false"
		/>
	</div>
</template>
