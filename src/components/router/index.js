import { createRouter, createWebHistory } from 'vue-router'
import SignIn from "../pages/SignIn.vue"
import Dashboard from "../pages/Dashboard.vue"


const routes = [
  { path: '/signin', name: 'SignIn', component: SignIn },
  { path: '/home', name: 'dashboard', component: Dashboard },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
