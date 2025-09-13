<script setup>
import { reactive } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

const props = defineProps({
	title: {
		type: String,
		default: "Business User Form"
	},
	buttonText: {
		type: String,
		default: "Save"
	},
	initialData: {
		type: Object,
		default: () => ({})
	}
});

const emit = defineEmits(["submit"]);

// form data (default internal values for hidden fields)
const form = reactive({
	email: props.initialData.email || "",
	first_name: props.initialData.first_name || "",
	last_name: props.initialData.last_name || "",
	image: props.initialData.image || "",
	country_code: props.initialData.country_code || "",
	phone: props.initialData.phone || "",

	// handled internally
	password: "defaultPassword123", // or empty string
	role: "admin",
	status: "active",
	status_reason: ""
});

function handleSubmit() {
	emit("submit", { ...form });
}
</script>

<template>
	<h2 class="text-xl font-semibold mb-4">{{ title }}</h2>

	<div
		class="p-fluid grid gap-4 border-collapse border border-1 border-gray-300 rounded-md pl-4 pt-2 pb-2 pr-4"
	>
		<div class="col-12 flex flex-wrap gap-4">
			<div class="flex-1 min-w-[200px]">
				<label for="first_name">First Name</label>
				<InputText
					id="first_name"
					v-model="form.first_name"
					placeholder="Enter first name"
					class="w-full"
				/>
			</div>

			<div class="flex-1 min-w-[200px]">
				<label for="last_name">Last Name</label>
				<InputText
					id="last_name"
					v-model="form.last_name"
					placeholder="Enter last name"
					class="w-full"
				/>
			</div>
		</div>

		<div class="col-12 flex flex-wrap gap-4">
			<div class="flex-1 min-w-[200px]">
				<label for="email">Email</label>
				<InputText
					type="email"
					id="email"
					v-model="form.email"
					placeholder="Enter email"
					class="w-full"
				/>
			</div>
		</div>

		<div class="col-12 flex flex-wrap gap-4">
			<div class="w-full md:w-3/12">
				<label for="country_code">Country Code</label>
				<InputText
					id="country_code"
					v-model="form.country_code"
					placeholder="+1"
					class="w-full"
				/>
			</div>

			<div class="w-full md:flex-1">
				<label for="phone">Phone</label>
				<InputText
					type="number"
					id="phone"
					v-model="form.phone"
					placeholder="Enter phone number"
					class="w-full"
				/>
			</div>
		</div>

		<div class="col-12 flex justify-content-end md:justify-content-end">
			<Button
				:label="buttonText"
				:icon="
					buttonText === 'Save'
						? 'pi pi-check'
						: buttonText === 'Submit'
							? 'pi pi-check'
							: 'pi pi-arrow-right'
				"
				class="w-full md:w-auto !border hover:!border-primary hover:!text-primary hover:!bg-white !bg-primary !text-white !border-white rounded-md px-4 py-2"
				@click="handleSubmit"
			/>
		</div>
	</div>
</template>
