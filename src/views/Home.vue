<template>
  <div class="operation">
    <HeaderComponent />
    <el-row>
      <el-col :span="8">
        <WordListComponent
          :dict="dictionary"
          @deleteWord="deleteWordExplanation"
        />
      </el-col>
      <el-col :span="16">
        <DictionaryListComponent
          :posts="postsData.posts"
          :dict="dictionary"
          @createDict="createDictionary"
          @deletDict="deletDictionary"
          @addWord="addWordExplanation"
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
import { DictContents, Dictionary } from "@/types/dectionary";
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
    const dictionary = reactive<Dictionary>({
      title: "",
      words: [],
      timeStamp: "",
      documentId: "",
      uid: "",
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

    async function createDictionary(dictTitle: string) {
      const auth = await db
        .collection("user")
        .doc(await firebase.auth().currentUser?.uid);
      auth.set({
        uid: await firebase.auth().currentUser?.uid,
      });
      const dict = await auth.collection("dictionary").doc();
      dict.set({
        title: dictTitle,
        words: [],
        timeStamp: firebase.firestore.Timestamp.now().toDate(),
        documentId: dict.id,
      });
      dictTitle = "";
    }

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
      dictionary.title = "";
      dictionary.words = [];
      dictionary.documentId = "";
      dictionary.timeStamp = "";
      dictionary.uid = "";
    }

    async function addWordExplanation(
      dict: Dictionary,
      dictContents: DictContents
    ) {
      await db
        .collection("user")
        .doc(await firebase.auth().currentUser?.uid)
        .collection("dictionary")
        .doc(dict.documentId)
        .update({
          words: firebase.firestore.FieldValue.arrayUnion({
            word: dictContents.word,
            explanation: dictContents.explanation,
          }),
        });
      dict.words.push({
        word: dictContents.word,
        explanation: dictContents.explanation,
      });
      dictContents.word = "";
      dictContents.explanation = "";
    }

    async function deleteWordExplanation(
      dict: Dictionary,
      dictContents: DictContents,
      index: number
    ) {
      await db
        .collection("user")
        .doc(await firebase.auth().currentUser?.uid)
        .collection("dictionary")
        .doc(dict.documentId)
        .update({
          words: firebase.firestore.FieldValue.arrayRemove({
            word: dictContents.word,
            explanation: dictContents.explanation,
          }),
        });
      // const index = dictionary.words.findIndex(
      //   (word: DictContents) => word === dictContents
      // );
      if (index !== -1) {
        dict.words.splice(index, 1);
      }
    }

    function insertDisplayValue(dict: Dictionary) {
      dictionary.title = dict.title;
      dictionary.words = dict.words;
      dictionary.documentId = dict.documentId;
      dictionary.timeStamp = dict.timeStamp;
      dictionary.uid = dict.uid;
    }

    return {
      postsData,
      dictionary,
      createDictionary,
      deletDictionary,
      addWordExplanation,
      deleteWordExplanation,
      insertDisplayValue,
    };
  },
});
</script>
