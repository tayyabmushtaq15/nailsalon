import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoadingStore = defineStore("loading", () => {
	const isLoading = ref(false);
	let requestCount = 0;

	function start() {
		requestCount++;
		isLoading.value = true;
	}

	function stop() {
		requestCount--;
		if (requestCount <= 0) {
			isLoading.value = false;
			requestCount = 0;
		}
	}

	return { isLoading, start, stop };
});
