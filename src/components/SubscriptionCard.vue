<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
	id: String,
	title: String,
	tagline: String,
	price: Number,
	duration: Number,
	features: Array,
	description: Object
});

const emit = defineEmits();

const emitDelete = () => {
	emit("delete", props.id);
};
const emitEdit = (subscription) => {
	emit("edit", props.id);
};
</script>

<template>
	<div
		class="relative w-80 p-8 rounded-2xl bg-gradient-to-b from-gray-950 to-gray-900 text-white shadow-xl border border-gray-800 hover:border-blue-500 hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-2"
	>
		<button
			@click="emitDelete"
			class="absolute top-2 right-2 bg-red-500 text-white rounded-lg p-2 hover:bg-red-600 focus:outline-none text-sm"
		>
			<i class="pi pi-times"></i>
		</button>

		<button
			@click="emitEdit"
			class="absolute top-2 right-14 bg-white text-black rounded-lg p-2 hover:bg-secondary focus:outline-none text-sm"
		>
			<i class="pi pi-pencil"></i>
			Edit
		</button>

		<div class="mb-6">
			<h2 class="text-2xl font-bold tracking-wide">{{ title }}</h2>
			<p class="text-secondary text-sm mt-1">{{ tagline }}</p>
		</div>

		<div class="mb-8">
			<span class="text-5xl font-extrabold">
				<span v-if="price > 0">${{ price }}</span>
				<span v-else>Free</span>
			</span>
			<span class="text-secondary text-base ml-1">
				/ {{ duration > 0 ? duration + " days" : "month" }}
			</span>
		</div>

		<ul class="mb-8 space-y-3">
			<li
				v-for="(item, index) in features"
				:key="index"
				class="flex items-center text-sm text-gray-300"
			>
				<i class="pi pi-check text-blue-500 mr-3"></i>
				<span>{{ item }}</span>
			</li>
		</ul>

		<div class="mb-8">
			<h4 class="font-semibold mb-1 text-gray-200">Description</h4>
			<div v-if="description && typeof description === 'object'">
				<div
					v-for="(value, key) in description"
					:key="key"
					class="text-sm text-gray-400 leading-relaxed"
				>
					<strong class="font-medium text-gray-200">{{ key }}:</strong>
					<p>{{ value }}</p>
				</div>
			</div>
			<div v-else>
				<p class="text-sm text-gray-400">No description available.</p>
			</div>
		</div>

		<Button
			class="w-full rounded-xl !bg-secondary hover:!bg-blue-500 text-white font-semibold py-3 text-lg tracking-wide transition duration-300 shadow-lg hover:shadow-blue-500/40"
		>
			Subscribe
		</Button>
	</div>
</template>
