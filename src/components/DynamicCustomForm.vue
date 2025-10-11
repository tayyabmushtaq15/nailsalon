<template>
	<div v-if="Object.keys(localFields).length" class="space-y-4">
		<h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
			Custom Fields
		</h3>

		<div
			v-for="(type, name) in localFields"
			:key="name"
			class="flex flex-col space-y-1"
		>
			<label class="text-gray-700 dark:text-gray-300">{{ name }}</label>

			<!-- String -->
			<InputText
				v-if="type === 'string' || type === 'text'"
				v-model="formData[name]"
				class="w-full"
				:placeholder="`Enter ${name}`"
			/>

			<!-- Number -->
			<InputNumber
				v-else-if="type === 'number'"
				v-model="formData[name]"
				class="w-full"
				inputClass="w-full"
				:placeholder="`Enter ${name}`"
			/>

			<!-- Email -->
			<InputText
				v-else-if="type === 'email'"
				v-model="formData[name]"
				type="email"
				class="w-full"
				:placeholder="`Enter ${name}`"
			/>

			<!-- Boolean -->
			<div v-else-if="type === 'boolean'" class="flex items-center space-x-2">
				<input
					type="checkbox"
					v-model="formData[name]"
					class="w-5 h-5 accent-blue-500 cursor-pointer"
				/>
				<span class="text-gray-700 dark:text-gray-300">Yes / No</span>
			</div>

			<!-- Fallback -->
			<InputText
				v-else
				v-model="formData[name]"
				class="w-full"
				:placeholder="`Enter ${name}`"
			/>
		</div>
	</div>
</template>

<script setup>
import { watch, ref, nextTick, onMounted } from "vue";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";

const props = defineProps({
	customFields: {
		type: Object,
		default: () => ({})
	},
	modelValue: {
		type: Object,
		default: () => ({})
	}
});

const emit = defineEmits(["update:modelValue"]);

const localFields = ref({});
const formData = ref({});

// ✅ Utility for default value
function getDefaultValue(type) {
	switch (type) {
		case "number":
			return null;
		case "boolean":
			return false;
		default:
			return "";
	}
}

// ✅ When customFields (schema) changes
watch(
	() => props.customFields,
	async (newFields) => {
		localFields.value = newFields || {};

		// Merge existing form data (from modelValue)
		const updated = { ...props.modelValue };

		for (const key in newFields) {
			if (updated[key] === undefined) {
				updated[key] = getDefaultValue(newFields[key]);
			}
		}

		formData.value = updated;

		await nextTick();
		emit("update:modelValue", formData.value);
	},
	{ immediate: true, deep: true }
);

// ✅ When parent updates modelValue (API-loaded)
watch(
	() => props.modelValue,
	(newVal) => {
		if (!newVal) return;

		console.log(
			"🟦 [DynamicCustomForm] modelValue received from parent:",
			newVal
		);

		formData.value = { ...newVal };

		// Ensure all schema keys exist
		for (const key in localFields.value) {
			if (formData.value[key] === undefined)
				formData.value[key] = getDefaultValue(localFields.value[key]);
		}
	},
	{ immediate: true, deep: true }
);

// ✅ Emit back upward
watch(
	formData,
	(newVal) => {
		emit("update:modelValue", newVal);
	},
	{ deep: true }
);

// ✅ Also log on mount for debugging
onMounted(() => {
	console.log("🟩 [DynamicCustomForm] initial modelValue:", props.modelValue);
	console.log(
		"🟨 [DynamicCustomForm] initial customFields:",
		props.customFields
	);
});
</script>

<style scoped>
input[type="checkbox"] {
	transform: scale(1.1);
}
</style>
