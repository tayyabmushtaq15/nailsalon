<template>
	<div
		class="min-h-screen flex items-center justify-center relative overflow-hidden bg-lightbg dark:bg-darkbg text-black dark:text-white transition-colors"
	>
		<!-- Background blur layer -->
		<div
			class="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-sm"
		></div>

		<!-- Card -->
		<div
			class="relative w-full max-w-sm p-8 rounded-xl shadow-sm border bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 transition-colors"
		>
			<div class="text-center mb-6">
				<img
					src="../assets/fav.png"
					alt="Caremetrix"
					class="mx-auto w-12 h-12 mb-3"
				/>
				<h1 class="text-3xl font-medium text-primary dark:text-white">
					Nail Salon
				</h1>
				<p class="text-gray-600 dark:text-gray-400 mt-1">
					Sign in to your account
				</p>
			</div>

			<form @submit.prevent="submitForm" class="space-y-4">
				<div>
					<input
						v-model="email"
						type="email"
						placeholder="Email"
						class="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<p v-if="errors.email" class="text-red-500 text-sm mt-1">
						{{ errors.email }}
					</p>
				</div>

				<div>
					<input
						v-model="password"
						type="password"
						placeholder="Password"
						class="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<p v-if="errors.password" class="text-red-500 text-sm mt-1">
						{{ errors.password }}
					</p>
				</div>

				<button
					type="submit"
					class="w-full py-2 rounded-md transition bg-primary text-white hover:bg-secondary dark:bg-blue-600 dark:hover:bg-blue-500"
				>
					Sign in
				</button>
			</form>

			<div class="flex justify-end mt-4 text-sm">
				<router-link
					to="/forgot-password"
					class="text-blue-600 dark:text-blue-400 hover:underline"
				>
					Forgot password?
				</router-link>
			</div>

			<div
				class="mt-12 text-xs text-center text-gray-500 dark:text-gray-400 space-x-2"
			>
				<router-link to="/terms" class="hover:underline"
					>Terms of Use</router-link
				>
				<span>|</span>
				<router-link to="/privacy" class="hover:underline"
					>Privacy Policy</router-link
				>
			</div>
		</div>

		<CustomSnackbar
			v-model:show="showSnackbar"
			:message="snackbarMessage"
			:type="snackbarType"
		/>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { api } from "../services/api";
import CustomSnackbar from "../components/CustomSnackbar.vue";

const email = ref("");
const password = ref("");
const errors = ref({});
const router = useRouter();
const loading = ref(false);

const showSnackbar = ref(false);
const snackbarMessage = ref("");
const snackbarType = ref("success");

function validateForm() {
	errors.value = {};
	if (!email.value) {
		errors.value.email = "Email is required";
	} else if (!/\S+@\S+\.\S+/.test(email.value)) {
		errors.value.email = "Enter a valid email address";
	}
	if (!password.value) {
		errors.value.password = "Password is required";
	}
	return Object.keys(errors.value).length === 0;
}

async function submitForm() {
	if (!validateForm()) return;
	loading.value = true;

	try {
		const res = await api.post("/users/login", {
			email: email.value,
			password: password.value
		});

		if (res.status) {
			localStorage.setItem("token", res.data.token);
			localStorage.setItem("user", JSON.stringify(res.data));

			snackbarMessage.value = res.message || "Login successful!";
			snackbarType.value = "success";
			showSnackbar.value = true;

			router.push("/home");
		} else {
			snackbarMessage.value = res.message || "Invalid email or password.";
			snackbarType.value = "error";
			showSnackbar.value = true;
		}
	} catch (err) {
		console.error("Login error:", err);
		snackbarMessage.value =
			err.response?.data?.message || "Login failed. Please try again.";
		snackbarType.value = "error";
		showSnackbar.value = true;
	} finally {
		loading.value = false;
	}
}
</script>
