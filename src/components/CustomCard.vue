<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
	user: {
		type: Object,
		required: true
	}
});

const emit = defineEmits(["edit", "delete"]);
</script>

<template>
	<div
		class="flex flex-col justify-between rounded-xl shadow-md border p-4 bg-white dark:!bg-gray-800 border-gray-200 dark:!border-gray-700 min-w-fit h-full text-wrap"
	>
		<!-- Header -->
		<div>
			<h3 class="text-lg font-semibold !text-gray-800 dark:!text-gray-100">
				{{ user.first_name }} {{ user.last_name }}
			</h3>
			<p class="text-sm !text-gray-500 dark:!text-gray-400">{{ user.email }}</p>
			<p class="text-sm !text-gray-500 dark:!text-gray-400">
				📞 {{ user.phone }}
			</p>
		</div>

		<!-- Status + Role -->
		<div class="mt-3">
			<span
				class="px-2 py-1 text-xs font-medium rounded-full"
				:class="
					user.status === 'ACTIVE'
						? '!bg-green-100 !text-green-700 dark:!bg-green-900 dark:!text-green-300'
						: '!bg-red-100 !text-red-700 dark:!bg-red-900 dark:!text-red-300'
				"
			>
				{{ user.status }}
			</span>
			<span
				class="ml-2 px-2 py-1 text-xs font-medium rounded-full !bg-blue-100 !text-blue-700 dark:!bg-blue-900 dark:!text-blue-300"
			>
				{{ user.role }}
			</span>
			<div class="mt-2 text-sm !text-gray-600 dark:!text-gray-400">
				{{ user.status_reason || "" }}
			</div>
		</div>

		<!-- Actions -->
		<div class="mt-4 flex justify-end space-x-3">
			<button
				@click="emit('edit', user)"
				class="px-3 py-1 rounded-lg !bg-primary !text-white transition hover:!bg-secondary"
			>
				Edit
			</button>
			<button
				@click="emit('delete', user)"
				class="px-3 py-1 rounded-lg !bg-red-500 !text-white hover:!bg-red-600 transition"
			>
				Delete
			</button>
		</div>
	</div>
</template>
