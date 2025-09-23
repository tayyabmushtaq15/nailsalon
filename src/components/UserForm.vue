<script setup>
import { reactive, ref } from "vue";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import { computed } from "vue";
import UploadImageModal from "./UploadImageModal.vue";

const props = defineProps({
	title: {
		type: String,
		default: "User Form"
	},
	buttonText: {
		type: String,
		default: "Save"
	},
	isEditMode: {
		type: Boolean,
		default: false
	},
	initialData: {
		type: Object,
		default: () => ({})
	}
});

const emit = defineEmits(["submit"]);

const form = reactive({
	email: props.initialData.email || "",
	password: props.initialData.password || "",
	first_name: props.initialData.first_name || "",
	last_name: props.initialData.last_name || "",
	role: props.initialData.role || "",
	image: props.initialData.image || "",
	country_code: props.initialData.country_code || "",
	phone: props.initialData.phone || "",
	status:
		props.initialData.status === "active"
			? "active"
			: props.initialData.status?.toLowerCase() === "inactive"
				? "inactive"
				: "active",
	status_reason: props.initialData.status_reason || ""
});

const roleOptions = [
	{ label: "Admin", value: "admin" },
	{ label: "Employee", value: "employee" },
	{ label: "Manager", value: "manager" }
];
const statusOptions = [
	{ label: "Active", value: "ACTIVE" },
	{ label: "Inactive", value: "inactive" }
];
const uploadModal = ref(null);
const isInactive = computed(() => form.status === "inactive");

function handleSubmit() {
	emit("submit", { ...form });
}
function handleImageUploaded({ objectKey }) {
	form.image = objectKey; // store the uploaded S3 key
}

function openUploadModal() {
	uploadModal.value?.open(); // ✅ call exposed method correctly
}
</script>

<template>
	<h2 class="text-xl font-semibold mb-4 !text-gray-900 dark:!text-gray-100">
		{{ title }}
	</h2>

	<div
		class="p-fluid grid gap-4 border-collapse border border-gray-300 dark:border-gray-600 rounded-md pl-4 pt-2 pb-2 pr-4 bg-white dark:bg-gray-800"
	>
		<!-- First + Last Name -->
		<div class="col-12 flex flex-wrap gap-4">
			<div class="flex-1 min-w-[200px]">
				<label
					for="first_name"
					class="block mb-1 text-gray-700 dark:text-gray-300"
					>First Name</label
				>
				<InputText
					id="first_name"
					v-model="form.first_name"
					placeholder="Enter first name"
					class="w-full !bg-white !text-gray-900 dark:!bg-gray-700 dark:!text-gray-100 dark:!placeholder-gray-400"
				/>
			</div>

			<div class="flex-1 min-w-[200px]">
				<label
					for="last_name"
					class="block mb-1 text-gray-700 dark:text-gray-300"
					>Last Name</label
				>
				<InputText
					id="last_name"
					v-model="form.last_name"
					placeholder="Enter last name"
					class="w-full !text-gray-900 !bg-white dark:!bg-gray-700 dark:!text-gray-100 dark:!placeholder-gray-400"
				/>
			</div>
		</div>

		<!-- Email + Password -->
		<div class="col-12 flex flex-wrap gap-4">
			<div class="flex-1 min-w-[200px]">
				<label for="email" class="block mb-1 text-gray-700 dark:text-gray-300"
					>Email</label
				>
				<InputText
					type="email"
					id="email"
					v-model="form.email"
					placeholder="Enter email"
					class="w-full !bg-white !text-gray-900 dark:!bg-gray-700 dark:!text-gray-100 dark:!placeholder-gray-400"
				/>
			</div>

			<div class="flex-1 min-w-[200px]">
				<label
					for="password"
					class="block mb-1 text-gray-700 dark:text-gray-300"
					>Password</label
				>
				<InputText
					type="password"
					id="password"
					v-model="form.password"
					feedback="false"
					placeholder="Enter password"
					class="w-full !bg-white !text-gray-900 dark:!bg-gray-700 dark:!text-gray-100 dark:!placeholder-gray-400"
				/>
			</div>
		</div>

		<!-- Country Code + Phone -->
		<div class="col-12 flex flex-wrap gap-4">
			<div class="w-full md:w-3/12">
				<label
					for="country_code"
					class="block mb-1 text-gray-700 dark:text-gray-300"
					>Country Code</label
				>
				<InputText
					id="country_code"
					v-model="form.country_code"
					placeholder="+1"
					class="w-full !bg-white !text-gray-900 dark:!bg-gray-700 dark:!text-gray-100 dark:!placeholder-gray-400"
				/>
			</div>

			<div class="w-full md:flex-1">
				<label for="phone" class="block mb-1 text-gray-700 dark:text-gray-300"
					>Phone</label
				>
				<InputText
					type="number"
					id="phone"
					v-model="form.phone"
					placeholder="Enter phone number"
					class="w-full !bg-white !text-gray-900 dark:!bg-gray-700 dark:!text-gray-100 dark:!placeholder-gray-400"
				/>
			</div>
		</div>

		<!-- Role -->
		<div class="col-12 flex flex-wrap gap-4">
			<div class="flex-1 min-w-[200px]">
				<label for="role" class="block mb-1 text-gray-700 dark:text-gray-300"
					>Role</label
				>
				<Dropdown
					id="role"
					v-model="form.role"
					:options="roleOptions"
					optionLabel="label"
					optionValue="value"
					placeholder="Select role"
					class="w-full !bg-white !text-gray-900 dark:!bg-gray-700 dark:!text-gray-100"
				/>
			</div>
		</div>
		<div class="col-12">
			<Button
				label="Upload Image"
				icon="pi pi-upload"
				class="!bg-blue-500 !text-white"
				@click="openUploadModal"
			/>
			<p v-if="form.image" class="mt-2 text-sm text-green-600">
				Image uploaded: {{ form.image }}
			</p>
		</div>
		<!-- Status -->
		<div class="col-12">
			<label for="status" class="block mb-1 !text-gray-700 dark:!text-gray-300"
				>Status</label
			>
			<Dropdown
				id="status"
				v-model="form.status"
				:options="statusOptions"
				optionLabel="label"
				optionValue="value"
				placeholder="Select status"
				class="w-full !bg-white !text-gray-900 dark:!bg-gray-700 dark:!text-gray-100"
			/>
		</div>

		<!-- Status Reason -->
		<div v-if="isInactive" class="flex-1 min-w-[200px]">
			<label
				for="status_reason"
				class="block mb-1 text-gray-700 dark:text-gray-300"
				>Status reason</label
			>
			<InputText
				id="status_reason"
				v-model="form.status_reason"
				placeholder="Enter status reason"
				class="w-full !bg-white !text-gray-900 dark:!bg-gray-700 dark:!text-gray-100 dark:!placeholder-gray-400"
			/>
		</div>

		<!-- Submit -->
		<div class="col-12 flex justify-end">
			<Button
				:label="buttonText"
				:icon="
					buttonText === 'Save'
						? 'pi pi-check'
						: buttonText === 'Submit'
							? 'pi pi-check'
							: 'pi pi-arrow-right'
				"
				class="w-full md:w-auto !border hover:!border-primary hover:!text-primary hover:!bg-white !bg-primary !text-white !border-white dark:hover:!bg-gray-800"
				@click="handleSubmit"
			/>
		</div>
	</div>
	<UploadImageModal ref="uploadModal" @uploaded="handleImageUploaded" />
</template>
