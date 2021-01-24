<template>
  <div class="operation">
    <HeaderComponent />
    <OperationComponent
      :postsData="postsData"
      @deletDict="deletDictionary"
      @deleteWord="deleteWordExplanation"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from "vue";
import OperationComponent from "@/components/OperationComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import Firebase from "../plugins/firebase";
import store from "@/store/store";
import { DictContents, Dictionary } from "@/types/dectionary";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default defineComponent({
  name: "Home",
  components: {
    OperationComponent,
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

    async function deletDictionary(documentId: string) {
      await db
        .collection("user")
        .doc(await firebase.auth().currentUser?.uid)
        .collection("dictionary")
        .doc(documentId)
        .delete();
      const index = postsData.posts.findIndex(
        (dict: any) => dict.documentId === documentId
      );
      if (index !== -1) {
        postsData.posts.splice(index, 1);
      }
    }

    async function deleteWordExplanation(
      dictionary: Dictionary,
      dictContents: DictContents
    ) {
      await db
        .collection("user")
        .doc(await firebase.auth().currentUser?.uid)
        .collection("dictionary")
        .doc(dictionary.documentId)
        .update({
          words: firebase.firestore.FieldValue.arrayRemove({
            word: dictContents.word,
            explanation: dictContents.explanation,
          }),
        });
      const index = dictionary.words.findIndex(
        (word: DictContents) => word === dictContents
      );
      if (index !== -1) {
        dictionary.words.splice(index, 1);
      }
    }

    return {
      postsData,
      deletDictionary,
      deleteWordExplanation,
    };
  },
});
</script>
