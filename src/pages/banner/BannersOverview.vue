<template>
	<div class="p-6 bg-gray-50 min-h-screen">
		<div class="flex flex-row justify-between items-center mb-2">
			<h2 class="text-2xl font-semibold mb-4">Banner Templates</h2>
			<Button
				class="w-auto rounded-lg p-2 !bg-primary hover:!bg-secondary text-white font-semibold text-md tracking-wide transition duration-300"
				@click="goToAddBanners"
			>
				+ Add New Banner
			</Button>
		</div>

		<div v-if="loading" class="text-center py-10 text-gray-500">
			<i class="pi pi-spin pi-spinner text-3xl mb-2"></i>
			<p class="text-lg">Loading templates...</p>
		</div>

		<div
			v-else-if="templates.length === 0"
			class="text-center py-10 text-gray-500"
		>
			No banner templates found.
		</div>

		<div
			v-if="templates.length"
			class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
		>
			<div
				v-for="template in templates"
				:key="template.id"
				class="flex flex-col justify-between rounded-2xl shadow-lg border border-gray-200 p-5 bg-gradient-to-br from-white to-gray-50 min-w-[280px] h-full hover:shadow-xl transition duration-300 ease-in-out"
			>
				<!-- Header -->
				<div class="border-b pb-3 mb-3">
					<h3 class="text-lg font-bold text-gray-800 truncate">Template ID</h3>
					<p class="text-sm text-gray-500 truncate">{{ template.id }}</p>
				</div>

				<!-- Body -->
				<div class="text-sm text-gray-700 space-y-2 flex-1">
					<p>
						<i class="pi pi-user text-gray-400 mr-1"></i>
						<span class="font-semibold">Service Provider:</span>
						{{ template.service_provider_id }}
					</p>
					<p>
						<i class="pi pi-calendar text-gray-400 mr-1"></i>
						<span class="font-semibold">Created:</span>
						{{ formatDate(template.created_at) }}
					</p>
				</div>

				<!-- Status -->
				<div class="mt-4 flex items-center justify-between">
					<Tag
						:value="template.status"
						:severity="
							template.status?.toLowerCase() === 'active' ? 'success' : 'danger'
						"
						class="px-3 py-1 text-xs font-semibold rounded-full"
					/>
				</div>

				<!-- Actions -->
				<div class="flex gap-2 mt-5 justify-end border-t pt-3">
					<Button
						label="Edit"
						icon="pi pi-pencil"
						class="px-3 py-1 rounded-lg !bg-primary !text-white transition hover:!bg-secondary"
						@click="editTemplate(template)"
					/>
					<Button
						label="Delete"
						icon="pi pi-trash"
						class="px-3 py-1 rounded-lg !bg-red-500 !text-white hover:!bg-red-600 transition"
						@click="openDeleteModal(template)"
					/>
				</div>
			</div>
		</div>

		<!-- Confirmation Modal -->
		<ConfirmationModal
			:visible="showDeleteModal"
			title="Delete Banner Template"
			:message="`Are you sure you want to delete this template?`"
			@update:visible="showDeleteModal = $event"
			@confirm="confirmDelete"
			@cancel="cancelDelete"
		/>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { api } from "../../services/api";
import { Button } from "primevue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import ConfirmationModal from "../../components/ConfirmationModal.vue";

const templates = ref([]);
const loading = ref(true);
const router = useRouter();
const toast = useToast();

const showDeleteModal = ref(false);
const selectedTemplate = ref(null);

const goToAddBanners = () => {
	router.push("/banners/add-banner-template");
};

const editTemplate = (template) => {
	router.push(`/banners/edit-banner-template/${template.id}`);
};

const openDeleteModal = (template) => {
	selectedTemplate.value = template;
	showDeleteModal.value = true;
};

const cancelDelete = () => {
	selectedTemplate.value = null;
};

const confirmDelete = async () => {
	if (!selectedTemplate.value) return;

	try {
		await api.delete(`/banner-templates/${selectedTemplate.value.id}`);

		// remove from local list
		templates.value = templates.value.filter(
			(t) => t.id !== selectedTemplate.value.id
		);

		toast.add({
			severity: "success",
			summary: "Deleted",
			detail: "Banner template deleted successfully",
			life: 3000
		});
	} catch (err) {
		toast.add({
			severity: "error",
			summary: "Error",
			detail: err.response?.data?.message || "Failed to delete template",
			life: 4000
		});
	} finally {
		selectedTemplate.value = null;
	}
};

const fetchTemplates = async () => {
	try {
		const res = await api.get("banner-templates/");
		const arr = Array.isArray(res?.data) ? res.data : [];
		templates.value = arr;
	} catch (err) {
		console.error("fetchTemplates error:", err);
	} finally {
		loading.value = false;
	}
};

const formatDate = (d) => (d ? new Date(d).toLocaleString() : "-");

onMounted(fetchTemplates);
</script>
