import Vue from "vue";
import firebase from "firebase/app";

declare module "vue/types/vue" {
  interface Vue {
    $auth: firebase.auth.Auth;
    $firestore: firebase.firestore.Firestore;
  }
}
