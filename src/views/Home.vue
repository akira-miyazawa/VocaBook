<template>
  <div class="operation">
    <HeaderComponent />
    <el-row>
      <el-col :span="8">
        <WordListComponent :displayValue="displayValue" />
      </el-col>
      <el-col :span="16">
        <DictionaryListComponent
          :posts="postsData.posts"
          @deletDict="deletDictionary"
          @deleteWord="deleteWordExplanation"
          @insertValue="insertDisplayValue"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from "vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import DictionaryListComponent from "@/components/DictionaryListComponent.vue";
import WordListComponent from "@/components/WordListComponent.vue";
import Firebase from "../plugins/firebase";
import store from "@/store/store";
import {
  DictContents,
  Dictionary,
  DisplayDictContents,
} from "@/types/dectionary";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default defineComponent({
  name: "Home",
  components: {
    HeaderComponent,
    DictionaryListComponent,
    WordListComponent,
  },

  setup() {
    const postsData = reactive<any>({ posts: [] });
    const displayValue = reactive<DisplayDictContents>({
      title: "",
      words: [],
    });

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

    function insertDisplayValue(title: string, words: DictContents[]) {
      displayValue.title = title;
      displayValue.words = words;
    }

    return {
      postsData,
      displayValue,
      deletDictionary,
      deleteWordExplanation,
      insertDisplayValue,
    };
  },
});
</script>
