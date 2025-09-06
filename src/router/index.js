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
			{
				path: "home",
				name: "Dashboard",
				component: Dashboard
			},
			{
				path: "business",
				component: () => import("../pages/business/Business.vue"),
				children: [
					{
						path: "",
						name: "BusinessLogin",
						component: () => import("../pages/business/BusinessLogin.vue"),
						meta: { breadcrumb: "Business Login" }
					},
					{
						path: "business-home",
						name: "BusinessOverview",
						component: () => import("../pages/business/BusinessOverview.vue"),
						meta: { breadcrumb: "Business Overview" }
					},
					{
						path: "add-business",
						name: "AddBusiness",
						component: () => import("../pages/business/AddBusiness.vue"),
						meta: { breadcrumb: "Add Business" }
					}
				],
				meta: { breadcrumb: "Business" }
			},
			{
				path: "subscriptions",
				component: () => import("../pages/subscriptions/Subscriptions.vue"),
				children: [
					{
						path: "",
						name: "SubscriptionOverview",
						component: () =>
							import("../pages/subscriptions/SubscriptionOverview.vue"),
						meta: { breadcrumb: "Subscriptions" }
					},
					{
						path: "add-subscriptions",
						name: "AddSubscription",
						component: () =>
							import("../pages/subscriptions/AddSubscription.vue"),
						meta: { breadcrumb: "Add Subscription" }
					},
					{
						path: "edit-subscriptions/:id",
						name: "EditSubscription",
						component: () =>
							import("../pages/subscriptions/EditSubscription.vue"),
						meta: { breadcrumb: "Edit Subscription" }
					}
				],
				meta: { breadcrumb: "Subscriptions" }
			},
			{
				path: "users",
				component: () => import("../pages/users/Users.vue"),
				children: [
					{
						path: "",
						name: "usersOverview",
						component: () => import("../pages/users/UsersOverview.vue"),
						meta: { breadcrumb: "Users" }
					},
					{
						path: "add-users",
						name: "AddUsers",
						component: () => import("../pages/users/AddUsers.vue"),
						meta: { breadcrumb: "Add User" }
					},
					{
						path: "edit-users/:id",
						name: "EditUsers",
						component: () => import("../pages/users/EditUser.vue"),
						meta: { breadcrumb: "Edit User" }
					}
				],
				meta: { breadcrumb: "Users" }
			},
			{
				path: "coupons",
				component: () => import("../pages/coupons/Coupons.vue"),
				children: [
					{
						path: "",
						name: "CouponsOverview",
						component: () => import("../pages/coupons/CouponsOverview.vue"),
						meta: { breadcrumb: "Coupons" }
					},
					{
						path: "add-coupons",
						name: "AddCoupons",
						component: () => import("../pages/coupons/AddCoupons.vue"),
						meta: { breadcrumb: "Add Coupon" }
					},
					{
						path: "edit-coupons/:id",
						name: "EditCoupons",
						component: () => import("../pages/coupons/EditCoupons.vue"),
						meta: { breadcrumb: "Edit Coupon" }
					}
				],
				meta: { breadcrumb: "Coupons" }
			},
			{
				path: "banners",
				name: "Banners",
				component: () => import("../pages/Banners.vue"),
				meta: { breadcrumb: "Banners" }
			},
			{
				path: "settings",
				name: "Settings",
				component: () => import("../pages/Settings.vue"),
				meta: { breadcrumb: "Settings" }
			},
			{
				path: "terms-and-conditions",
				name: "Terms",
				component: () => import("../pages/Terms.vue"),
				meta: { breadcrumb: "Terms & Conditions" }
			},
			{
				path: "privacy-policy",
				name: "PrivacyPolicy",
				component: () => import("../pages/PrivacyPolicy.vue"),
				meta: { breadcrumb: "Privacy Policy" }
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
