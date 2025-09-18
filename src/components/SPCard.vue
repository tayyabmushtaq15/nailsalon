<script setup>
import { defineProps, defineEmits } from "vue";
import Tag from "primevue/tag";
import { Button } from "primevue";

const props = defineProps({
	data: {
		type: Object,
		required: true
	},
	showActions: {
		type: Boolean,
		default: true
	}
});

const emit = defineEmits(["edit", "delete"]);
</script>

<template>
	<div
		class="flex flex-col justify-between rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-5 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 min-w-[280px] h-full hover:shadow-xl transition duration-300 ease-in-out"
	>
		<!-- Header -->
		<div class="border-b border-gray-200 dark:border-gray-700 pb-3 mb-3">
			<h3 class="text-lg font-bold text-gray-800 dark:text-gray-100 truncate">
				{{ data.title }}
			</h3>
			<p class="text-sm text-gray-500 dark:text-gray-400 truncate">
				{{ data.subtitle }}
			</p>
		</div>

		<!-- Body -->
		<div class="text-sm text-gray-700 dark:text-gray-300 space-y-2 flex-1">
			<p>
				<i class="pi pi-phone text-gray-400 dark:text-gray-500 mr-1"></i>
				<span class="font-semibold">Contact:</span> {{ data.contact }}
			</p>
			<p>
				<i class="pi pi-map-marker text-gray-400 dark:text-gray-500 mr-1"></i>
				<span class="font-semibold">Address:</span> {{ data.address }}
			</p>
			<p>
				<i class="pi pi-images text-gray-400 dark:text-gray-500 mr-1"></i>
				<span class="font-semibold">Banners:</span> {{ data.banners }}
			</p>
			<p>
				<i class="pi pi-calendar text-gray-400 dark:text-gray-500 mr-1"></i>
				<span class="font-semibold">Created:</span> {{ data.createdAt }}
			</p>
		</div>

		<!-- Status -->
		<div class="mt-4 flex items-center justify-between">
			<Tag
				:value="data.status"
				:severity="
					data.status?.toLowerCase() === 'active' ? 'success' : 'danger'
				"
				class="px-3 py-1 text-xs font-semibold rounded-full"
			/>
		</div>

		<!-- Actions -->
		<div
			v-if="showActions"
			class="flex gap-2 mt-5 justify-end border-t border-gray-200 dark:border-gray-700 pt-3"
		>
			<Button
				label="Edit"
				icon="pi pi-pencil"
				class="px-3 py-1 rounded-lg !bg-primary !text-white transition hover:!bg-secondary !border !border-primary hover:!border-secondary dark:!border-white"
				@click="$emit('edit', data)"
			/>
			<Button
				label="Delete"
				icon="pi pi-trash"
				class="px-3 py-1 rounded-lg !bg-red-500 !text-white hover:!bg-red-600 transition !border !border-primary hover:!border-secondary dark:!border-white"
				@click="$emit('delete', data)"
			/>
		</div>
	</div>
</template>
