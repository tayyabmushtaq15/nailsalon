<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const router = useRouter();

const goTo = (to) => {
	router.push(to);
};

const breadcrumbs = computed(() => {
	const matched = route.matched.filter((r) => r.meta?.breadcrumb);

	// If there are 2 matched routes, and the first is the module root
	// but current path === module root, only keep the last one
	if (matched.length > 1 && matched[0].path === route.path) {
		return [matched[0]];
	}

	return matched.map((r, idx, arr) => ({
		label: r.meta.breadcrumb,
		to: idx < arr.length - 1 ? { path: r.path, params: route.params } : null
	}));
});
</script>

<template>
	<nav class="text-sm text-gray-600 mb-4">
		<ol class="flex items-center space-x-2">
			<template v-for="(crumb, idx) in breadcrumbs" :key="idx">
				<li class="flex items-center">
					<span v-if="idx > 0" class="mx-2">/</span>
					<span
						v-if="crumb.to"
						class="cursor-pointer text-blue-600 hover:underline"
						@click="goTo(crumb.to)"
					>
						{{ crumb.label }}
					</span>
					<span v-else class="font-medium text-gray-800">
						{{ crumb.label }}
					</span>
				</li>
			</template>
		</ol>
	</nav>
</template>
