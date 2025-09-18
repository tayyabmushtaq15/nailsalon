import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./main.css";

import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import "primeicons/primeicons.css";
import { useThemeStore } from "./stores/themeStore";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(PrimeVue, {
	theme: {
		preset: Aura,
		options: {
			darkModeSelector: ".dark" // 🔥 tells PrimeVue to follow Tailwind’s dark class
		}
	}
});

const themeStore = useThemeStore();
themeStore.setTheme(themeStore.theme);
app.use(ToastService);
app.component("Toast", Toast);

app.mount("#app");
