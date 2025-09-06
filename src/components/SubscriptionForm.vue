<script setup>
import { reactive, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Dropdown from "primevue/dropdown";
import Button from "../components/Button.vue";
import { defineProps } from "vue";

const props = defineProps({
	initialData: Object
});

const emit = defineEmits(["submit"]);

const router = useRouter();
const route = useRoute();
const isEditMode = route.path.includes("edit-subscriptions");

const form = reactive({
	id: null,
	title: "",
	tagline: "",
	duration_in_days: null,
	price: null,
	transaction_fee: null,
	member_limit: null,
	description: {},
	status: "active"
});
console.log("Initial Data:", props.initialData);
watch(
	() => props.initialData,
	(newData) => {
		if (newData && isEditMode) {
			form.id = newData.id;
			form.title = newData.title;
			form.tagline = newData.tagline;
			form.duration_in_days = newData.duration_in_days;
			form.price = newData.price;
			form.transaction_fee = newData.transaction_fee;
			form.member_limit = newData.member_limit;
			form.description = newData.description || {};
			form.status = newData.status;
		}
	},
	{ immediate: true }
);

const statusOptions = [
	{ label: "Active", value: "active" },
	{ label: "Inactive", value: "inactive" }
];

const handleDescriptionEnter = (event) => {
	if (event.target.value.trim() !== "") {
		const key = `${event.target.value}`;
		form.description[key] = event.target.value;
		event.target.value = "";
	}
};

const handleRemoveDescription = (key) => {
	delete form.description[key];
};

const handleSubmit = () => {
	emit("submit", { ...form });
};

const title = isEditMode ? "Edit Subscription" : "Add Subscription";
</script>

<template>
	<h2 class="text-xl font-semibold mb-4">{{ title }}</h2>

	<div
		class="p-fluid grid gap-4 border-collapse border border-1 border-gray-300 rounded-md pl-4 pt-2 pb-2 pr-4"
	>
		<div class="col-12 flex flex-wrap gap-4">
			<div class="flex-1 min-w-[200px]">
				<label for="title">Title</label>
				<InputText
					id="title"
					v-model="form.title"
					placeholder="Enter title"
					class="w-full"
				/>
			</div>

			<div class="flex-1 min-w-[200px]">
				<label for="tagline">Tagline</label>
				<InputText
					id="tagline"
					v-model="form.tagline"
					placeholder="Enter tagline"
					class="w-full"
				/>
			</div>
		</div>

		<div class="col-12 flex flex-wrap gap-4">
			<div class="flex-1 min-w-[200px]">
				<label for="duration">Duration (days)</label>
				<InputNumber
					id="duration"
					v-model="form.duration_in_days"
					:min="1"
					class="w-full"
				/>
			</div>

			<div class="flex-1 min-w-[200px]">
				<label for="price">Price</label>
				<InputNumber
					id="price"
					v-model="form.price"
					mode="currency"
					currency="USD"
					locale="en-US"
					class="w-full"
				/>
			</div>

			<div class="flex-1 min-w-[200px]">
				<label for="transaction_fee">Transaction Fee</label>
				<InputNumber
					id="transaction_fee"
					v-model="form.transaction_fee"
					:min="0"
					class="w-full"
				/>
			</div>

			<div class="flex-1 min-w-[200px]">
				<label for="member_limit">Member Limit</label>
				<InputNumber
					id="member_limit"
					v-model="form.member_limit"
					:min="1"
					class="w-full"
				/>
			</div>
		</div>

		<div class="col-12">
			<label for="description">Description</label>
			<InputText
				id="description"
				placeholder="Press Enter to add description value"
				class="w-full"
				@keydown.enter.prevent="handleDescriptionEnter"
			/>

			<div class="mt-2 space-y-1">
				<div
					v-for="(value, key) in form.description"
					:key="key"
					class="flex flex-row items-center gap-2"
				>
					<div
						class="flex flex-row-reverse items-baseline border-collapse border border-1 border-gray-300 rounded-md p-1 bg-secondary text-white"
					>
						<p>{{ value }}</p>
						<i
							class="pi pi-times p-button-rounded cursor-pointer"
							@click="handleRemoveDescription(key)"
							:style="{ fontSize: '0.9rem', padding: '3px' }"
						></i>
					</div>
				</div>
			</div>
		</div>

		<div class="col-12 flex flex-wrap gap-4">
			<div class="flex-1 min-w-[200px]">
				<label for="status">Status</label>
				<Dropdown
					id="status"
					v-model="form.status"
					:options="statusOptions"
					optionLabel="label"
					optionValue="value"
					class="w-full"
				/>
			</div>
		</div>

		<div class="col-12 flex justify-content-end md:justify-content-end">
			<Button
				:label="isEditMode ? 'Save' : 'Submit'"
				icon="pi pi-check"
				class="w-full md:w-auto !border hover:!border-primary hover:!text-primary hover:!bg-white !bg-primary !text-white !border-white rounded-md px-4 py-2"
				@click="handleSubmit"
			/>
		</div>
	</div>
</template>

<style scoped>
label {
	display: block;
	margin-bottom: 4px;
	font-weight: 500;
}
</style>
