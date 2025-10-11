<template>
	<div class="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
		<h2 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
			Edit Banner Request
		</h2>

		<div
			class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-6 transition-colors"
		>
			<div class="grid gap-4">
				<!-- Business Dropdown -->
				<div>
					<label class="block mb-1 text-gray-700 dark:text-gray-300">
						Business
					</label>
					<Dropdown
						v-model="form.business_id"
						:options="businessOptions"
						optionLabel="label"
						optionValue="value"
						placeholder="Select Business"
						class="w-full"
						disabled
					/>
				</div>

				<!-- Template Dropdown -->
				<div>
					<label class="block mb-1 text-gray-700 dark:text-gray-300">
						Template
					</label>
					<Dropdown
						v-model="form.template_id"
						:options="templateOptions"
						optionLabel="label"
						optionValue="value"
						placeholder="Select Template"
						class="w-full"
						@change="handleTemplateSelect"
						disabled
					/>
				</div>

				<!-- Transaction ID -->
				<div>
					<label class="block mb-1 text-gray-700 dark:text-gray-300">
						Transaction ID
					</label>
					<InputText v-model="form.transaction_id" class="w-full" />
				</div>

				<!-- Status -->
				<div>
					<label class="block mb-1 text-gray-700 dark:text-gray-300">
						Status
					</label>
					<Dropdown
						v-model="form.status"
						:options="statusOptions"
						optionLabel="label"
						optionValue="value"
						class="w-full"
					/>
				</div>
			</div>

			<!-- Dynamic Custom Fields -->
			<DynamicCustomForm
				v-model="customFormData"
				:customFields="customFields"
			/>

			<!-- Submit -->
			<div class="flex justify-end">
				<Button
					label="Update"
					icon="pi pi-check"
					class="!bg-primary !text-white dark:!bg-blue-600 dark:hover:!bg-blue-500 transition-colors"
					@click="handleUpdate"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import DynamicCustomForm from "../../components/DynamicCustomForm.vue";
import { api } from "../../services/api";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const router = useRouter();
const route = useRoute();

const bannerRequestId = route.params.id;

const form = reactive({
	business_id: "",
	template_id: "",
	transaction_id: "",
	status: ""
});

const businessOptions = ref([]);
const templateOptions = ref([]);
const customFields = ref({});
const customFormData = ref({});

const statusOptions = [
	{ label: "PENDING", value: "PENDING" },
	{ label: "IN_PROGRESS", value: "IN_PROGRESS" },
	{ label: "COMPLETED", value: "COMPLETED" },
	{ label: "REJECTED", value: "REJECTED" },
	{ label: "CANCELLED", value: "CANCELLED" },
	{ label: "Free Banner", value: "Free Banner" },
	{ label: "Subscription", value: "Subscription" },
	{ label: "Banner", value: "Banner" }
];

// Fetch dropdown data
async function fetchBusinesses() {
	try {
		const res = await api.get("/businesses");
		businessOptions.value =
			res.data?.businesses?.map((b) => ({
				label: b.name,
				value: b.id
			})) || [];
	} catch (err) {
		console.error("Failed to fetch businesses", err);
	}
}

async function fetchTemplates() {
	try {
		const res = await api.get("/banner-templates/");
		templateOptions.value =
			res.data?.map((t, idx) => ({
				label: `Template ${idx + 1} - ${t.banner_id}`,
				value: t.banner_id
			})) || [];
	} catch (err) {
		console.error("Failed to fetch templates", err);
	}
}

// Fetch banner request details
async function fetchBannerRequest() {
	try {
		const res = await api.get(`/banner-requests/${bannerRequestId}`);
		const data = res.data;

		form.business_id = data.business_id || "";
		form.template_id = data.template_id || "";
		form.transaction_id = data.transaction_id || "";
		form.status = data.status || "PENDING";

		// ✅ Load template fields first
		if (data.template_id) {
			await handleTemplateSelect(); // Wait for customFields to populate
		}

		// ✅ Then set the form data (after fields exist)
		if (data.data?.custom_field) {
			customFormData.value = { ...data.data.custom_field };
		}

		console.log("✅ Loaded Custom Form Data:", customFormData.value);
	} catch (err) {
		console.error("Failed to fetch banner request", err);
		toast.add({
			severity: "error",
			summary: "Error",
			detail: "Failed to load banner request",
			life: 4000
		});
	}
}

// Fetch custom fields for selected template
async function handleTemplateSelect() {
	if (!form.template_id) return;
	try {
		const res = await api.get(`/banner-templates/${form.template_id}`);
		const data = res.data?.[0];
		customFields.value = data?.banner_custom_field?.custom_field || {};
	} catch (err) {
		console.error("Failed to fetch custom fields", err);
		toast.add({
			severity: "error",
			summary: "Error",
			detail: "Failed to load template fields",
			life: 3000
		});
	}
}

// Update request
async function handleUpdate() {
	const payload = {
		business_id: form.business_id,
		template_id: form.template_id,
		transaction_id: form.transaction_id,
		data: {
			custom_field: customFormData.value
		},
		status: form.status.toUpperCase()
	};

	try {
		await api.put(`/banner-requests/${bannerRequestId}`, payload);
		toast.add({
			severity: "success",
			summary: "Updated",
			detail: "Banner request updated successfully",
			life: 3000
		});
		router.push("/banner-req");
	} catch (err) {
		console.error("Failed to update banner request", err);
		toast.add({
			severity: "error",
			summary: "Error",
			detail: err.response?.data?.message || "Failed to update request",
			life: 4000
		});
	}
}

onMounted(async () => {
	await Promise.all([fetchBusinesses(), fetchTemplates()]);
	await fetchBannerRequest();
});
</script>
