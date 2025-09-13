<script setup>
import { reactive } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";

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
		default: "Save"
	}
});
const emit = defineEmits(["submit", "back"]);

const form = reactive({
	code: props.initialData.code || "",
	discount_type: props.initialData.discount_type || "fixed",
	discount_value: props.initialData.discount_value || 0,
	usage_limit: props.initialData.usage_limit || 0,
	valid_till: props.initialData.valid_till
		? new Date(props.initialData.valid_till)
		: null,
	status:
		props.initialData.status?.toLowerCase() === "active"
			? "active"
			: props.initialData.status?.toLowerCase() === "inactive"
				? "inactive"
				: "active"
});

function handleSubmit() {
	emit("submit", { ...form });
}

const discountTypeOptions = [
	// { label: "Fixed", value: "fixed" },
	// { label: "Percentage", value: "percentage" },
	{ label: "Banner", value: "Banner" },
	{ label: "Free Banner", value: "Free Banner" },
	{ label: "Subscription", value: "Subscription" }
];
const statusOptions = [
	{ label: "Active", value: "active" },
	{ label: "Inactive", value: "inactive" }
];
</script>

<template>
	<h2 class="text-xl font-semibold mb-4">Coupon Form</h2>

	<div
		class="p-fluid grid gap-4 border border-1 border-gray-300 rounded-md p-4"
	>
		<!-- Code -->
		<div class="col-12">
			<label for="code">Coupon Code</label>
			<InputText
				id="code"
				v-model="form.code"
				placeholder="Enter coupon code"
				class="w-full"
			/>
		</div>

		<!-- Discount Type & Value -->
		<div class="col-12 flex flex-wrap gap-4">
			<div class="flex-1 min-w-[200px]">
				<label for="discount_type">Discount Type</label>
				<Dropdown
					id="discount_type"
					v-model="form.discount_type"
					:options="discountTypeOptions"
					optionLabel="label"
					optionValue="value"
					placeholder="Select type"
					class="w-full"
				/>
			</div>
		</div>

		<!-- Business ID & Usage Limit -->
		<div class="col-12 flex flex-wrap gap-4">
			<div class="flex-1 min-w-[200px]">
				<label for="discount_value">Discount Value</label>
				<InputText
					id="discount_value"
					v-model.number="form.discount_value"
					type="number"
					placeholder="Enter value"
					class="w-full"
				/>
			</div>

			<div class="flex-1 min-w-[200px]">
				<label for="usage_limit">Usage Limit</label>
				<InputText
					id="usage_limit"
					v-model.number="form.usage_limit"
					type="number"
					placeholder="Enter usage limit"
					class="w-full"
				/>
			</div>
		</div>

		<!-- Valid Till -->
		<div class="col-12">
			<label for="valid_till">Valid Till</label>
			<Calendar
				id="valid_till"
				v-model="form.valid_till"
				dateFormat="yy-mm-dd"
				showIcon
				class="w-full"
			/>
		</div>

		<!-- Status -->
		<div class="col-12">
			<label for="status">Status</label>
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

		<!-- Buttons -->
		<div class="col-12 flex justify-between">
			<Button
				:label="ButtonText"
				icon="pi pi-check"
				@click="handleSubmit"
				class="w-full md:w-auto !bg-primary !text-white !border-white rounded-md px-4 py-2"
			/>
		</div>
	</div>
</template>
