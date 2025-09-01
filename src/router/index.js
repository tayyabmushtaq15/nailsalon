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
				component: () => import("../pages/business/Business.vue"),
				children: [
					{
						path: "",
						name: "BusinessHome",
						component: () => import("../pages/business/BusinessOverview.vue")
					},
					{
						path: "add-business",
						name: "AddBusiness",
						component: () => import("../pages/business/AddBusiness.vue")
					}
				]
			},
			{
				path: "subscriptions",
				component: () => import("../pages/subscriptions/Subscriptions.vue"),
				children: [
					{
						path: "",
						name: "SubscriptionOverview",
						component: () =>
							import("../pages/subscriptions/SubscriptionOverview.vue")
					},
					{
						path: "add-subscriptions",
						name: "AddSubscription",
						component: () =>
							import("../pages/subscriptions/AddSubscription.vue")
					},
					{
						path: "edit-subscriptions/:id",
						name: "EditSubscription",
						component: () =>
							import("../pages/subscriptions/EditSubscription.vue")
					}
				]
			},
			{
				path: "users",
				component: () => import("../pages/users/Users.vue"),
				children: [
					{
						path: "",
						name: "usersOverview",
						component: () => import("../pages/users/UsersOverview.vue")
					},
					{
						path: "add-users",
						name: "AddUsers",
						component: () => import("../pages/users/AddUsers.vue")
					},
					{
						path: "edit-users/:id",
						name: "EditUsers",
						component: () => import("../pages/users/EditUser.vue")
					}
				]
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
