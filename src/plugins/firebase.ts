import { createApp } from "vue";
import VueFire from "vuefire";
import store from "../store/store";
import router from '@/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'

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

// export const db = firebase.initializeApp(config).firestore();

export default {
  init() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(config);
    }
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  },
  async signUp(email: string, password: string, name: string) {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const user = await firebase.auth().currentUser;
    user?.updateProfile({
      displayName: name
    });
    localStorage.setItem("jwt", name);
    // アカウント作成後は'/home'へルーティング
    router.push("/home");
  },
  async login(email: string, password: string) {
    const res = await firebase.auth().signInWithEmailAndPassword(email, password);
    const userName = res.user?.displayName;
    if (userName == undefined) return;
    localStorage.setItem("jwt", userName);
    // ログイン後は'/home'へルーティング
    router.push("/home");
  },
  async logout() {
    await firebase.auth().signOut();
    // 保存しているjwtを削除して、vuexのmutationの状態の更新処理でログアウト状態にする
    localStorage.removeItem("jwt");
    store.commit("onAuthStateChanged", {});
    store.commit("onUserStatusChanged", false);
    // ログアウト後はログイン画面へルーティング
    router.push("/login");
  },
  onAuth() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(config);
    }
    firebase.auth().onAuthStateChanged(user => {
      user = user ? user : {} as firebase.User | null;
      store.commit('onAuthStateChanged', user);
      store.commit('onUserStatusChanged', user?.uid ? true : false);
    });
  }
};