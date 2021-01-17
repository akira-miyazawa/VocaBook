import { createApp } from "vue";
import VueFire from "vuefire";
import firebase from "firebase/app";
import "firebase/firestore";
import store from "../store/store";
import router from '@/router';

createApp(VueFire);

const config = {
  apiKey: "AIzaSyD9vBRnc0S7erUjRPiu8yGVpwh-UnKNB-U",
  authDomain: "vocabook-ca105.firebaseapp.com",
  databaseURL: "https://vocabook-ca105.firebaseio.com",
  projectId: "vocabook-ca105",
  storageBucket: "vocabook-ca105.appspot.com",
  messagingSenderId: "899301562711",
  appId: "1:899301562711:web:7b5ef46d880eadd00a0612",
  measurementId: "G-YVC4CXXT8R"
};

export const db = firebase.initializeApp(config).firestore();

export default {
  init() {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  },
  async signUp(email: string, password: string, name: string) {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const user = await firebase.auth().currentUser;
    user?.updateProfile({
      displayName: name
    });
    // アカウント作成後は'/home'へルーティング
    router.push("/home");

  },
  async login(email: string, password: string) {
    const res = await firebase.auth().signInWithEmailAndPassword(email, password);
    const idToken: any = await res.user?.getIdToken();
    localStorage.setItem("jwt", idToken);
    // ログイン後は'/home'へルーティング
    router.push("/home");
  },
  async logout() {
    await firebase.auth().signOut();
    // 保存しているjwtを削除して、vuexのmutationの状態の更新処理でログアウト状態にする
    localStorage.removeItem("jwt");
    store.commit("onAuthEmailChanged", "");
    store.commit("onUserStatusChanged", false);
    // ログアウト後はログイン画面へルーティング
    router.push("/login");
  },
  async onAuth() {
    await firebase.auth().onAuthStateChanged(user => {
      if (user) {
        if (user.email) {
          localStorage.setItem('jwt', user.email);
        }
        store.commit('onAuthEmailChanged', user.email);
        if (user.uid) {
          store.commit('onUserStatusChanged', true);
        } else {
          store.commit('onUserStatusChanged', false);
        }
      } else {
        store.commit('onAuthEmailChanged', "");
        store.commit('onUserStatusChanged', false);
      }
    });
  }
};