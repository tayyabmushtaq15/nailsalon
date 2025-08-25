<template>
  <div class="min-h-screen flex items-center justify-center relative overflow-hidden">
    <div class="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>

    <div class="relative w-full max-w-sm p-8 bg-white rounded-xl shadow-sm border border-gray-300">
      <div class="text-center mb-6">
        <img src="../assets/fav.png" alt="Caremetrix" class="mx-auto w-12 h-12 mb-3" />
        <h1 class="text-3xl font-medium text-primary">Nail Salon</h1>
        <p class="text-gray-600 mt-1">Sign in to your account</p>
      </div>

      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
        </div>

        <div>
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
        </div>

        <button
          type="submit"
          class="w-full bg-primary text-white py-2 rounded-md hover:bg-secondary transition"
        >
          Sign in
        </button>
      </form>

      <!-- API error -->
      <p v-if="auth.error" class="text-red-500 text-sm text-center mt-3">{{ auth.error }}</p>

      <div class="flex justify-end mt-4 text-sm">
        <router-link to="/forgot-password" class="text-blue-600 hover:underline">
          Forgot password?
        </router-link>
      </div>

      <div class="mt-12 text-xs text-center text-gray-500 space-x-2">
        <router-link to="/terms" class="hover:underline">Terms of Use</router-link>
        <span>|</span>
        <router-link to="/privacy" class="hover:underline">Privacy Policy</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "../stores/auth.js"

const email = ref("")
const password = ref("")
const errors = ref({})
const router = useRouter()
const auth = useAuthStore()

function validateForm() {
  errors.value = {}
  if (!email.value) {
    errors.value.email = "Email is required"
  } else if (!/\S+@\S+\.\S+/.test(email.value)) {
    errors.value.email = "Enter a valid email address"
  }
  if (!password.value) {
    errors.value.password = "Password is required"
  }
  return Object.keys(errors.value).length === 0
}

async function submitForm() {
  if (!validateForm()) return

  const success = await auth.login({ email: email.value, password: password.value })
  if (success) {
    router.push("/home")
  }
}
</script>
