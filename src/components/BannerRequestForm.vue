<script setup>
import { reactive, watch } from "vue";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";

const props = defineProps({
	initialData: { type: Object, default: () => ({}) },
	isBackButton: { type: Boolean, default: true },
	ButtonText: { type: String, default: "Save" },
	businesses: { type: Array, default: () => [] },
	templates: { type: Array, default: () => [] }
});
const emit = defineEmits(["submit", "back"]);

const form = reactive({
	business_id: "",
	template_id: "",
	transaction_id: "",
	contact: "",
	first_name: "",
	last_name: "",
	status: "PENDING"
});

watch(
	() => props.initialData,
	(newVal) => {
		if (newVal) {
			form.business_id = newVal.business_id ?? "";
			form.template_id = newVal.template_id ?? "";
			form.transaction_id = newVal.transaction_id ?? "";
			form.contact = newVal.data?.custom_field?.contact ?? "";
			form.first_name = newVal.data?.custom_field?.first_name ?? "";
			form.last_name = newVal.data?.custom_field?.last_name ?? "";
			form.status = (newVal.status ?? "PENDING").toUpperCase();
		}
	},
	{ immediate: true }
);

function handleSubmit() {
	emit("submit", {
		business_id: form.business_id,
		template_id: form.template_id,
		transaction_id: form.transaction_id,
		data: {
			custom_field: {
				contact: form.contact,
				first_name: form.first_name,
				last_name: form.last_name
			}
		},
		status: (form.status ?? "PENDING").toUpperCase()
	});
}

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
</script>

<template>
	<div class="p-4 grid gap-4 border border-gray-300 rounded-md">
		<!-- Business Dropdown -->
		<div>
			<label for="business_id">Business</label>
			<Dropdown
				id="business_id"
				v-model="form.business_id"
				:options="props.businesses"
				optionLabel="label"
				optionValue="value"
				placeholder="Select business"
				class="w-full"
				filter
				showClear
			/>
		</div>

		<!-- Template Dropdown -->
		<div>
			<label for="template_id">Template</label>
			<Dropdown
				id="template_id"
				v-model="form.template_id"
				:options="props.templates"
				optionLabel="label"
				optionValue="value"
				placeholder="Select template"
				class="w-full"
				filter
				showClear
			/>
		</div>

		<!-- Other fields... -->

		<!-- Status -->
		<div>
			<label for="status">Status</label>
			<Dropdown
				id="status"
				v-model="form.status"
				:options="statusOptions"
				optionLabel="label"
				optionValue="value"
				placeholder="Select status"
				class="w-full"
			/>
		</div>

		<!-- Buttons -->
		<div class="flex justify-between mt-4">
			<Button
				v-if="isBackButton"
				label="Back"
				icon="pi pi-arrow-left"
				class="!bg-gray-400 !text-white rounded-md px-4 py-2"
				@click="emit('back')"
			/>
			<Button
				:label="ButtonText"
				icon="pi pi-check"
				@click="handleSubmit"
				class="!bg-primary !text-white rounded-md px-4 py-2 ml-auto"
			/>
		</div>
	</div>
</template>
