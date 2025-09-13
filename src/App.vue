<template>
	<Toast position="top-right" />

	<router-view />
	<Spinner :show="loadingStore.isLoading" />
	<LangSwithcher />
</template>

<script setup>
import { useLoadingStore } from "./stores/loading";
import Spinner from "./components/Spinner.vue";
import LangSwithcher from "./components/LangSwithcher.vue";

const loadingStore = useLoadingStore();
</script>
