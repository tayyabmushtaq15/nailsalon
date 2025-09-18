<script setup>
import { useThemeStore } from "../stores/themeStore";

const themeStore = useThemeStore();
</script>

<template>
	<button
		@click="themeStore.toggleTheme"
		class="fixed bottom-24 right-6 w-12 h-12 flex items-center justify-center rounded-full shadow-lg transition-colors duration-300 bg-gray-200 dark:bg-gray-800 text-black dark:text-white hover:scale-105"
	>
		<span v-if="themeStore.theme === 'light'">🌙</span>
		<span v-else>☀️</span>
	</button>
</template>
