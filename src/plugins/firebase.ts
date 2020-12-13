import { createApp } from "vue";
import VueFire from "vuefire";
import firebase from "firebase/app";
import "firebase/firestore";

createApp(VueFire);

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyD9vBRnc0S7erUjRPiu8yGVpwh-UnKNB-U",
  authDomain: "vocabook-ca105.firebaseapp.com",
  databaseURL: "https://vocabook-ca105.firebaseio.com",
  projectId: "vocabook-ca105",
  storageBucket: "vocabook-ca105.appspot.com",
  messagingSenderId: "899301562711",
  appId: "1:899301562711:web:7b5ef46d880eadd00a0612",
  measurementId: "G-YVC4CXXT8R"
});

export const db = firebaseApp.firestore();
