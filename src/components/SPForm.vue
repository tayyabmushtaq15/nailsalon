<script setup>
import { reactive, watch } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";

const props = defineProps({
	initialData: { type: Object, default: () => ({}) },
	isBackButton: { type: Boolean, default: true },
	ButtonText: { type: String, default: "Next" }
});

const emit = defineEmits(["submit", "back"]);

const form = reactive({
	name: "",
	contact_no: "",
	email: "",
	address: "",
	status: "active"
});

// ✅ Watch for prop updates and sync with local form
watch(
	() => props.initialData,
	(newVal) => {
		if (newVal) {
			Object.assign(form, {
				name: newVal.name || "",
				contact_no: newVal.contact_no || "",
				email: newVal.email || "",
				address: newVal.address || "",
				status: newVal.status?.toLowerCase() || "active"
			});
		}
	},
	{ immediate: true, deep: true }
);

function handleSubmit() {
	emit("submit", { ...form });
}

const statusOptions = [
	{ label: "Active", value: "active" },
	{ label: "Inactive", value: "inactive" }
];
</script>

<template>
	<h2
		class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100 dark:bg-slate-900"
	>
		Service Provider Form
	</h2>

	<div
		class="p-4 grid gap-4 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900"
	>
		<!-- Name + Contact -->
		<div class="col-12 flex flex-wrap gap-4">
			<div class="flex-1 min-w-[200px]">
				<label for="name" class="block mb-1 text-gray-700 dark:text-gray-300"
					>Name</label
				>
				<InputText
					id="name"
					v-model="form.name"
					placeholder="Enter provider name"
					class="w-full"
				/>
			</div>

			<div class="flex-1 min-w-[200px]">
				<label
					for="contact_no"
					class="block mb-1 text-gray-700 dark:text-gray-300"
					>Contact No</label
				>
				<InputText
					id="contact_no"
					v-model="form.contact_no"
					placeholder="Enter contact number"
					class="w-full"
				/>
			</div>
		</div>

		<!-- Email + Address -->
		<div class="col-12 flex flex-wrap gap-4">
			<div class="flex-1 min-w-[200px]">
				<label for="email" class="block mb-1 text-gray-700 dark:text-gray-300"
					>Email</label
				>
				<InputText
					id="email"
					v-model="form.email"
					type="email"
					placeholder="provider@example.com"
					class="w-full"
				/>
			</div>

			<div class="flex-1 min-w-[200px]">
				<label for="address" class="block mb-1 text-gray-700 dark:text-gray-300"
					>Address</label
				>
				<InputText
					id="address"
					v-model="form.address"
					placeholder="Enter address"
					class="w-full"
				/>
			</div>
		</div>

		<!-- Status -->
		<div class="col-12 flex flex-wrap gap-4">
			<div class="flex-1 min-w-[200px]">
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
		</div>

		<!-- Buttons -->
		<div class="col-12 flex justify-between">
			<Button
				:label="ButtonText"
				icon="pi pi-check"
				@click="handleSubmit"
				class="w-full md:w-auto rounded-md px-4 py-2 !bg-primary !text-white !border-transparent hover:opacity-90"
			/>
		</div>
	</div>
</template>
