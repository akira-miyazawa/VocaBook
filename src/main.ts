import firebase from 'firebase';
import { createApp, render } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css';
import store from "./store/store";
import Firebase from '../src/plugins/firebase'


Firebase.init();

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.email) {
      localStorage.setItem('jwt', user.email);
    }
    store.commit('onAuthEmailChanged', user.email);
    if (user.uid) {
      store.commit('onUserStatusChanged', true)
    } else {
      store.commit('onUserStatusChanged', false)
    }
  } else {
    store.commit('onAuthEmailChanged', "")
  }
});

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus)
  .mount("#app");