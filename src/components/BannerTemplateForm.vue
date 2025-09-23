<script setup>
import { reactive, watch, ref } from "vue";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import UploadImageModal from "./UploadImageModal.vue"; // import modal

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

const uploadModalRef = ref(null);

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

function openUploadModal() {
	uploadModalRef.value?.open();
}

function handleImageUploaded({ objectKey }) {
	// Update form with uploaded image path (from S3 or wherever)
	form.image1 = objectKey;
}

const statusOptions = [
	{ label: "Active", value: "active" },
	{ label: "Inactive", value: "inactive" }
];
</script>

<template>
	<h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
		Banner Template Form
	</h2>

	<div
		class="p-4 grid gap-4 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 transition-colors duration-300"
	>
		<!-- Service Provider ID -->
		<div>
			<label
				for="service_provider_id"
				class="block mb-1 text-gray-700 dark:text-gray-300"
				>Service Provider ID</label
			>
			<InputText
				id="service_provider_id"
				v-model="form.service_provider_id"
				placeholder="Enter provider ID"
				class="w-full"
			/>
		</div>

		<!-- Image 1 -->
		<div>
			<label for="image1" class="block mb-1 text-gray-700 dark:text-gray-300"
				>Image</label
			>
			<div class="flex gap-2">
				<Button
					label="Upload"
					icon="pi pi-upload"
					@click="openUploadModal"
					class="!bg-primary !text-white px-3"
				/>
				<p v-if="form.image1" class="mt-2 text-sm text-green-600">
					Image uploaded: {{ form.image1 }}
				</p>
			</div>
		</div>

		<!-- Status -->
		<div>
			<label for="status" class="block mb-1 text-gray-700 dark:text-gray-300"
				>Status</label
			>
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
				class="!bg-primary !text-white rounded-md px-4 py-2 ml-auto hover:opacity-90"
			/>
		</div>
	</div>

	<!-- Upload Modal -->
	<UploadImageModal ref="uploadModalRef" @uploaded="handleImageUploaded" />
</template>
