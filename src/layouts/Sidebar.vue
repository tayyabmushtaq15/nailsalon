<template>
	<div class="flex flex-col h-full p-4">
		<div class="flex items-center gap-2 mb-6">
			<img
				src="../assets/fav.png"
				alt="NailSalon Logo"
				class="logo-img w-10 h-10"
			/>
			<h2 class="text-black text-xl font-bold">NailSalon.club</h2>
			<button
				class="md:hidden self-end text-gray-600 hover:text-red-600 ml-2 rounded-sm p-1"
				@click="$emit('close')"
			>
				<i class="pi pi-times text-xl"></i>
			</button>
		</div>

		<!-- Navigation -->
		<ul class="list-none p-0 flex-1">
			<li v-for="link in links" :key="link.to" class="mb-2">
				<!-- Use Submenu if link has children -->
				<SidebarSubmenu
					v-if="link.children"
					:label="link.label"
					:icon="link.icon"
					:items="link.children"
					:to="link.to"
					@close="$emit('close')"
				/>
				<!-- Normal Links -->
				<router-link
					v-else
					:to="link.to"
					class="flex items-center text-black text-lg rounded-md p-2 transition-colors duration-200 hover:bg-gray-200 hover:text-blue-600"
					active-class="bg-blue-100 text-blue-600 font-semibold"
					exact-active-class="bg-blue-200 text-blue-700 font-bold"
					@click="$emit('close')"
				>
					<i :class="['pi', link.icon, 'mr-4 text-2xl']"></i>
					{{ link.label }}
				</router-link>
			</li>
		</ul>

		<button
			@click="logout"
			class="mt-auto flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 border-2 border-gray-300 rounded-md px-4 py-2 transition-colors duration-200 hover:border-red-600"
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

				{
					to: "/business",
					label: "Business",
					icon: "pi-briefcase",
					children: [
						{
							to: "/business/add-business",
							label: "Add Business",
							icon: "pi-plus"
						},
						{ to: "/business/list", label: "View Businesses", icon: "pi-list" },
						{ to: "/business/reports", label: "Reports", icon: "pi-chart-line" }
					]
				},
				{ to: "/banners", label: "Banners", icon: "pi-image" },
				{ to: "/settings", label: "Settings", icon: "pi-cog" },
				{ to: "/privacy-policy", label: "Privacy Policy", icon: "pi-lock" },
				{ to: "/terms-and-conditions", label: "Terms", icon: "pi-book" }
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
