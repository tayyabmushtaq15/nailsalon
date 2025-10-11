<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { api } from "../../services/api";
import BannerTemplateForm from "../../components/BannerTemplateForm.vue";

const route = useRoute();
const router = useRouter();
const toast = useToast();

const initialData = ref(null);
const loading = ref(true);
const id = route.params.id; // ✅ get id from URL

const fetchTemplate = async () => {
	try {
		const res = await api.get(`/banner-templates/${id}`);
		console.log("Fetched banner template:", res.data[0]);

		if (res?.data && Array.isArray(res.data) && res.data.length) {
			const banner = res.data[0]; // ✅ correct path

			const images =
				banner.images?.image1 && typeof banner.images.image1 === "object"
					? banner.images.image1
					: {};

			const customFields =
				banner.banner_custom_field?.custom_field &&
				typeof banner.banner_custom_field.custom_field === "object"
					? banner.banner_custom_field.custom_field
					: {};

			// ✅ Combine everything for your form
			initialData.value = {
				service_provider_id: banner.service_provider_id,
				status: banner.status,
				images: banner.images?.image1 || {},
				banner_custom_field: banner.banner_custom_field || {}
			};
		} else {
			throw new Error("No banner template found");
		}
	} catch (err) {
		console.error("Error fetching banner template:", err);
		toast.add({
			severity: "error",
			summary: "Error",
			detail: "Failed to load banner template",
			life: 4000
		});
	} finally {
		loading.value = false;
	}
};

// ✅ Lifecycle: Fetch data when mounted
onMounted(fetchTemplate);

// ✅ Handle form submission (PUT)
const handleSubmit = async (payload) => {
	try {
		await api.put(`/banner-templates/${id}`, payload);

		toast.add({
			severity: "success",
			summary: "Success",
			detail: "Banner template updated successfully",
			life: 4000
		});

		router.push("/banners");
	} catch (error) {
		toast.add({
			severity: "error",
			summary: "Error",
			detail:
				error.response?.data?.message || "Failed to update banner template",
			life: 4000
		});
	}
};

// ✅ Back button handler
const handleBack = () => {
	router.back();
};
</script>

<template>
	<div class="p-6 mx-auto bg-white shadow-md rounded-lg dark:bg-gray-900">
		<h2 class="text-2xl font-semibold mb-4">Edit Banner Template</h2>

		<div v-if="loading" class="text-center py-10 text-gray-500">
			<i class="pi pi-spin pi-spinner text-3xl mb-2"></i>
			<p class="text-lg">Loading template...</p>
		</div>

		<div v-else>
			<BannerTemplateForm
				:initialData="initialData"
				:isBackButton="true"
				ButtonText="Save Changes"
				@submit="handleSubmit"
				@back="handleBack"
			/>
		</div>
	</div>
</template>
