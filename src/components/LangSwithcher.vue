<template>
	<div
		class="fixed bottom-5 right-5 bg-white shadow-lg rounded-full p-3 flex gap-2 items-center"
	>
		<button
			v-for="lang in languages"
			:key="lang.code"
			class="px-3 py-1 rounded-full bg-blue-500 text-white text-sm hover:bg-blue-600"
			@click="changeLanguage(lang.code)"
		>
			{{ lang.label }}
		</button>
	</div>
</template>

<script setup>
import { onMounted } from "vue";

const languages = [
	{ code: "en", label: "English" },
	{ code: "vi", label: "Vietnamese" }
];

function changeLanguage(lang) {
	const select = document.querySelector(".goog-te-combo");
	if (select) {
		select.value = lang;
		select.dispatchEvent(new Event("change"));
	}
}

onMounted(() => {
	// Ensure Google Translate widget has loaded
	setTimeout(() => {
		const select = document.querySelector(".goog-te-combo");
		if (select) {
			select.value = "en";
		}
	}, 1000);
});
</script>
