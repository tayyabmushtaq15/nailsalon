import { createRouter, createWebHistory } from "vue-router";
import SignIn from "../pages/SignIn.vue";
import Dashboard from "../pages/Dashboard.vue";
import Layout from "../layouts/AppLayout.vue";

function isAuthenticated() {
	return localStorage.getItem("token");
}

const routes = [
	{
		path: "/signin",
		name: "SignIn",
		component: SignIn,
		meta: { requiresAuth: false }
	},
	{
		path: "/",
		component: Layout,
		meta: { requiresAuth: true },
		children: [
			{ path: "home", name: "Dashboard", component: Dashboard },
			{
				path: "business",
				name: "Business",
				component: () => import("../pages/Business.vue")
			},
			{
				path: "banners",
				name: "Banners",
				component: () => import("../pages/Banners.vue")
			},
			{
				path: "settings",
				name: "Settings",
				component: () => import("../pages/Settings.vue")
			},
			{
				path: "terms-and-conditions",
				name: "Terms",
				component: () => import("../pages/Terms.vue")
			},
			{
				path: "privacy-policy",
				name: "PrivacyPolicy",
				component: () => import("../pages/PrivacyPolicy.vue")
			}
		]
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

router.beforeEach((to, from, next) => {
	if (to.meta.requiresAuth && !isAuthenticated()) {
		next("/signin");
	} else if (to.path === "/signin" && isAuthenticated()) {
		next("/home");
	} else {
		next();
	}
});

export default router;
