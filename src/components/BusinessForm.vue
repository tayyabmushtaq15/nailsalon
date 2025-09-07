<script setup>
import { reactive } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";

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
		default: "Next"
	}
});
const emit = defineEmits(["submit"]);

const form = reactive({
	name: props.initialData.name || "",
	address: props.initialData.address || "",
	latitude: props.initialData.latitude || "",
	longitude: props.initialData.longitude || "",
	support_email: props.initialData.support_email || "",
	support_phone: props.initialData.support_phone || "",
	status: props.initialData.status || "active"
});

function handleSubmit() {
	emit("submit", { ...form });
}
const statusOptions = [
	{ label: "Active", value: "active" },
	{ label: "Inactive", value: "inactive" }
];
</script>

<template>
	<h2 class="text-xl font-semibold mb-4">Business Form</h2>

	<div
		class="p-fluid grid gap-4 border border-1 border-gray-300 rounded-md p-4"
	>
		<div class="col-12 flex flex-wrap gap-4">
			<div class="flex-1 min-w-[200px]">
				<label for="name">Business Name</label>
				<InputText
					id="name"
					v-model="form.name"
					placeholder="Enter business name"
					class="w-full"
				/>
			</div>

			<div class="flex-1 min-w-[200px]">
				<label for="address">Address</label>
				<InputText
					id="address"
					v-model="form.address"
					placeholder="Enter address"
					class="w-full"
				/>
			</div>
		</div>

		<div class="col-12 flex flex-wrap gap-4">
			<div class="flex-1 min-w-[200px]">
				<label for="latitude">Latitude</label>
				<InputText
					id="latitude"
					v-model="form.latitude"
					placeholder="Latitude"
					class="w-full"
				/>
			</div>

			<div class="flex-1 min-w-[200px]">
				<label for="longitude">Longitude</label>
				<InputText
					id="longitude"
					v-model="form.longitude"
					placeholder="Longitude"
					class="w-full"
				/>
			</div>
		</div>

		<div class="col-12 flex flex-wrap gap-4">
			<div class="flex-1 min-w-[200px]">
				<label for="support_email">Support Email</label>
				<InputText
					id="support_email"
					v-model="form.support_email"
					type="email"
					placeholder="support@biz.com"
					class="w-full"
				/>
			</div>

			<div class="flex-1 min-w-[200px]">
				<label for="support_phone">Support Phone</label>
				<InputText
					id="support_phone"
					v-model="form.support_phone"
					placeholder="Enter phone"
					class="w-full"
				/>
			</div>
		</div>
		<div class="col-12 flex flex-wrap gap-4">
			<div class="flex-1 min-w-[200px]">
				<label for="role">Status</label>
				<Dropdown
					id="staurs"
					v-model="form.status"
					:options="statusOptions"
					optionLabel="label"
					optionValue="value"
					placeholder="Select status"
					class="w-full"
				/>
			</div>
		</div>
		<div class="col-12 flex justify-between">
			<Button
				v-if="isBackButton"
				label="Back"
				icon="pi pi-arrow-left"
				@click="$emit('back')"
				class="!bg-gray-300 !text-black !border-gray-300 rounded-md px-4 py-2"
			/>
			<Button
				:label="ButtonText"
				:icon="isBackButton ? 'pi pi-arrow-right' : 'pi pi-check'"
				@click="handleSubmit"
				class="w-full md:w-auto !bg-primary !text-white !border-white rounded-md px-4 py-2"
			/>
		</div>
	</div>
</template>
