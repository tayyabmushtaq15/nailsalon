<template>
	<Button
		:label="label"
		:icon="icon"
		:disabled="disabled"
		:loading="loading"
		:type="type"
		class="px-4 py-2 rounded-lg font-medium transition duration-200"
		:class="buttonClass"
		@click="$emit('click', $event)"
	/>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";
import Button from "primevue/button";

const props = defineProps({
	label: {
		type: String,
		default: "Click Me"
	},
	icon: {
		type: String,
		default: null
	},
	buttonType: {
		type: String,
		default: "primary"
	},
	disabled: {
		type: Boolean,
		default: false
	},
	loading: {
		type: Boolean,
		default: false
	},
	type: {
		type: String,
		default: "button"
	}
});

defineEmits(["click"]);

const buttonClass = computed(() => {
	switch (props.buttonType) {
		case "primary":
			return "bg-primary text-white hover:bg-black/80";
		case "secondary":
			return "bg-secondary text-white hover:bg-gray-600";
		case "ghost":
			return "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100";
		case "delete":
			return "bg-red-500 text-white hover:bg-red-600";
		default:
			return "bg-primary text-white hover:bg-black/80";
	}
});
</script>
