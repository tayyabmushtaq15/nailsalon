<script setup>
import { defineProps, defineEmits } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";

const props = defineProps({
	columns: {
		type: Array,
		required: true
	},
	data: {
		type: Array,
		required: true
	},
	showActions: {
		type: Boolean,
		default: false
	}
});

const emit = defineEmits(["edit", "delete"]);
</script>

<template>
	<!-- scroll container -->
	<div
		class="p-4 bg-white rounded-2xl shadow-md border border-gray-200 overflow-x-auto"
	>
		<DataTable
			:value="data"
			paginator
			:rows="5"
			class=""
			:pt="{
				table: { class: 'border-collapse' },
				headerRow: { class: 'bg-blue-600 text-white' },
				headerCell: {
					class: 'px-4 py-2 text-left font-semibold text-white text-sm'
				},
				bodyCell: { class: 'px-4 py-2 border-b' }
			}"
		>
			<!-- dynamic columns -->
			<Column
				v-for="col in columns"
				:key="col.field"
				:field="col.field"
				:header="col.header"
				:sortable="col.sortable || false"
			>
				<template #body="slotProps">
					<slot :name="col.field" v-bind="slotProps">
						{{ slotProps.data[col.field] }}
					</slot>
				</template>
			</Column>

			<!-- actions column -->
			<Column v-if="showActions" header="Actions">
				<template #header>
					<span class="text-white">Actions</span>
				</template>
				<template #body="slotProps">
					<div class="flex gap-2 justify-center">
						<Button
							icon="pi pi-pencil"
							severity="info"
							rounded
							text
							@click="$emit('edit', slotProps.data)"
						/>
						<Button
							icon="pi pi-trash"
							severity="danger"
							rounded
							text
							@click="$emit('delete', slotProps.data)"
						/>
					</div>
				</template>
			</Column>
		</DataTable>
	</div>
</template>
