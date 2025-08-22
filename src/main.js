// import { createApp } from 'vue'
// import { createPinia } from 'pinia'
// import './style.css'
// import './assets/main.css' 
// import App from './App.vue'
// import PrimeVue from 'primevue/config'
// import Aura from '@primeuix/themes/aura'
// import router from './components/router' 

// const app = createApp(App);
// app.use(PrimeVue,{
//     theme : {
//         preset : Aura,
//     },
// });
// app.use(createPinia());
// app.use(router);
// app.mount('#app');
import { createApp } from 'vue';
import App from './App.vue';
import router from './components/router';
import PrimeVue from 'primevue/config';

createApp(App)
  .use(router)
  .use(PrimeVue)
  .mount('#app');
