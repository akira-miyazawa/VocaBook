import { createApp } from "vue";
import VueFire from "vuefire";
import firebase from "firebase/app";
import "firebase/firestore";
import store from "../store/store";

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
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  },
  async signUp(email: string, password: string) {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  },
  async login(email: string, password: string) {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    await firebase.auth().signInWithEmailAndPassword(email, password);
  },
  async logout() {
    await firebase.auth().signOut()
  },
  onAuth() {
    firebase.auth().onAuthStateChanged((user: any) => {
      user = user ? user : {};
      store.commit('onAuthStateChanged', user);
      store.commit('onUserStatusChanged', user.uid ? true : false);
    });
  }
};