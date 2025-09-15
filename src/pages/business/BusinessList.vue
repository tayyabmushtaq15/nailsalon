<script setup>
import { ref, onMounted } from "vue";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Card from "primevue/card";
import { useToast } from "primevue/usetoast";
import { api } from "../../services/api";
import { Button, Tag } from "primevue";
import { useRouter } from "vue-router";

const toast = useToast();

const businesses = ref([]);
const awaitingBusinesses = ref([]);
const rejectedBusinesses = ref([]);
const loading = ref(false);
const activeIndex = ref(0); // track current tab
const router = useRouter();

async function fetchBusinesses(type) {
	try {
		loading.value = true;
		if (type === "all") {
			const res = await api.get("/businesses");
			businesses.value = res?.data?.businesses || [];
		}
		if (type === "approval") {
			const res = await api.get("/businesses/approval");
			awaitingBusinesses.value = res?.data?.businesses || [];
		}
		if (type === "rejected") {
			const res = await api.get("/businesses/reject");
			rejectedBusinesses.value = res?.data?.businesses || [];
		}
	} catch (err) {
		toast.add({
			severity: "error",
			summary: "Error",
			detail: err?.response?.data?.message || "Failed to load businesses",
			life: 3000
		});
	} finally {
		loading.value = false;
	}
}

async function approveBusiness(businessId) {
	try {
		await api.put(`/businesses/approval/${businessId}`);
		toast.add({
			severity: "success",
			summary: "Approved",
			detail: "Business approved successfully",
			life: 3000
		});
		fetchBusinesses("approval");
		fetchBusinesses("all");
		fetchBusinesses("rejected");
	} catch (err) {
		toast.add({
			severity: "error",
			summary: "Error",
			detail: "Failed to approve business",
			life: 3000
		});
	}
}

async function deactivateBusiness(businessId) {
	try {
		await api.put(`/businesses/reject/${businessId}`);
		toast.add({
			severity: "success",
			summary: "Deactivated",
			detail: "Business deactivated successfully",
			life: 3000
		});
		fetchBusinesses("all");
		fetchBusinesses("approval");
		fetchBusinesses("rejected");
	} catch (err) {
		toast.add({
			severity: "error",
			summary: "Error",
			detail: "Failed to deactivate business",
			life: 3000
		});
	}
}

const goToAddBusiness = () => {
	router.push("/business/business-login");
};

// Load initial tabs
onMounted(() => {
	fetchBusinesses("all");
});

// Handle tab change
const onTabChange = (e) => {
	activeIndex.value = e.index;
	if (e.index === 0 && businesses.value.length === 0) fetchBusinesses("all");
	if (e.index === 1 && awaitingBusinesses.value.length === 0)
		fetchBusinesses("approval");
	if (e.index === 2 && rejectedBusinesses.value.length === 0)
		fetchBusinesses("rejected");
};
</script>

