<template>
	<div class="p-6 bg-gray-50 min-h-screen">
		<h2 class="text-2xl font-semibold mb-4">Add Banner Request</h2>

		<div class="bg-white p-6 rounded-lg shadow-md space-y-6">
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
					label="Save"
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
import { useRouter } from "vue-router";

const toast = useToast();
const router = useRouter();
const customFieldsStore = useCustomFieldsStore();

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
			res.data?.map((t, idx) => ({
				// you can change label here if you want something other than just ID
				label: `Template ${idx + 1} - ${t.id}`,
				value: t.id
			})) || [];
	} catch (err) {
		console.error("Failed to fetch templates", err);
	}
}

onMounted(() => {
	fetchBusinesses();
	fetchTemplates();
});

async function handleSubmit() {
	const payload = {
		business_id: form.business_id,
		template_id: form.template_id,
		transaction_id: form.transaction_id,
		data: {
			custom_field: customFieldsStore.fields
		},
		status: form.status.toUpperCase()
	};

	try {
		await api.post("/banner-requests/", payload);
		toast.add({
			severity: "success",
			summary: "Success",
			detail: "Banner request created successfully",
			life: 3000
		});
		router.push("/banner-req");
	} catch (err) {
		toast.add({
			severity: "error",
			summary: "Error",
			detail: err.response?.data?.message || "Failed to create request",
			life: 4000
		});
	}
}
</script>
