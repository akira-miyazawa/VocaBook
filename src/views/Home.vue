<template>
  <div class="home">
    <HeaderComponent />
    <HelloWorld :dictionaries="postsData.posts" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import HeaderComponent from "@/components/HeaderComponent.vue";
import Firebase from "../plugins/firebase";
import store from "@/store/store";
import { Dictionary } from "@/types/dectionary";
import firebase from "firebase";

export default defineComponent({
  name: "Home",
  components: {
    HelloWorld,
    HeaderComponent,
  },

  setup() {
    const postsData = reactive<any>({ posts: [] });
    const displayValue = reactive<any>({ title: "", words: [] });

    const db = firebase.firestore();

    firebase.auth().onAuthStateChanged((user) => {
      Firebase.init();
      if (user) {
        db.collection("user")
          .doc(firebase.auth().currentUser?.uid)
          .collection("dictionary")
          .orderBy("timeStamp", "desc")
          .onSnapshot(function (snapshot) {
            snapshot.docChanges().forEach((change) => {
              if (change.type === "added") {
                postsData.posts.push(change.doc.data());
              }
            });
          });
      }
    });

    return {
      postsData,
    };
  },
});
</script>
