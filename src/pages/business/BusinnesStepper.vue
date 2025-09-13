<script setup>
import { ref, onMounted } from "vue";
import Steps from "primevue/steps";
import Button from "primevue/button";
import Card from "primevue/card";
import { useToast } from "primevue/usetoast";

import BusinessForm from "../../components/BusinessForm.vue";
import { useBusinessStore } from "../../stores/businessStore";
import { useBusinessUserStore } from "../../stores/businessUserStore";
import BusinessUserForm from "../../components/BusinessUserForm.vue";
import { useRouter } from "vue-router";

const activeStep = ref(0);
const businessStore = useBusinessStore();
const businessUserStore = useBusinessUserStore();
const toast = useToast();
const router = useRouter();
const props = defineProps({
	userData: {
		type: Object,
		default: null
	}
});

const steps = [{ label: "User" }, { label: "Business" }, { label: "Preview" }];

onMounted(() => {
	if (props.initialUser) {
		businessStore.setUser(props.initialUser);
	}
});

function nextStepUser(data) {
	businessStore.setUser(data);
	activeStep.value = 1;
}

function nextStepBusiness(data) {
	businessStore.setBusiness(data);
	activeStep.value = 2;
}

async function submitBusiness() {
	try {
		const res = await businessStore.submitBusiness();
		toast.add({
			severity: "success",
			summary: "Success",
			detail: res?.data?.message || "Business created successfully!",
			life: 3000
		});
		router.push("/business");
	} catch (err) {
		console.error(err);
		toast.add({
			severity: "error",
			summary: "Error",
			detail: err?.response?.data?.message || "Failed to create business",
			life: 3000
		});
	}
}
</script>

<template>
	<div class="max-w-4xl mx-auto p-6 space-y-6">
		<!-- Stepper -->
		<Steps
			:model="steps"
			:activeIndex="activeStep"
			readonly="false"
			@update:activeIndex="(val) => (activeStep = val)"
		/>

		<!-- Step 1: User -->
		<div v-if="activeStep === 0">
			<BusinessUserForm
				:initialData="businessUserStore.userDetail"
				@submit="nextStepUser"
				buttonText="Next"
			/>
		</div>

		<!-- Step 2: Business -->
		<div v-else-if="activeStep === 1">
			<BusinessForm
				:initialData="businessStore.business"
				@submit="nextStepBusiness"
				@back="activeStep = 0"
				buttonText="Next"
				isBackButton="true"
			/>
		</div>

		<!-- Step 3: Preview -->
		<div v-else-if="activeStep === 2" class="space-y-6">
			<h2 class="text-xl font-semibold">Preview</h2>

			<!-- User Info Card -->
			<Card>
				<template #title>User Information</template>
				<template #content>
					<ul class="space-y-1">
						<li>
							<b>Name:</b> {{ businessStore.user.first_name }}
							{{ businessStore.user.last_name }}
						</li>
						<li><b>Email:</b> {{ businessStore.user.email }}</li>
						<li><b>Role:</b> {{ businessStore.user.role }}</li>
						<li>
							<b>Phone:</b> {{ businessStore.user.country_code }}
							{{ businessStore.user.phone }}
						</li>
					</ul>
				</template>
			</Card>

			<!-- Business Info Card -->
			<Card>
				<template #title>Business Information</template>
				<template #content>
					<ul class="space-y-1">
						<li><b>Name:</b> {{ businessStore.business.name }}</li>
						<li><b>Address:</b> {{ businessStore.business.address }}</li>
						<li><b>Latitude:</b> {{ businessStore.business.latitude }}</li>
						<li><b>Longitude:</b> {{ businessStore.business.longitude }}</li>
						<li>
							<b>Support Email:</b> {{ businessStore.business.support_email }}
						</li>
						<li>
							<b>Support Phone:</b> {{ businessStore.business.support_phone }}
						</li>
						<li><b>Status:</b> {{ businessStore.business.status }}</li>
					</ul>
				</template>
			</Card>

			<!-- Actions -->
			<div class="flex justify-between">
				<Button
					label="Back"
					icon="pi pi-arrow-left"
					@click="activeStep = 1"
					class="!bg-gray-300 !text-black !border-gray-300 rounded-md px-4 py-2"
				/>
				<Button
					label="Submit"
					icon="pi pi-check"
					@click="submitBusiness"
					class="!bg-primary !text-white !border-white rounded-md px-4 py-2"
				/>
			</div>
		</div>
	</div>
</template>
