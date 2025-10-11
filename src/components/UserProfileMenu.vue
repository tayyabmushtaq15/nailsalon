<template>
	<div class="flex items-center gap-2 ml-auto">
		<Avatar
			v-if="image"
			:image="image"
			shape="circle"
			class="cursor-pointer w-10 h-10 object-cover"
			@click="toggleMenu($event)"
		/>
		<Avatar
			v-else
			:label="initials"
			shape="circle"
			class="cursor-pointer bg-primary text-white font-semibold w-10 h-10 flex items-center justify-center"
			@click="toggleMenu($event)"
		/>

		<i
			class="pi pi-chevron-down cursor-pointer"
			@click="toggleMenu($event)"
		></i>

		<Menu ref="menu" :model="menuItems" :popup="true" appendTo="body">
			<template #start>
				<div class="px-3 py-2 border-b">
					<p class="text-sm font-semibold">{{ name }}</p>
					<p class="text-xs text-gray-500">{{ email }}</p>
				</div>
			</template>
		</Menu>
	</div>
</template>

<script>
import Avatar from "primevue/avatar";
import Menu from "primevue/menu";

export default {
	name: "UserProfileMenu",
	components: { Avatar, Menu },
	props: {
		name: { type: String, required: true },
		email: { type: String, required: true },
		image: { type: String, default: null }
	},
	computed: {
		initials() {
			if (!this.name) return "?";
			const parts = this.name.trim().split(" ");
			if (parts.length === 1) return parts[0][0].toUpperCase();
			return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
		}
	},
	data() {
		return {
			menuItems: [
				{
					label: "View Profile",
					icon: "pi pi-user",
					command: () => this.$router.push("/profile")
				},
				{
					label: "Settings",
					icon: "pi pi-cog",
					command: () => this.$router.push("/settings")
				},
				{
					separator: true
				},
				{
					label: "Logout",
					icon: "pi pi-sign-out",
					command: this.logout
				}
			]
		};
	},
	methods: {
		toggleMenu(event) {
			this.$refs.menu.toggle(event);
		},
		logout() {
			localStorage.clear();
			window.location.href = "/signin";
		}
	}
};
</script>
