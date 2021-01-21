import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import firebase from 'firebase/app';
import store from '@/store/store';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Root",
      redirect: "/login"
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/home",
      name: "home",
      meta: { requiresAuth: true },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "home" */ "../views/Home.vue")
    },
    {
      path: "/:catchAll(.*)",
      redirect: "/"
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    //戻るによる遷移は以前の位置を保持
    if (savedPosition) {
      return savedPosition
    } else {
      if (to.hash) {
        return { el: to.hash, }
      } else {
        return { left: 0, top: 0 }
      }
    }
  }
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const currentUserStatus = await store.getters.isSignedIn;
  if (!requiresAuth) {
    next();
  } else if (!requiresAuth && !currentUserStatus) {
    next('/login');
  } else {
    next();
  }
})
export default router;
