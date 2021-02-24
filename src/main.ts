import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css';
import store from "./store/store";
import Firebase from '../src/plugins/firebase'


Firebase.init();

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus)
  .mount("#app");