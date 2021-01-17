import firebase from 'firebase';
import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css';
import store from "./store/store";


firebase.auth().onAuthStateChanged((user: any) => {
  if (user) {
    if (user.ma) {
      localStorage.setItem('jwt', user.ma);
    }
    store.commit('onAuthStateChanged', user);
    if (user.uid) {
      store.commit('onUserStatusChanged', true)
    } else {
      store.commit('onUserStatusChanged', false)
    }
  } else {
    store.commit('onAuthStateChanged', "")
  }
});

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus)
  .mount("#app");