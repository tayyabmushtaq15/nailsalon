<template>
	<div class="p-6 mx-auto shadow-md rounded-lg bg-white dark:bg-gray-900">
		<ServiceProviderForm
			:isBackButton="true"
			:initialData="form"
			ButtonText="Save"
			@submit="handleSubmit"
		/>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { api } from "../../services/api";
import ServiceProviderForm from "../../components/SPForm.vue";

const route = useRoute();
const router = useRouter();
const toast = useToast();

const { id } = route.params;
const isEdit = ref(!!id);

const form = ref({
	name: "",
	contact_no: "",
	email: "",
	address: "",
	status: "active"
});

const fetchProvider = async () => {
	try {
		const res = await api.get(`/printing-service-providers/${id}`);
		const data = res.data; // ✅ adjust based on your API response
		form.value = {
			name: data.name,
			email: data.email,
			contact_no: data.contact_no,
			address: data.address,
			status: data.status?.toLowerCase() || "active"
		};
	} catch (err) {
		console.error("Error fetching provider:", err);
		toast.add({
			severity: "error",
			summary: "Error",
			detail: "Failed to load provider data",
			life: 4000
		});
	}
};

const handleSubmit = async (payload) => {
	try {
		if (isEdit.value) {
			await api.put(`/printing-service-providers/${id}`, payload);
			toast.add({
				severity: "success",
				summary: "Updated",
				detail: "Provider updated",
				life: 4000
			});
		} else {
			await api.post("/printing-service-providers", payload);
			toast.add({
				severity: "success",
				summary: "Created",
				detail: "Provider created",
				life: 4000
			});
		}
		router.push("/printing-service-providers");
	} catch (err) {
		console.error("Error saving provider:", err);
		toast.add({
			severity: "error",
			summary: "Error",
			detail: "Failed to save provider",
			life: 4000
		});
	}
};

onMounted(() => {
	if (isEdit.value) fetchProvider();
});
</script>
