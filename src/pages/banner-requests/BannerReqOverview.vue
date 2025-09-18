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
const selectedRequest = ref(null);

const goToAddBannerReq = () => {
	router.push("/banner-req/add-banner-request");
};

const editTemplate = (template) => {
	router.push(`/banner-req/edit-banner-request/${template.id}`);
};

const openDeleteModal = (template) => {
	selectedRequest.value = template;
	showDeleteModal.value = true;
};

const cancelDelete = () => {
	selectedRequest.value = null;
};

const confirmDelete = async () => {
	if (!selectedRequest.value) return;

	try {
		await api.delete(`/banner-requests/${selectedRequest.value.id}`);

		// remove from local list
		templates.value = templates.value.filter(
			(t) => t.id !== selectedRequest.id
		);

		toast.add({
			severity: "success",
			summary: "Deleted",
			detail: "Banner template deleted successfully",
			life: 3000
		});
		fetchTemplates();
	} catch (err) {
		toast.add({
			severity: "error",
			summary: "Error",
			detail: err.response?.data?.message || "Failed to delete template",
			life: 4000
		});
	} finally {
		selectedRequest.value = null;
	}
};

const fetchTemplates = async () => {
	try {
		const res = await api.get("banner-requests/");
		const arr = res?.data?.items || [];
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

<template>
	<div class="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
		<!-- Header -->
		<div class="flex flex-row justify-between items-center mb-2">
			<h2 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
				Banner Requests
			</h2>
			<Button
				class="w-auto rounded-lg p-2 !bg-primary hover:!bg-secondary !text-white font-semibold text-md tracking-wide transition duration-300 !border !border-primary hover:!border-secondary dark:!border-white"
				@click="goToAddBannerReq"
			>
				+ Create New Banner Request
			</Button>
		</div>

		<!-- Loading -->
		<div
			v-if="loading"
			class="text-center py-10 text-gray-500 dark:text-gray-400"
		>
			<i class="pi pi-spin pi-spinner text-3xl mb-2"></i>
			<p class="text-lg">Loading requests...</p>
		</div>

		<!-- Empty -->
		<div
			v-else-if="templates.length === 0"
			class="text-center py-10 text-gray-500 dark:text-gray-400"
		>
			No banner requests found.
		</div>

		<!-- List -->
		<div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			<div
				v-for="request in templates"
				:key="request.id"
				class="flex flex-col justify-between rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-5 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 min-w-[280px] h-full hover:shadow-xl transition duration-300 ease-in-out"
			>
				<!-- Header -->
				<div class="border-b border-gray-200 dark:border-gray-700 pb-3 mb-3">
					<h3
						class="text-lg font-bold text-gray-800 dark:text-gray-100 truncate"
					>
						Business: {{ request.business?.name }}
					</h3>
					<p class="text-sm text-gray-500 dark:text-gray-400 truncate">
						Request ID: {{ request.id }}
					</p>
				</div>

				<!-- Body -->
				<div class="text-sm text-gray-700 dark:text-gray-300 space-y-2 flex-1">
					<p>
						<i class="pi pi-user text-gray-400 dark:text-gray-500 mr-1"></i>
						<span class="font-semibold">Contact:</span>
						{{ request.data?.custom_field?.first_name }}
						{{ request.data?.custom_field?.last_name }} ({{
							request.data?.custom_field?.contact
						}})
					</p>
					<p>
						<i class="pi pi-calendar text-gray-400 dark:text-gray-500 mr-1"></i>
						<span class="font-semibold">Created:</span>
						{{ formatDate(request.created_at) }}
					</p>
					<p>
						<i class="pi pi-image text-gray-400 dark:text-gray-500 mr-1"></i>
						<span class="font-semibold">Template ID:</span>
						{{ request.banner_template?.id }}
					</p>
				</div>

				<!-- Status -->
				<div class="mt-4 flex items-center justify-between">
					<Tag
						:value="request.status"
						:severity="
							request.status?.toLowerCase() === 'active'
								? 'success'
								: request.status?.toLowerCase() === 'pending'
									? 'warning'
									: 'danger'
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
						@click="editTemplate(request)"
					/>
					<Button
						label="Delete"
						icon="pi pi-trash"
						class="px-3 py-1 rounded-lg !bg-red-500 !text-white hover:!bg-red-600 transition !border !border-primary hover:!border-secondary dark:!border-white"
						@click="openDeleteModal(request)"
					/>
				</div>
			</div>
		</div>

		<!-- Confirmation Modal -->
		<ConfirmationModal
			:visible="showDeleteModal"
			title="Delete Banner Request"
			:message="`Are you sure you want to delete this request?`"
			@update:visible="showDeleteModal = $event"
			@confirm="confirmDelete"
			@cancel="cancelDelete"
		/>
	</div>
</template>