<template>
	<div class="p-1">
		<div class="flex flex-row justify-between items-center mb-2">
			<h2 class="text-2xl font-semibold mb-4">Businesses</h2>
			<Button
				class="w-auto rounded-lg p-2 !bg-primary hover:!bg-secondary text-white font-semibold text-md tracking-wide transition duration-300"
				@click="goToAddBusiness"
			>
				+ Add New Business
			</Button>
		</div>

		<TabView v-model:activeIndex="activeIndex" @tab-change="onTabChange">
			<!-- all -->
			<TabPanel header="All">
				<div v-if="loading" class="text-center py-8 text-gray-500">
					Loading...
				</div>
				<div
					v-else-if="businesses.length"
					class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
				>
					<Card
						v-for="biz in businesses"
						:key="biz.id"
						class="shadow-sm border rounded-2xl hover:shadow-lg transition p-4 relative"
					>
						<template #title>
							<div
								class="flex justify-between items-center cursor-pointer"
								@click="router.push(`/business/business-details/${biz.id}`)"
							>
								<span class="font-semibold text-lg truncate">{{
									biz.name
								}}</span>
								<Tag
									:severity="
										biz.status === 'all'
											? 'success'
											: biz.status === 'rejected'
												? 'danger'
												: 'info'
									"
									:value="biz.status"
									class="capitalize"
								/>
							</div>
						</template>

						<template #content>
							<div
								class="space-y-2 mt-2 text-gray-600 cursor-pointer"
								@click="router.push(`/business/business-details/${biz.id}`)"
							>
								<p class="text-sm">📍 {{ biz.address }}</p>
								<p class="text-sm">📧 {{ biz.support_email }}</p>
								<p class="text-sm">📞 {{ biz.support_phone }}</p>
								<p class="text-xs text-gray-400 pt-2 border-t">
									Registered by:
									<span class="font-medium">{{
										biz.registered_by?.registered_by || "N/A"
									}}</span>
								</p>
							</div>
							<div v-if="biz.status === 'ACTIVE'" class="mt-3 flex justify-end">
								<Button
									label="Deactivate"
									class="!bg-red-600 hover:!bg-red-700 text-white font-medium px-4 py-2 rounded-md"
									@click.stop="deactivateBusiness(biz.id)"
								/>
							</div>
						</template>
					</Card>
				</div>
				<p v-else class="text-gray-500 text-center py-8">
					No businesses found.
				</p>
			</TabPanel>

			<!-- Awaiting Approval -->
			<TabPanel header="Awaiting Approval">
				<div v-if="loading" class="text-center py-8 text-gray-500">
					Loading...
				</div>
				<div
					v-else-if="awaitingBusinesses.length"
					class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
				>
					<Card
						v-for="biz in awaitingBusinesses"
						:key="biz.id"
						class="shadow-sm border rounded-2xl hover:shadow-lg transition p-4 relative"
					>
						<template #title>
							<div class="flex justify-between items-center">
								<span class="font-semibold text-lg truncate">{{
									biz.name
								}}</span>
								<Tag severity="warn" value="Pending" />
							</div>
						</template>
						<template #content>
							<div class="space-y-2 mt-2 text-gray-600">
								<p class="text-sm">📍 {{ biz.address }}</p>
								<p class="text-sm">📧 {{ biz.support_email }}</p>
								<p class="text-sm">📞 {{ biz.support_phone }}</p>
								<p class="text-xs text-gray-400 pt-2 border-t">
									Registered by:
									<span class="font-medium">{{
										biz.registered_by?.registered_by || "N/A"
									}}</span>
								</p>
							</div>
							<div class="mt-3 flex justify-end">
								<Button
									label="Approve"
									class="!bg-green-600 hover:!bg-green-700 text-white font-medium px-4 py-2 rounded-md"
									@click="approveBusiness(biz.id)"
								/>
							</div>
						</template>
					</Card>
				</div>
				<p v-else class="text-gray-500 text-center py-8">
					No businesses awaiting approval.
				</p>
			</TabPanel>

			<!-- Rejected -->
			<TabPanel header="Rejected">
				<div v-if="loading" class="text-center py-8 text-gray-500">
					Loading...
				</div>
				<div
					v-else-if="rejectedBusinesses.length"
					class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
				>
					<Card
						v-for="biz in rejectedBusinesses"
						:key="biz.id"
						class="shadow-sm border rounded-2xl hover:shadow-lg transition p-4 relative"
					>
						<template #title>
							<div class="flex justify-between items-center">
								<span class="font-semibold text-lg truncate">{{
									biz.name
								}}</span>
								<Tag severity="danger" value="Rejected" />
							</div>
						</template>
						<template #content>
							<div class="space-y-2 mt-2 text-gray-600">
								<p class="text-sm">📍 {{ biz.address }}</p>
								<p class="text-sm">📧 {{ biz.support_email }}</p>
								<p class="text-sm">📞 {{ biz.support_phone }}</p>
								<p class="text-xs text-gray-400 pt-2 border-t">
									Registered by:
									<span class="font-medium">{{
										biz.registered_by?.registered_by || "N/A"
									}}</span>
								</p>
							</div>
							<div class="mt-3 flex justify-end">
								<Button
									label="Approve"
									class="!bg-green-600 hover:!bg-green-700 text-white font-medium px-4 py-2 rounded-md"
									@click="approveBusiness(biz.id)"
								/>
							</div>
						</template>
					</Card>
				</div>
				<p v-else class="text-gray-500 text-center py-8">
					No rejected businesses found.
				</p>
			</TabPanel>
		</TabView>
	</div>
</template>
