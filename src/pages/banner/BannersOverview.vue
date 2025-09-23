<template>
	<div
		class="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300"
	>
		<div class="flex flex-row justify-between items-center mb-2">
			<h2 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
				Banner Templates
			</h2>
			<Button
				class="w-auto rounded-lg p-2 !bg-primary hover:!bg-secondary !text-white font-semibold text-md tracking-wide transition duration-300 !border !border-primary hover:!border-secondary dark:!border-white"
				@click="goToAddBanners"
			>
				+ Add New Banner
			</Button>
		</div>

		<!-- Loading -->
		<div
			v-if="loading"
			class="text-center py-10 text-gray-500 dark:text-gray-400"
		>
			<i class="pi pi-spin pi-spinner text-3xl mb-2"></i>
			<p class="text-lg">Loading templates...</p>
		</div>

		<!-- No Data -->
		<div
			v-else-if="templates.length === 0"
			class="text-center py-10 text-gray-500 dark:text-gray-400"
		>
			No banner templates found.
		</div>

		<!-- Grid -->
		<div
			v-if="templates.length"
			class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
		>
			<div
				v-for="template in templates"
				:key="template.id"
				class="flex flex-col justify-between rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-5 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 min-w-[280px] h-full hover:shadow-xl transition duration-300 ease-in-out"
			>
				<!-- Header -->
				<div class="border-b border-gray-200 dark:border-gray-700 pb-3 mb-3">
					<h3
						class="text-lg font-bold text-gray-800 dark:text-gray-100 truncate"
					>
						Template ID
					</h3>
					<p class="text-sm text-gray-500 dark:text-gray-400 truncate">
						{{ template.id }}
					</p>
				</div>
				<div class="mb-3 flex flex-col items-center">
					<img
						:src="getImage(template.images?.image1)"
						alt="Banner Thumbnail"
						class="w-20 h-20 object-cover rounded-md border border-gray-200 dark:border-gray-700 shadow-sm"
						@error="onImageError($event)"
					/>
					<p
						class="mt-2 text-xs text-gray-500 dark:text-gray-400 truncate max-w-[120px]"
					>
						{{ getImageName(template.images?.image1) }}
					</p>
				</div>
				<!-- Body -->
				<div class="text-sm text-gray-700 dark:text-gray-300 space-y-2 flex-1">
					<p>
						<i class="pi pi-user text-gray-400 dark:text-gray-500 mr-1"></i>
						<span class="font-semibold">Service Provider:</span>
						{{ template.service_provider_id }}
					</p>
					<p>
						<i class="pi pi-calendar text-gray-400 dark:text-gray-500 mr-1"></i>
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
				<div
					class="flex gap-2 mt-5 justify-end border-t border-gray-200 dark:border-gray-700 pt-3"
				>
					<Button
						label="Edit"
						icon="pi pi-pencil"
						class="px-3 py-1 rounded-lg !bg-primary !text-white transition hover:!bg-secondary !border !border-primary hover:!border-secondary dark:!border-white"
						@click="editTemplate(template)"
					/>
					<Button
						label="Delete"
						icon="pi pi-trash"
						class="px-3 py-1 rounded-lg !bg-red-500 !text-white hover:!bg-red-600 transition !border !border-primary hover:!border-secondary dark:!border-white"
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
const placeholderImage = "https://via.placeholder.com/80x80?text=No+Img";

const getImage = (url) => {
	if (!url || !url.startsWith("http")) {
		return placeholderImage;
	}
	return url;
};

const getImageName = (url) => {
	if (!url) return "No image";

	try {
		const parts = url.split("/");
		let fileName = parts[parts.length - 1];

		fileName = fileName.split("__")[0];
		fileName = fileName.replace(/_[0-9a-f-]{8,}$/i, "");

		return fileName;
	} catch {
		return "Unknown";
	}
};

const onImageError = (e) => {
	e.target.src = placeholderImage;
};

onMounted(fetchTemplates);
</script>
