<script setup>
import { ref, onMounted } from "vue";
import { useToast } from "primevue/usetoast";
import { api } from "../../services/api";
import { useRouter } from "vue-router";
import SPCard from "../../components/SPCard.vue";
import ConfirmationModal from "../../components/ConfirmationModal.vue";

const providers = ref([]);
const loading = ref(false);
const toast = useToast();
const router = useRouter();

const modalVisible = ref(false);
const selectedProvider = ref(null);

const goToAddProviders = () => {
	router.push(`/printing-service-providers/add-printingSP`);
};

const fetchProviders = async () => {
	try {
		loading.value = true;
		const res = await api.get("/printing-service-providers/");
		providers.value =
			res?.data?.map((p) => ({
				id: p.id,
				title: p.name,
				subtitle: p.email,
				contact: p.contact_no,
				address: p.address,
				status: p.status,
				banners: p.banner_templates_count,
				createdAt: new Date(p.created_at).toLocaleDateString()
			})) || [];
	} catch (err) {
		console.error("Error fetching printing service providers:", err);
		toast.add({
			severity: "error",
			summary: "Error",
			detail: "Failed to load providers",
			life: 4000
		});
	} finally {
		loading.value = false;
	}
};

onMounted(fetchProviders);

// 🟢 Handle Delete
const handleDelete = (provider) => {
	selectedProvider.value = provider;
	modalVisible.value = true;
};

const confirmDelete = async () => {
	if (!selectedProvider.value) return;
	try {
		await api.delete(
			`/printing-service-providers/${selectedProvider.value.id}`
		);
		toast.add({
			severity: "success",
			summary: "Deleted",
			detail: "Service provider deleted successfully",
			life: 3000
		});
		// refresh list
		await fetchProviders();
	} catch (err) {
		toast.add({
			severity: "error",
			summary: "Error",
			detail: "Failed to delete provider",
			life: 4000
		});
	}
};

// 🟢 Handle Edit
const handleEdit = (provider) => {
	router.push(`/printing-service-providers/edit-printingSP/${provider.id}`);
};
</script>

<template>
	<div class="printing-sp-overview p-4">
		<div class="flex flex-row justify-between items-center mb-2">
			<h2 class="text-xl font-semibold mb-4">Printing Service Providers</h2>
			<Button
				class="w-auto rounded-lg p-2 !bg-primary hover:!bg-secondary text-white font-semibold text-md tracking-wide transition duration-300"
				@click="goToAddProviders"
			>
				+ Add New Service Providers
			</Button>
		</div>

		<div v-if="loading" class="text-gray-500">Loading...</div>

		<div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			<SPCard
				v-for="provider in providers"
				:key="provider.id"
				:data="provider"
				:showActions="true"
				@delete="handleDelete"
				@edit="handleEdit"
			/>
		</div>

		<div v-if="!loading && providers.length === 0" class="text-gray-500">
			No printing service providers found.
		</div>

		<!-- Confirmation Modal -->
		<ConfirmationModal
			v-model:visible="modalVisible"
			title="Delete Service Provider"
			:message="`Are you sure you want to delete ${selectedProvider?.title}?`"
			@confirm="confirmDelete"
			@cancel="modalVisible = false"
		/>
	</div>
</template>
