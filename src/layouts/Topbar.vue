<template>
	<div
		class="topbar h-12 bg-gray-50 flex items-center justify-between px-4 shadow"
	>
		<button class="md:hidden text-gray-700" @click="$emit('toggleSidebar')">
			<i class="pi pi-bars text-xl"></i>
		</button>

		<UserProfileMenu
			name="John Doe"
			email="johndoe@example.com"
			@logout="logout"
		/>
	</div>
</template>

<script>
import UserProfileMenu from "../components/UserProfileMenu.vue";

export default {
	name: "Topbar",
	components: { UserProfileMenu },
	methods: {
		logout() {
			alert("Logged out!");
		}
	}
};
</script>
