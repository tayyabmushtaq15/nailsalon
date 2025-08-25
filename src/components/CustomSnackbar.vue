<script>
import { useToast } from "primevue/usetoast";

export default {
	name: "CustomSnackbar",
	props: {
		show: { type: Boolean, default: false },
		message: { type: String, required: true },
		type: {
			type: String,
			default: "success",
			validator: (value) =>
				["success", "error", "warning", "loading"].includes(value)
		},
		duration: { type: Number, default: 3000 }
	},
	setup() {
		const toast = useToast();
		return { toast };
	},
	watch: {
		show(newVal) {
			if (newVal) {
				this.showToast();
			}
		}
	},
	methods: {
		showToast() {
			const base =
				"flex flex-row items-center w-80 gap-3 rounded-lg px-2 py-3 shadow-md border text-sm font-medium transition transform";

			let styleClass = "";
			switch (this.type) {
				case "success":
					styleClass = `${base} bg-green-50 text-green-700 border-green-300 animate-slide-in`;
					break;
				case "error":
					styleClass = `${base}  bg-red-50 text-red-700 border-red-300 animate-slide-in`;
					break;
				case "warning":
					styleClass = `${base} bg-yellow-50 text-yellow-700 border-yellow-300 animate-slide-in`;
					break;
				case "loading":
					styleClass = `${base} bg-blue-50 text-blue-700 border-blue-300 animate-pulse animate-slide-in`;
					break;
				default:
					styleClass = `${base} bg-gray-50 text-gray-700 border-gray-300 animate-slide-in`;
			}

			this.toast.add({
				severity: this.type === "loading" ? "info" : this.type,
				summary: this.type.charAt(0).toUpperCase() + this.type.slice(1),
				detail: this.message,
				life: this.type === "loading" ? null : this.duration,
				styleClass
			});

			if (this.type !== "loading") {
				this.$emit("update:show", false);
			}
		}
	}
};
</script>

<template>
	<div></div>
</template>

<style scoped>
@keyframes slideIn {
	from {
		opacity: 0;
		transform: translateX(100%);
	}
	to {
		opacity: 1;
		transform: translateX(0);
	}
}

.animate-slide-in {
	animation: slideIn 0.4s ease-out;
}
</style>
