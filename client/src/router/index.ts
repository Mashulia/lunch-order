import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", redirect: "/menu-order" },
    {
      path: "/",
      component: () => import("../layouts/default.vue"),
      children: [
        {
          path: "menu-order",
          component: () => import("../pages/menu-order.vue"),
        },
        {
          path: "cart",
          component: () => import("../pages/cart.vue"),
        },
        {
          path: "load-menu",
          component: () => import("../pages/load-menu.vue"),
        },
        {
          path: "summary",
          component: () => import("../pages/summary.vue"),
        },
        {
          path: "create-newsletter",
          component: () => import("../pages/create-newsletter.vue"),
        },
        {
          path: "send-menu",
          component: () => import("../pages/send-menu.vue"),
        },
        {
          path: "employees",
          component: () => import("../pages/employees.vue"),
        },
        {
          path: "profile",
          component: () => import("../pages/profile.vue"),
        },
      ],
    },
    {
      path: "/",
      component: () => import("../layouts/blank.vue"),
      children: [
        {
          path: "login",
          component: () => import("../pages/login/login.vue"),
        },
        {
          path: "register",
          component: () => import("../pages/register/register.vue"),
        },
        {
          path: "/:pathMatch(.*)*",
          component: () => import("../pages/[...all].vue"),
        },
      ],
    },
  ],
});

export default router;
