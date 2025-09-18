<!-- components/ConfirmationModal.vue -->
<template>
	<Dialog
		v-model:visible="visible"
		modal
		:header="title"
		:closable="false"
		:style="{ width: '25rem' }"
		class="dark:bg-gray-800 dark:text-gray-100"
	>
		<p class="m-0 text-gray-800 dark:text-gray-200">
			{{ message }}
		</p>

		<template #footer>
			<Button
				label="Cancel"
				class="!border !border-gray-300 !text-gray-700 !bg-transparent hover:!bg-primary hover:!text-white dark:!border-gray-600 dark:!text-gray-200 dark:hover:!bg-primary rounded-md px-4 py-2"
				@click="cancel"
			/>
			<Button
				label="Confirm"
				class="!bg-red-600 hover:!bg-red-700 text-white dark:!bg-red-500 dark:hover:!bg-red-600 dark:!border-gray-600"
				@click="confirm"
			/>
		</template>
	</Dialog>
</template>

<script setup>
import { ref, watch } from "vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";

const props = defineProps({
	visible: {
		type: Boolean,
		default: false
	},
	title: {
		type: String,
		default: "Confirm"
	},
	message: {
		type: String,
		default: "Are you sure?"
	}
});

const emit = defineEmits(["update:visible", "confirm", "cancel"]);

const visible = ref(props.visible);

watch(
	() => props.visible,
	(val) => {
		visible.value = val;
	}
);

const confirm = () => {
	emit("confirm");
	emit("update:visible", false);
};

const cancel = () => {
	emit("cancel");
	emit("update:visible", false);
};
</script>
