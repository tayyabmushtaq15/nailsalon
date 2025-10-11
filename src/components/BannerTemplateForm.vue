<script setup>
import { reactive, watch, ref, onMounted } from "vue";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import UploadImageModal from "./UploadImageModal.vue";
import CustomFormBuilder from "./CustomFormBuilder.vue";
import { useCustomFieldsStore } from "../stores/formBuilderStore";
import api from "../services/api"; // axios instance

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

const store = useCustomFieldsStore();
const uploadModalRef = ref(null);

const form = reactive({
	service_provider_id: "",
	images: { image1: {} }, // single key object with multiple URLs
	status: "active"
});

const printingProviders = ref([]);
const loadingProviders = ref(false);
const currentImageIndex = ref(1);

// ✅ Fetch printing service providers
async function fetchPrintingProviders() {
	try {
		loadingProviders.value = true;
		const { data } = await api.get("printing-service-providers/");
		if (data?.status && Array.isArray(data.data)) {
			printingProviders.value = data.data.map((p) => ({
				label: `${p.name} (${p.email})`,
				value: p.id
			}));
		}
	} catch (error) {
		console.error("Error fetching providers:", error);
	} finally {
		loadingProviders.value = false;
	}
}

onMounted(fetchPrintingProviders);

// ✅ Prefill data when editing
watch(
	() => props.initialData,
	(newVal) => {
		if (newVal) {
			Object.assign(form, {
				service_provider_id: newVal.service_provider_id || "",
				images: newVal.images || { image1: {} },
				status: newVal.status?.toLowerCase() || "active"
			});
			store.setFields(newVal.banner_custom_field?.custom_field || {});
		}
	},
	{ immediate: true, deep: true }
);
console.log(props.initialData.images);
function openUploadModal() {
	uploadModalRef.value?.open();
}

function handleImageUploaded({ objectKey }) {
	const urlKey =
		currentImageIndex.value === 1
			? "Image"
			: `Image_${currentImageIndex.value}`;
	form.images.image1[urlKey] = objectKey;
	currentImageIndex.value++;
}

function handleSubmit() {
	const payload = {
		service_provider_id: form.service_provider_id,
		images: form.images,
		status: form.status,
		banner_custom_field: {
			custom_field: store.fields
		}
	};
	emit("submit", payload);
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
		<div>
			<label
				for="service_provider_id"
				class="block mb-1 text-gray-700 dark:text-gray-300"
			>
				Select Printing Service Provider
			</label>

			<Dropdown
				id="service_provider_id"
				v-model="form.service_provider_id"
				:options="printingProviders"
				optionLabel="label"
				optionValue="value"
				:loading="loadingProviders"
				placeholder="Select a service provider"
				class="w-full"
				:disabled="loadingProviders"
			/>
		</div>

		<div>
			<div class="flex justify-between items-center">
				<label class="text-gray-700 dark:text-gray-300">Images</label>
				<Button
					icon="pi pi-upload"
					label="Upload New Image"
					class="!bg-primary !text-white px-3"
					@click="openUploadModal"
				/>
			</div>

			<div
				v-if="form.images?.image1 && Object.keys(form.images.image1).length"
				class="mt-3 space-y-2"
			>
				<div
					v-for="(url, key) in form.images.image1"
					:key="key"
					class="flex items-center gap-2 border p-2 rounded-md"
				>
					<p class="text-sm text-gray-700 dark:text-gray-300">
						{{ key }}: <span class="text-green-600">{{ url }}</span>
					</p>
				</div>
			</div>
		</div>

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

		<div>
			<CustomFormBuilder />
		</div>

		<div class="flex justify-between mt-4">
			<Button
				:label="ButtonText"
				icon="pi pi-check"
				@click="handleSubmit"
				class="!bg-primary !text-white rounded-md px-4 py-2 ml-auto hover:opacity-90"
			/>
		</div>
	</div>

	<UploadImageModal ref="uploadModalRef" @uploaded="handleImageUploaded" />
</template>
