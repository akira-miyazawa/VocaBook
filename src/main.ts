import firebase from 'firebase';
import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store/store";

router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      if (to.name == "Login") {
        next({
          name: "Home"
        })
      }
      next();
    }
    else {
      if (to.matched.some(record => record.meta.requiresAuth)) {
        next({
          name: "Login",
          query: {
            redirect: to.fullPath
          },
        })
      }
      next();
    }
  })
});

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
