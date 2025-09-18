<template>
	<Toast position="top-right" />
	<router-view />
	<Spinner :show="loadingStore.isLoading" />
	<LangSwithcher />
	<ThemeSwitcher />
</template>

<script setup>
import { useLoadingStore } from "./stores/loading";
import Spinner from "./components/Spinner.vue";
import LangSwithcher from "./components/LangSwithcher.vue";
import ThemeSwitcher from "./components/ThemeSwitcher.vue";

const loadingStore = useLoadingStore();
</script>
