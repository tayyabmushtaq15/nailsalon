// /stores/customFields.js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCustomFieldsStore = defineStore("customFields", () => {
	const fields = ref({});

	function setFields(newFields) {
		fields.value = { ...newFields };
	}

	function addField(key, value) {
		fields.value = { ...fields.value, [key]: value };
	}

	function updateField(key, value) {
		if (fields.value[key] !== undefined) {
			fields.value[key] = value;
		}
	}

	function deleteField(key) {
		const copy = { ...fields.value };
		delete copy[key];
		fields.value = copy;
	}

	return { fields, setFields, addField, updateField, deleteField };
});
