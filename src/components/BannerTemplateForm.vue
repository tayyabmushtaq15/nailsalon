<script setup>
import { reactive, watch } from "vue";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";

const props = defineProps({
	initialData: {
		type: Object,
		default: () => ({})
	},
	isBackButton: {
		type: Boolean,
		default: true
	},
	ButtonText: {
		type: String,
		default: "Save"
	}
});

const emit = defineEmits(["submit", "back"]);

const form = reactive({
	service_provider_id: "",
	image1: "",
	status: "active"
});

watch(
	() => props.initialData,
	(newVal) => {
		if (newVal) {
			Object.assign(form, {
				service_provider_id: newVal.service_provider_id || "",
				image1: newVal.images?.image1 || "",
				status: newVal.status?.toLowerCase() || "active"
			});
		}
	},
	{ immediate: true, deep: true }
);

function handleSubmit() {
	const payload = {
		service_provider_id: form.service_provider_id,
		images: { image1: form.image1 },
		status: form.status
	};
	emit("submit", payload);
}

const statusOptions = [
	{ label: "Active", value: "active" },
	{ label: "Inactive", value: "inactive" }
];
</script>

<template>
	<h2 class="text-xl font-semibold mb-4">Banner Template Form</h2>

	<div class="p-4 grid gap-4 border border-gray-300 rounded-md">
		<!-- Service Provider ID -->
		<div>
			<label for="service_provider_id">Service Provider ID</label>
			<InputText
				id="service_provider_id"
				v-model="form.service_provider_id"
				placeholder="Enter provider ID"
				class="w-full"
			/>
		</div>

		<!-- Image 1 -->
		<div>
			<label for="image1">Image</label>
			<InputText
				id="image1"
				v-model="form.image1"
				placeholder="Enter image URL or path"
				class="w-full"
			/>
		</div>

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
				:label="ButtonText"
				icon="pi pi-check"
				@click="handleSubmit"
				class="!bg-primary !text-white rounded-md px-4 py-2 ml-auto"
			/>
		</div>
	</div>
</template>
