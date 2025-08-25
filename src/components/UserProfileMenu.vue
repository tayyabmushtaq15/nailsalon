<template>
	<div class="flex items-center gap-2 ml-auto">
		<Avatar
			:image="avatar"
			shape="circle"
			class="cursor-pointer"
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
		avatar: {
			type: String,
			default: "https://i.pravatar.cc/40"
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
				}
			]
		};
	},
	methods: {
		toggleMenu(event) {
			this.$refs.menu.toggle(event);
		}
	}
};
</script>
