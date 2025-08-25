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

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(PrimeVue, {
	theme: {
		preset: Aura
	}
});

app.use(ToastService);
app.component("Toast", Toast);

app.mount("#app");
