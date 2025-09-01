<!-- components/ConfirmationModal.vue -->
<template>
	<Dialog
		v-model:visible="visible"
		modal
		:header="title"
		:closable="false"
		:style="{ width: '25rem' }"
	>
		<p class="m-0">{{ message }}</p>

		<template #footer>
			<Button
				label="Cancel"
				class="!border !border-gray-300 !text-gray-700 !bg-transparent hover:!bg-primary hover:!text-white rounded-md px-4 py-2"
				@click="cancel"
			/>
			<Button
				label="Confirm"
				class="!bg-red-600 hover:!bg-red-700 text-white"
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
