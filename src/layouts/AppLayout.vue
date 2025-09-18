<template>
	<div
		class="app-layout flex h-screen relative bg-gray-50 dark:bg-gray-950 text-black dark:text-white transition-colors"
	>
		<Sidebar
			:class="[
				'fixed md:static top-0 left-0 h-full z-50 transition-transform duration-300',
				'bg-gray-100 dark:bg-gray-900',
				isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
				'md:translate-x-0 w-64'
			]"
			@close="isSidebarOpen = false"
		/>

		<div
			v-if="isSidebarOpen"
			class="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
			@click="isSidebarOpen = false"
		></div>

		<div class="flex-1 flex flex-col">
			<Topbar @toggleSidebar="isSidebarOpen = !isSidebarOpen" />
			<main
				class="flex-1 overflow-y-auto p-4 bg-white dark:bg-gray-950 transition-colors"
			>
				<Breadcrumb />
				<router-view />
			</main>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import Sidebar from "./Sidebar.vue";
import Topbar from "./Topbar.vue";
import Breadcrumb from "../components/Breadcrumb.vue";

const isSidebarOpen = ref(false);
</script>
