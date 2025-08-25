<template>
	<div class="banners-page">
		<h1>Banners</h1>
		<p>Welcome to the Banners page. Content coming soon.</p>
		<BaseButton label="Save" buttonType="primary" @click="saveData" />
		<BaseButton label="Edit" buttonType="secondary" />
		<BaseButton label="Cancel" buttonType="ghost" />
		<BaseButton label="Delete" buttonType="delete" />
	</div>
</template>

<script setup>
import BaseButton from "../components/Button.vue";
const saveData = () => {
	console.log("Button clicked!");
};
</script>

<style scoped>
.banners-page {
	padding: 2rem;
	text-align: center;
}
</style>
