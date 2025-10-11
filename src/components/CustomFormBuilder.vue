<!-- /components/CustomFormBuilder.vue -->
<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import { useCustomFieldsStore } from "../stores/formBuilderStore";

const store = useCustomFieldsStore();

const newKey = ref("");
const newType = ref(null);

// Available data types
const fieldTypes = [
	{ label: "Text", value: "string" },
	{ label: "Number", value: "number" },
	{ label: "Boolean", value: "boolean" },
	{ label: "Date", value: "date" },
	{ label: "Email", value: "email" },
	{ label: "Phone", value: "phone" }
];

function addField() {
	if (!newKey.value.trim() || !newType.value) return;
	store.addField(newKey.value, newType.value); // send type instead of value
	newKey.value = "";
	newType.value = null;
}
</script>

<template>
	<div class="p-4 border border-gray-300 rounded-md space-y-3">
		<h3 class="text-lg font-semibold">Custom Fields</h3>

		<!-- Existing Fields -->
		<div v-if="Object.keys(store.fields).length" class="space-y-2">
			<div
				v-for="(type, key) in store.fields"
				:key="key"
				class="flex items-center gap-2"
			>
				<InputText
					:placeholder="key"
					:modelValue="key"
					disabled
					class="flex-1"
				/>
				<Dropdown
					:modelValue="type"
					:options="fieldTypes"
					optionLabel="label"
					optionValue="value"
					@update:modelValue="store.updateField(key, $event)"
					class="flex-1"
				/>
				<Button
					icon="pi pi-trash"
					class="!bg-red-500 !text-white"
					@click="store.deleteField(key)"
				/>
			</div>
		</div>

		<!-- Add New Field -->
		<div class="flex items-center gap-2">
			<InputText v-model="newKey" placeholder="Field Name" class="flex-1" />
			<Dropdown
				v-model="newType"
				:options="fieldTypes"
				optionLabel="label"
				optionValue="value"
				placeholder="Select Type"
				class="flex-1"
			/>
			<Button
				icon="pi pi-plus"
				class="!bg-primary !text-white"
				@click="addField"
			/>
		</div>
	</div>
</template>
