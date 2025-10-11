<template>
	<div
		class="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300"
	>
		<div class="flex flex-row justify-between items-center mb-2">
			<h2 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
				Banner Templates
			</h2>
			<Button
				class="w-auto rounded-lg p-2 !bg-primary hover:!bg-secondary !text-white font-semibold text-md tracking-wide transition duration-300 !border !border-primary hover:!border-secondary dark:!border-white"
				@click="goToAddBanners"
			>
				+ Add New Banner
			</Button>
		</div>

		<!-- Loading -->
		<div
			v-if="loading"
			class="text-center py-10 text-gray-500 dark:text-gray-400"
		>
			<i class="pi pi-spin pi-spinner text-3xl mb-2"></i>
			<p class="text-lg">Loading templates...</p>
		</div>

		<!-- No Data -->
		<div
			v-else-if="templates.length === 0"
			class="text-center py-10 text-gray-500 dark:text-gray-400"
		>
			No banner templates found.
		</div>

		<!-- Grid -->
		<div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			<div
				v-for="template in templates"
				:key="template.banner_id"
				class="flex flex-col justify-between rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-5 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 min-w-[280px] h-full hover:shadow-xl transition duration-300 ease-in-out"
			>
				<!-- Header -->
				<div class="border-b border-gray-200 dark:border-gray-700 pb-3 mb-3">
					<h3
						class="text-lg font-bold text-gray-800 dark:text-gray-100 truncate"
					>
						Banner ID
					</h3>
					<p class="text-sm text-gray-500 dark:text-gray-400 truncate">
						{{ template.banner_id }}
					</p>
				</div>

				<!-- Multiple Images Preview -->
				<div class="mb-3 flex flex-col items-center">
					<div
						class="flex gap-2 overflow-x-auto max-w-full py-2 px-1 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600"
					>
						<div
							v-for="(img, index) in extractImages(template.images)"
							:key="index"
							class="flex flex-col items-center min-w-[80px]"
						>
							<img
								:src="getImage(img)"
								alt="Banner Thumbnail"
								class="w-20 h-20 object-cover rounded-md border border-gray-200 dark:border-gray-700 shadow-sm cursor-pointer hover:opacity-80 transition"
								@click="openImagePreview(template, index)"
								@error="onImageError($event)"
							/>
							<p
								class="mt-1 text-xs text-gray-500 dark:text-gray-400 truncate max-w-[80px]"
							>
								{{ getImageName(img) }}
							</p>
						</div>
					</div>
				</div>

				<!-- Body -->
				<div class="text-sm text-gray-700 dark:text-gray-300 space-y-2 flex-1">
					<p>
						<i class="pi pi-user text-gray-400 dark:text-gray-500 mr-1"></i>
						<span class="font-semibold">Service Provider:</span>
						{{ template.service_provider_info?.name || "-" }}
					</p>
					<p>
						<i class="pi pi-envelope text-gray-400 dark:text-gray-500 mr-1"></i>
						<span class="font-semibold">Email:</span>
						{{ template.service_provider_info?.email || "-" }}
					</p>
					<p>
						<i
							class="pi pi-map-marker text-gray-400 dark:text-gray-500 mr-1"
						></i>
						<span class="font-semibold">Address:</span>
						{{ template.service_provider_info?.address || "-" }}
					</p>
				</div>

				<!-- Status -->
				<div class="mt-4 flex items-center justify-between">
					<Tag
						:value="template.status ? template.status : 'INACTIVE'"
						:severity="
							template.status?.toLowerCase() === 'active' ? 'success' : 'danger'
						"
						class="px-3 py-1 text-xs font-semibold rounded-full"
					/>
				</div>

				<!-- Actions -->
				<div
					class="flex gap-2 mt-5 justify-end border-t border-gray-200 dark:border-gray-700 pt-3"
				>
					<Button
						label="Edit"
						icon="pi pi-pencil"
						class="px-3 py-1 rounded-lg !bg-primary !text-white transition hover:!bg-secondary !border !border-primary hover:!border-secondary dark:!border-white"
						@click="editTemplate(template)"
					/>
					<Button
						label="Delete"
						icon="pi pi-trash"
						class="px-3 py-1 rounded-lg !bg-red-500 !text-white hover:!bg-red-600 transition !border !border-primary hover:!border-secondary dark:!border-white"
						@click="openDeleteModal(template)"
					/>
				</div>
			</div>
		</div>

		<!-- Confirmation Modal -->
		<ConfirmationModal
			:visible="showDeleteModal"
			title="Delete Banner Template"
			:message="`Are you sure you want to delete this template?`"
			@update:visible="showDeleteModal = $event"
			@confirm="confirmDelete"
			@cancel="cancelDelete"
		/>

		<!-- 🖼 Image Preview Modal (Improved Carousel Style) -->
		<div
			v-if="showImageModal"
			class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
			@click.self="closeImagePreview"
		>
			<!-- Modal Container -->
			<div
				class="relative w-full max-w-5xl min-w-[320px] max-h-[90vh] bg-gray-900 rounded-2xl shadow-2xl flex flex-col items-center overflow-hidden"
			>
				<button
					class="absolute top-4 right-4 z-50 text-white text-2xl hover:text-gray-300 transition"
					type="button"
					@click.stop="closeImagePreview"
				>
					<i class="pi pi-times"></i>
				</button>

				<!-- 🔄 Carousel Wrapper -->
				<div
					class="relative flex items-center justify-center w-full h-full p-6 box-border"
					style="min-height: 400px"
				>
					<!-- ⬅ Prev Button (relative to modal) -->
					<button
						v-if="imageList.length > 1"
						@click.stop="prevImage"
						class="absolute left-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black text-white p-4 rounded-full shadow-lg transition"
					>
						<i class="pi pi-chevron-left text-xl"></i>
					</button>

					<!-- 🖼 Image -->
					<img
						:src="currentImage"
						alt="Full Preview"
						class="max-h-[80vh] max-w-[90%] object-contain rounded-xl transition-all duration-300"
						@error="onImageError($event)"
					/>

					<!-- ➡ Next Button (relative to modal) -->
					<button
						v-if="imageList.length > 1"
						@click.stop="nextImage"
						class="absolute right-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black text-white p-4 rounded-full shadow-lg transition"
					>
						<i class="pi pi-chevron-right text-xl"></i>
					</button>
				</div>

				<!-- 🔢 Counter -->
				<div
					class="text-white text-sm py-4 bg-gray-800 w-full text-center border-t border-gray-700"
				>
					{{ currentIndex + 1 }} / {{ imageList.length }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { api } from "../../services/api";
import { Button } from "primevue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import ConfirmationModal from "../../components/ConfirmationModal.vue";
import { computed } from "vue";

const templates = ref([]);
const loading = ref(true);
const router = useRouter();
const toast = useToast();

const showDeleteModal = ref(false);
const selectedTemplate = ref(null);

// 🖼 image preview modal (carousel)
const showImageModal = ref(false);
const imageList = ref([]);
const currentIndex = ref(0);
const currentImage = computed(() => imageList.value[currentIndex.value]);

const goToAddBanners = () => {
	router.push("/banners/add-banner-template");
};

const editTemplate = (template) => {
	router.push(`/banners/edit-banner-template/${template.banner_id}`);
};

const openDeleteModal = (template) => {
	selectedTemplate.value = template;
	showDeleteModal.value = true;
};

const cancelDelete = () => {
	selectedTemplate.value = null;
};

const confirmDelete = async () => {
	if (!selectedTemplate.value) return;
	try {
		await api.delete(`/banner-templates/${selectedTemplate.value.banner_id}`);
		templates.value = templates.value.filter(
			(t) => t.banner_id !== selectedTemplate.value.banner_id
		);
		toast.add({
			severity: "success",
			summary: "Deleted",
			detail: "Banner template deleted successfully",
			life: 3000
		});
	} catch (err) {
		toast.add({
			severity: "error",
			summary: "Error",
			detail: err.response?.data?.message || "Failed to delete template",
			life: 4000
		});
	} finally {
		selectedTemplate.value = null;
	}
};

const fetchTemplates = async () => {
	try {
		const res = await api.get("banner-templates/");
		const arr = Array.isArray(res?.data) ? res.data : [];
		templates.value = arr;
	} catch (err) {
		console.error("fetchTemplates error:", err);
	} finally {
		loading.value = false;
	}
};

const placeholderImage =
	"https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

// ✅ Extract multiple images
// ✅ Extract multiple images (supports nested structures)
const extractImages = (imagesObj) => {
	if (!imagesObj || typeof imagesObj !== "object") return [];

	const allImages = [];

	const traverse = (obj) => {
		for (const key in obj) {
			const val = obj[key];
			if (!val) continue;

			if (typeof val === "string") {
				allImages.push(val);
			} else if (typeof val === "object") {
				traverse(val); // recursive call for nested image sets
			}
		}
	};

	traverse(imagesObj);
	return allImages;
};

// ✅ Build full URL if needed
const getImage = (imageData) => {
	if (!imageData) return placeholderImage;

	if (typeof imageData === "string") {
		return imageData.startsWith("http")
			? imageData
			: `https://test-bucket-api.nailsalon.club/nailsaloon/${imageData}`;
	}

	if (typeof imageData === "object") {
		const possibleKeys = ["url", "url_2", "Image"];
		for (const key of possibleKeys) {
			if (imageData[key]) {
				const val = imageData[key];
				return val.startsWith("http")
					? val
					: `https://test-bucket-api.nailsalon.club/nailsaloon/${val}`;
			}
		}
	}

	return placeholderImage;
};

// ✅ Extract image name
const getImageName = (imageData) => {
	if (!imageData) return "No image";
	let fileName = "";

	if (typeof imageData === "string") {
		fileName = imageData.split("/").pop();
	} else if (typeof imageData === "object") {
		fileName = imageData.url || imageData.url_2 || imageData.Image || "";
		fileName = fileName.split("/").pop();
	}

	if (!fileName) return "Unknown";

	fileName = fileName.split("__")[0];
	fileName = fileName.replace(/_[0-9a-f-]{8,}$/i, "");

	return fileName;
};

// ✅ Image error fallback
const onImageError = (e) => {
	if (e.target.src !== placeholderImage) {
		e.target.src = placeholderImage;
	}
};

// ✅ Carousel logic
const openImagePreview = (template, index) => {
	imageList.value = extractImages(template.images).map(getImage);
	currentIndex.value = index;
	showImageModal.value = true;
};

const closeImagePreview = () => {
	showImageModal.value = false;
	imageList.value = [];
	currentIndex.value = 0;
};

const nextImage = () => {
	currentIndex.value = (currentIndex.value + 1) % imageList.value.length;
};

const prevImage = () => {
	currentIndex.value =
		(currentIndex.value - 1 + imageList.value.length) % imageList.value.length;
};

onMounted(fetchTemplates);
</script>

<style scoped>
/* For smoother scrollbar and transitions */
::-webkit-scrollbar {
	height: 6px;
}
::-webkit-scrollbar-thumb {
	background-color: rgba(150, 150, 150, 0.4);
	border-radius: 3px;
}

/* Modal smooth fade-in animation */
[v-cloak] {
	display: none;
}

@keyframes fadeIn {
	from {
		opacity: 0;
		transform: scale(0.95);
	}
	to {
		opacity: 1;
		transform: scale(1);
	}
}

.fixed.inset-0.bg-black\/70 {
	animation: fadeIn 0.25s ease-out;
}
</style>
