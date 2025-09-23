<script setup>
import { useToast } from "primevue/usetoast";
import { api } from "../../services/api";
import BannerTemplateForm from "../../components/BannerTemplateForm.vue";
import { useRouter } from "vue-router";

const toast = useToast();
const router = useRouter();

async function handleSubmit(payload) {
	try {
		await api.post("/banner-templates/", payload);

		toast.add({
			severity: "success",
			summary: "Success",
			detail: "Banner template created successfully",
			life: 4000
		});

		router.push("/banners");
	} catch (error) {
		toast.add({
			severity: "error",
			summary: "Error",
			detail:
				error.response?.data?.message || "Failed to create banner template",
			life: 4000
		});
	}
}

function handleBack() {
	router.back();
}
</script>

<template>
	<div class="p-6 mx-auto bg-white shadow-md rounded-lg dark:bg-gray-900">
		<BannerTemplateForm
			:isBackButton="true"
			ButtonText="Save"
			@submit="handleSubmit"
			@back="handleBack"
		/>
	</div>
</template>
