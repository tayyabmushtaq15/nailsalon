import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", {
	state: () => ({
		theme: localStorage.getItem("theme") || "light"
	}),
	actions: {
		setTheme(newTheme) {
			this.theme = newTheme;
			localStorage.setItem("theme", newTheme);

			// Toggle Tailwind dark mode
			if (newTheme === "dark") {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}
		},
		toggleTheme() {
			this.setTheme(this.theme === "light" ? "dark" : "light");
		}
	}
});
