import store from '@/store/store';
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "../views/Login.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/:catchAll(.*)",
    redirect: 'login'
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/home",
    name: "Home",
    meta: { requiresAuth: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/Home.vue")
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const currentUserStatus = store.getters["isSignedIn"];
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (!requiresAuth) {
    next()
  } else if (requiresAuth && !currentUserStatus) {
    next('/login');
  } else {
    next();
  }
})

export default router;
