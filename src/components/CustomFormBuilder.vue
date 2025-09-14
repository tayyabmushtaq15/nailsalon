<!-- /components/CustomFormBuilder.vue -->
<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { useCustomFieldsStore } from "../stores/formBuilderStore";

const store = useCustomFieldsStore();

const newKey = ref("");
const newValue = ref("");

function addField() {
	if (!newKey.value.trim()) return;
	store.addField(newKey.value, newValue.value);
	newKey.value = "";
	newValue.value = "";
}
</script>

<template>
	<div class="p-4 border border-gray-300 rounded-md space-y-3">
		<h3 class="text-lg font-semibold">Custom Fields</h3>

		<!-- Existing Fields -->
		<div v-if="Object.keys(store.fields).length" class="space-y-2">
			<div
				v-for="(value, key) in store.fields"
				:key="key"
				class="flex items-center gap-2"
			>
				<InputText
					:placeholder="key"
					:modelValue="value"
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
			<InputText v-model="newValue" placeholder="Field Value" class="flex-1" />
			<Button
				icon="pi pi-plus"
				class="!bg-primary !text-white"
				@click="addField"
			/>
		</div>
	</div>
</template>
