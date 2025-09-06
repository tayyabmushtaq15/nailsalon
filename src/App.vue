<template>
	<Toast position="top-right" />

	<router-view />
	<Spinner :show="loadingStore.isLoading" />
</template>

<script setup>
import { useLoadingStore } from "./stores/loading";
import Spinner from "./components/Spinner.vue";

const loadingStore = useLoadingStore();
</script>
