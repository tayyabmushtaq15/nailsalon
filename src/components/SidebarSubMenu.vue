<template>
	<li class="mb-2">
		<div
			class="flex items-center justify-between text-black text-lg rounded-md p-2 transition-colors duration-200 hover:bg-gray-200 hover:text-blue-600"
		>
			<router-link
				:to="to"
				class="flex items-center flex-1"
				active-class="bg-blue-100 text-blue-600 font-semibold px-3 py-2 rounded-md -ml-2"
				exact-active-class="bg-blue-200 text-blue-700 font-bold"
				@click="$emit('close')"
			>
				<i :class="['pi', icon, 'mr-3 text-2xl']"></i>
				{{ label }}
			</router-link>

			<i
				:class="[
					'pi',
					isOpen ? 'pi-chevron-up' : 'pi-chevron-down',
					'cursor-pointer ml-2'
				]"
				@click.stop="toggle"
			></i>
		</div>

		<Transition name="fade">
			<ul v-if="isOpen" class="ml-8 mt-2 list-none p-0">
				<li v-for="item in items" :key="item.to" class="mb-1">
					<router-link
						:to="item.to"
						class="flex items-center text-gray-700 text-sm rounded-md p-2 transition-colors duration-200 hover:bg-gray-100 hover:text-blue-600"
						active-class="bg-blue-100 text-blue-600 font-semibold"
						exact-active-class="bg-blue-200 text-blue-700 font-bold"
						@click="$emit('close')"
					>
						<i :class="['pi', item.icon, 'mr-2 text-lg']"></i>
						{{ item.label }}
					</router-link>
				</li>
			</ul>
		</Transition>
	</li>
</template>

<script>
export default {
	name: "SidebarSubmenu",
	props: {
		to: { type: String, required: true },
		label: { type: String, required: true },
		icon: { type: String, default: "pi-folder" },
		items: { type: Array, required: true }
	},
	data() {
		return { isOpen: false };
	},
	methods: {
		toggle() {
			this.isOpen = !this.isOpen;
		}
	}
};
</script>
