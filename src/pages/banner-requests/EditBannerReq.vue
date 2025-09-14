<template>
	<div class="p-6 bg-gray-50 min-h-screen">
		<h2 class="text-2xl font-semibold mb-4">Edit Banner Request</h2>

		<div class="bg-white p-6 rounded-lg shadow-md space-y-6" v-if="loaded">
			<div class="grid gap-4">
				<!-- Business Dropdown -->
				<div>
					<label>Business</label>
					<Dropdown
						v-model="form.business_id"
						:options="businessOptions"
						optionLabel="label"
						optionValue="value"
						placeholder="Select Business"
						class="w-full"
					/>
				</div>

				<!-- Template Dropdown -->
				<div>
					<label>Template</label>
					<Dropdown
						v-model="form.template_id"
						:options="templateOptions"
						optionLabel="label"
						optionValue="value"
						placeholder="Select Template"
						class="w-full"
					/>
				</div>

				<!-- Transaction ID -->
				<div>
					<label>Transaction ID</label>
					<InputText v-model="form.transaction_id" class="w-full" />
				</div>

				<!-- Status -->
				<div>
					<label>Status</label>
					<Dropdown
						v-model="form.status"
						:options="statusOptions"
						optionLabel="label"
						optionValue="value"
						class="w-full"
					/>
				</div>
			</div>

			<!-- Custom Form Builder -->
			<CustomFormBuilder />

			<!-- Submit -->
			<div class="flex justify-end">
				<Button
					label="Update"
					icon="pi pi-check"
					class="!bg-primary !text-white"
					@click="handleSubmit"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import CustomFormBuilder from "../../components/CustomFormBuilder.vue";
import { useCustomFieldsStore } from "../../stores/formBuilderStore";
import { api } from "../../services/api";
import { useToast } from "primevue/usetoast";
import { useRouter, useRoute } from "vue-router";

const toast = useToast();
const router = useRouter();
const route = useRoute();
const customFieldsStore = useCustomFieldsStore();

const loaded = ref(false);

const form = reactive({
	business_id: "",
	template_id: "",
	transaction_id: "",
	status: "PENDING"
});

const businessOptions = ref([]);
const templateOptions = ref([]);

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
			res.data?.map((t) => ({
				label: t.id, // if API has `name`, use that instead
				value: t.id
			})) || [];
	} catch (err) {
		console.error("Failed to fetch templates", err);
	}
}

onMounted(async () => {
	try {
		await Promise.all([fetchBusinesses(), fetchTemplates()]);

		const { id } = route.params;
		const { data } = await api.get(`/banner-requests/${id}`);

		// populate form
		form.business_id = data.business_id || "";
		form.template_id = data.template_id || "";
		form.transaction_id = data.transaction_id || "";
		form.status = data.status || "PENDING";

		// populate custom fields
		customFieldsStore.setFields(data.data?.custom_field || {});

		loaded.value = true;
	} catch (err) {
		toast.add({
			severity: "error",
			summary: "Error",
			detail: "Failed to load banner request",
			life: 4000
		});
	}
});

async function handleSubmit() {
	const { id } = route.params;

	const payload = {
		business_id: form.business_id,
		template_id: form.template_id,
		transaction_id: form.transaction_id,
		data: {
			custom_field: customFieldsStore.fields
		},
		status: form.status
	};

	try {
		await api.put(`/banner-requests/${id}`, payload);
		toast.add({
			severity: "success",
			summary: "Success",
			detail: "Banner request updated successfully",
			life: 3000
		});
		router.push("/banner-req");
	} catch (err) {
		toast.add({
			severity: "error",
			summary: "Error",
			detail: err.response?.data?.message || "Failed to update request",
			life: 4000
		});
	}
}
</script>
