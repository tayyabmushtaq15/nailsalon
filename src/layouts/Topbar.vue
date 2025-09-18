<template>
	<div
		class="topbar h-12 bg-gray-50 dark:bg-gray-700 flex items-center justify-between px-4 shadow transition-colors"
	>
		<button
			class="md:hidden text-gray-700 dark:text-gray-300"
			@click="$emit('toggleSidebar')"
		>
			<i class="pi pi-bars text-xl"></i>
		</button>

		<UserProfileMenu
			:name="user?.first_name + ' ' + user?.last_name"
			:email="user?.email"
			@logout="logout"
		/>
	</div>
</template>

<script>
import UserProfileMenu from "../components/UserProfileMenu.vue";

export default {
	name: "Topbar",
	components: { UserProfileMenu },
	data() {
		return { user: null };
	},
	created() {
		const savedUser = localStorage.getItem("user");
		if (savedUser) this.user = JSON.parse(savedUser);
	},
	methods: {
		logout() {
			localStorage.removeItem("token");
			localStorage.removeItem("user");
			this.$router.push("/signin");
		}
	}
};
</script>
