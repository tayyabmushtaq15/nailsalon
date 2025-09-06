<template>
	<div
		v-if="show"
		class="fixed inset-0 bg-white flex items-center justify-center z-50"
	>
		<div
			class="w-12 h-12 border-4 border-gray-300 border-t-primary rounded-full animate-spin"
		></div>
	</div>
</template>

<script setup>
defineProps({
	show: Boolean
});
</script>
