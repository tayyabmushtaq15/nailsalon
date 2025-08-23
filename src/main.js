import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./main.css";
import PrimeVue from "primevue/config";

const app = createApp(App);

app.use(router);
app.use(PrimeVue, { unstyled: true });

app.mount("#app");
