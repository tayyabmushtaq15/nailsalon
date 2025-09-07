<template>
	<div class="max-w-lg mx-auto mt-8 p-6 bg-white shadow rounded-lg">
		<h1 class="text-2xl font-bold text-gray-800 mb-6">Add New Business</h1>

		<form @submit.prevent="handleSubmit" class="space-y-4">
			<div>
				<label
					for="businessName"
					class="block text-sm font-medium text-gray-700 mb-1"
				>
					Business Name
				</label>
				<input
					type="text"
					id="businessName"
					v-model="formData.businessName"
					required
					class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
				/>
			</div>

			<div>
				<label
					for="address"
					class="block text-sm font-medium text-gray-700 mb-1"
				>
					Address
				</label>
				<input
					type="text"
					id="address"
					v-model="formData.address"
					required
					class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
				/>
			</div>

			<div>
				<label for="phone" class="block text-sm font-medium text-gray-700 mb-1">
					Phone Number
				</label>
				<input
					type="tel"
					id="phone"
					v-model="formData.phone"
					required
					class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
				/>
			</div>

			<div>
				<label for="email" class="block text-sm font-medium text-gray-700 mb-1">
					Email
				</label>
				<input
					type="email"
					id="email"
					v-model="formData.email"
					required
					class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
				/>
			</div>

			<button
				type="submit"
				class="w-full bg-primary text-white py-2 rounded-md hover:bg-secondary transition-colors"
			>
				Add Business
			</button>
		</form>
	</div>
</template>

<script>
export default {
	name: "AddBusiness",
	data() {
		return {
			formData: {
				businessName: "",
				address: "",
				phone: "",
				email: ""
			}
		};
	},
	methods: {
		handleSubmit() {
			console.log("Form submitted:", this.formData);
		}
	}
};
</script>
