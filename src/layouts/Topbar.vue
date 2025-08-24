<template>
	<div
		class="topbar h-12 bg-gray-50 flex items-center justify-between px-4 shadow"
	>
		<button class="md:hidden text-gray-700" @click="$emit('toggleSidebar')">
			<i class="pi pi-bars text-xl"></i>
		</button>
	</div>
</template>

<script>
export default {
	name: "Topbar"
};
</script>
