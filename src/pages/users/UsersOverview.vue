<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "../../stores/userStore";
import CustomCard from "../../components/CustomCard.vue";
import ConfirmationModal from "../../components/ConfirmationModal.vue";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const toast = useToast();
const router = useRouter();

const columns = [
	{ field: "first_name", header: "First Name", sortable: false },
	{ field: "last_name", header: "Last Name", sortable: false },
	{ field: "email", header: "Email", sortable: false },
	{ field: "role", header: "Role", sortable: false },
	{ field: "status", header: "Status", sortable: false },
	{ field: "phone", header: "Phone", sortable: false }
];

onMounted(() => {
	userStore.fetchUsers();
});

const showConfirmModal = ref(false);
const userToDelete = ref(null);

const handleEdit = (user) => {
	router.push({ name: "EditUsers", params: { id: user.id } });
};

const askDeleteConfirmation = (user) => {
	userToDelete.value = user;
	showConfirmModal.value = true;
};

const confirmDelete = async () => {
	if (!userToDelete.value) return;

	const success = await userStore.deleteUser(userToDelete.value.id);

	if (success) {
		toast.add({
			severity: "success",
			summary: "User Deleted",
			detail: `${userToDelete.value.first_name} ${userToDelete.value.last_name} deleted successfully`,
			life: 2000
		});
	} else {
		toast.add({
			severity: "error",
			summary: "Delete Failed",
			detail: `Could not delete ${userToDelete.value.first_name} ${userToDelete.value.last_name}`,
			life: 3000
		});
	}

	userToDelete.value = null;
};
</script>

<template>
	<div class="p-1">
		<div class="flex flex-row justify-between items-end mb-2 p-2">
			<h2 class="text-xl font-semibold mb-4">Users</h2>
			<Button
				class="w-auto rounded-lg p-2 !bg-primary hover:!bg-secondary text-white font-semibold text-md tracking-wide transition duration-300"
				@click="router.push('/users/add-users')"
			>
				+ Add New User
			</Button>
		</div>

		<div
			v-if="userStore.users.length"
			class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 auto-rows-fr"
		>
			<CustomCard
				v-for="user in userStore.users"
				:key="user.id"
				:user="user"
				@edit="handleEdit"
				@delete="askDeleteConfirmation"
				class="w-full h-full"
			/>
		</div>

		<p v-else class="text-center text-gray-500 mt-6">No users found.</p>

		<ConfirmationModal
			v-model:visible="showConfirmModal"
			title="Delete User"
			:message="`Are you sure you want to delete ${userToDelete?.first_name} ${userToDelete?.last_name}?`"
			@confirm="confirmDelete"
			@cancel="userToDelete = null"
		/>
	</div>
</template>
