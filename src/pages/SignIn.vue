<template>
	<div
		class="min-h-screen flex items-center justify-center relative overflow-hidden"
	>
		<!-- <div
			class="absolute inset-0 bg-cover bg-center"
			:style="{ backgroundImage: `url(${nailImage})` }"
		></div> -->

		<div class="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>

		<div
			class="relative w-full max-w-sm p-8 bg-white rounded-xl shadow-sm border border-gray-300"
		>
			<div class="text-center mb-6">
				<img
					src="../assets/fav.png"
					alt="Caremetrix"
					class="mx-auto w-12 h-12 mb-3"
				/>
				<h1 class="text-3xl font-medium text-primary">Nail Salon</h1>
				<p class="text-gray-600 mt-1">Sign in to your account</p>
			</div>

			<form @submit.prevent="submitForm" class="space-y-4">
				<input
					v-model="email"
					type="email"
					placeholder="Email"
					class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>

				<input
					v-model="password"
					type="password"
					placeholder="Password"
					class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>

				<button
					type="submit"
					class="w-full bg-primary text-white py-2 rounded-md hover:bg-secondary transition"
				>
					Sign in
				</button>
			</form>

			<div class="flex justify-end mt-4 text-sm">
				<router-link
					to="/forgot-password"
					class="text-blue-600 hover:underline"
				>
					Forgot password?
				</router-link>
			</div>

			<div class="mt-12 text-xs text-center text-gray-500 space-x-2">
				<router-link to="/terms" class="hover:underline"
					>Terms of Use</router-link
				>
				<span>|</span>
				<router-link to="/privacy" class="hover:underline"
					>Privacy Policy</router-link
				>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import nailImage from "../assets/nailImage.jpeg";

const email = ref("");
const password = ref("");
const router = useRouter();

function submitForm() {
	const token = "fake-jwt-token";
	localStorage.setItem("token", token);
	console.log("Logged in:", email.value);
	router.push("/home");
}
</script>
