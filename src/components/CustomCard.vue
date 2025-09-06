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
		class="flex flex-col justify-between rounded-xl shadow-md border p-4 bg-white min-w-fit h-full text-wrap"
	>
		<div>
			<h3 class="text-lg font-semibold text-gray-800">
				{{ user.first_name }} {{ user.last_name }}
			</h3>
			<p class="text-sm text-gray-500">{{ user.email }}</p>
			<p class="text-sm text-gray-500">📞 {{ user.phone }}</p>
		</div>

		<div class="mt-3">
			<span
				class="px-2 py-1 text-xs font-medium rounded-full"
				:class="
					user.status === 'ACTIVE'
						? 'bg-green-100 text-green-700'
						: 'bg-red-100 text-red-700'
				"
			>
				{{ user.status }}
			</span>
			<span
				class="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700"
			>
				{{ user.role }}
			</span>
		</div>

		<div class="mt-4 flex justify-end space-x-3">
			<button
				@click="emit('edit', user)"
				class="px-3 py-1 rounded-lg bg-primary text-white transition hover:bg-secondary"
			>
				Edit
			</button>
			<button
				@click="emit('delete', user)"
				class="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
			>
				Delete
			</button>
		</div>
	</div>
</template>
