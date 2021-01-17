import store from '@/store/store';
import { createRouter, createWebHistory, RouteLocationNormalized, RouteRecordRaw, RouterScrollBehavior } from "vue-router";
import Login from "../views/Login.vue"
import Firebase from "../plugins/firebase"
import firebase from 'firebase/app';

const router = createRouter({
  history: createWebHistory(),
  routes: [
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
    {
      path: "/:catchAll(.*)",
      redirect: "/login"
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
  await Firebase.onAuth();
  const currentUserStatus = await store.getters.isSignedIn;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (!requiresAuth) {
    next();
  } else if (requiresAuth && !currentUserStatus) {
    next();
  } else {
    next();
  }
})

export default router;
