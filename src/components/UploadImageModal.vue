<script setup>
import { ref } from "vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";
import axios from "axios";
import { api } from "../services/api";

const emit = defineEmits(["uploaded", "close"]);

const visible = ref(false);
const selectedFile = ref(null);
const previewUrl = ref(null);
const presignedUrl = ref(null);
const objectKey = ref(null);
const loading = ref(false); // ✅ loader state

const toast = useToast();

function open() {
	visible.value = true;
}

function close() {
	visible.value = false;
	selectedFile.value = null;
	previewUrl.value = null;
	presignedUrl.value = null;
	objectKey.value = null;
	loading.value = false;
	emit("close");
}

async function handleFile(file) {
	if (!file) return;

	selectedFile.value = file;
	previewUrl.value = URL.createObjectURL(file);

	try {
		const fileName = file.name;
		const contentType = file.type;

		const res = await api.get(
			`/upload/presigned_url?file=${encodeURIComponent(fileName)}&content_type=${encodeURIComponent(contentType)}`
		);

		if (res.status) {
			presignedUrl.value = res.data.presigned_url;
			objectKey.value = res.data.object_key;
			toast.add({
				severity: "success",
				summary: "Image Ready to be uploaded",
				detail: "Ready to upload",
				life: 3000
			});
		}
	} catch (err) {
		toast.add({
			severity: "error",
			summary: "Error",
			detail: "Failed to generate presigned URL",
			life: 3000
		});
	}
}

function handleFileChange(event) {
	handleFile(event.target.files[0]);
}

function handleDrop(e) {
	e.preventDefault();
	const file = e.dataTransfer.files[0];
	handleFile(file);
}

function handleDragOver(e) {
	e.preventDefault();
}

async function handleSave() {
	if (!presignedUrl.value || !selectedFile.value) return;

	loading.value = true; 
	try {
		await axios.put(presignedUrl.value, selectedFile.value, {
			headers: { "Content-Type": selectedFile.value.type }
		});

		toast.add({
			severity: "success",
			summary: "Upload Successful",
			detail: selectedFile.value.name,
			life: 3000
		});

		emit("uploaded", {
			objectKey: objectKey.value,
			fileName: selectedFile.value.name
		});

		close();
	} catch (err) {
		toast.add({
			severity: "error",
			summary: "Upload Failed",
			detail: err.message,
			life: 3000
		});
	} finally {
		loading.value = false; // ✅ stop loader
	}
}

defineExpose({ open });
</script>

<template>
	<Dialog
		v-model:visible="visible"
		header="Upload Image"
		modal
		:style="{ width: '32rem' }"
	>
		<div
			class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-400 transition"
			@drop="handleDrop"
			@dragover="handleDragOver"
			@click="$refs.fileInput.click()"
		>
			<input
				ref="fileInput"
				type="file"
				accept="image/*"
				class="hidden"
				@change="handleFileChange"
			/>

			<div v-if="!selectedFile" class="flex flex-col items-center space-y-2">
				<i class="pi pi-upload text-4xl text-gray-400"></i>
				<p class="text-gray-600 dark:text-gray-300">
					Drag & drop an image here or <span class="text-blue-500">browse</span>
				</p>
			</div>

			<div v-else class="flex flex-col items-center space-y-2">
				<img
					:src="previewUrl"
					alt="Preview"
					class="w-32 h-32 object-cover rounded-md shadow-md"
				/>
				<p class="text-sm font-medium text-gray-800 dark:text-gray-200">
					{{ selectedFile.name }}
				</p>
				<p class="text-xs text-gray-500">{{ selectedFile.type }}</p>
			</div>
		</div>

		<template #footer>
			<Button
				label="Cancel"
				class="!border !border-gray-300 !text-gray-700 !bg-transparent hover:!bg-primary hover:!text-white dark:!border-gray-600 dark:!text-gray-200 dark:hover:!bg-primary rounded-md px-4 py-2"
				@click="close"
			/>
			<Button
				v-if="selectedFile"
				class="w-full md:w-auto !bg-black !border hover:!border-primary hover:!text-primary hover:!bg-white !text-white !border-white dark:hover:!bg-white"
				label="Save"
				icon="pi pi-upload"
				@click="handleSave"
				:disabled="loading"
				:loading="loading"
			/>
		</template>
	</Dialog>
</template>
