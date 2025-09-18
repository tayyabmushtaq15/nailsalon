<template>
	<div
		class="flex flex-col h-full p-4 bg-gray-100 dark:bg-gray-800 transition-colors"
	>
		<div class="flex items-center gap-2 mb-6">
			<img
				src="../assets/fav.png"
				alt="NailSalon Logo"
				class="logo-img w-10 h-10"
			/>
			<h2 class="text-black dark:text-white text-xl font-bold">
				NailSalon.club
			</h2>
			<button
				class="md:hidden self-end text-gray-600 dark:text-gray-400 hover:text-red-600 ml-2 rounded-sm p-1"
				@click="$emit('close')"
			>
				<i class="pi pi-times text-xl"></i>
			</button>
		</div>

		<!-- Navigation -->
		<ul class="list-none p-0 flex-1">
			<li v-for="link in links" :key="link.to" class="mb-2">
				<SidebarSubmenu
					v-if="link.children"
					:label="link.label"
					:icon="link.icon"
					:items="link.children"
					:to="link.to"
					@close="$emit('close')"
				/>
				<router-link
					v-else
					:to="link.to"
					class="flex items-center text-black dark:text-gray-200 text-lg rounded-md p-2 transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400"
					active-class="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-semibold"
					exact-active-class="bg-blue-200 dark:bg-blue-800 text-blue-700 dark:text-blue-300 font-bold"
					@click="$emit('close')"
				>
					<i :class="['pi', link.icon, 'mr-4 text-2xl']"></i>
					{{ link.label }}
				</router-link>
			</li>
		</ul>

		<button
			@click="logout"
			class="mt-auto flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-red-600 border-2 border-gray-300 dark:border-gray-700 rounded-md px-4 py-2 transition-colors duration-200 hover:border-red-600"
		>
			<i class="pi pi-sign-out"></i>
			Logout
		</button>
	</div>
</template>

<script>
import SidebarSubmenu from "../components/SidebarSubMenu.vue";

export default {
	name: "Sidebar",
	components: { SidebarSubmenu },
	data() {
		return {
			links: [
				{ to: "/home", label: "Home", icon: "pi-home" },
				{ to: "/users", label: "Users", icon: "pi-users" },
				{ to: "/business", label: "Business", icon: "pi-briefcase" },
				{ to: "/coupons", label: "Coupons", icon: "pi-tags" },
				{
					to: "/subscriptions",
					label: "Available Subscriptions",
					icon: "pi-credit-card"
				},
				{
					to: "/printing-service-providers",
					label: "Printing service providers",
					icon: "pi-print"
				},
				{ to: "/banners", label: "Banner Templates", icon: "pi-image" },
				{ to: "/banner-req", label: "Banner Request", icon: "pi-images" },
				{ to: "/settings", label: "Settings", icon: "pi-cog" }
			]
		};
	},
	methods: {
		logout() {
			localStorage.clear();
			this.$router.push("/signin");
		}
	}
};
</script>
