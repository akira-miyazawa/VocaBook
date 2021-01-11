<template>
  <div id="app">
    <button @click="logout">ログアウトする</button>
    <br />
    <h3>新しい辞書を作る</h3>
    <label for="name">VocaBookの名前:</label>
    <input id="name" type="text" v-model="dictionary.title" />
    <br /><br />
    <button @click="createDict">新しい辞書を作る</button>
    <br /><br />
    <h3>辞書に単語を追加する</h3>
    <template v-for="data in postsData.posts" :key="data">
      {{ `辞書名：${data.title}` }}
      {{ data.uid }}
      <button @click="deleteDict(data.documentId)">削除</button>
      <br /><br />
      <label for="word">単語:</label>
      <input id="word" type="text" v-model="dictContents.word" />
      <br /><br />
      <label for="explanation">解説:</label>
      <textarea
        id="explanation"
        type="text"
        v-model="dictContents.explanation"
      />
      <br /><br />
      <button @click="addWordExplanation(data, data.documentId, dictContents)">
        追加
      </button>
      <h4>一覧</h4>
      <template v-for="item in data.words" :key="item">
        {{ `${item.word}: ${item.explanation}` }}
        <button @click="deleteWordExplanation(data, data.documentId, item)">
          削除
        </button>
        <br /><br />
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { DictContents, Dictionary } from "@/types/dectionary";
import firebase from "firebase";
import { defineComponent, reactive } from "vue";
import Firebase, { db } from "../plugins/firebase";

export type SaveData = {
  name: string;
  message: string;
};

export default defineComponent({
  setup() {
    const dictionary = reactive<Dictionary>({
      title: "",
      words: [],
      timeStamp: {},
      documentId: {},
      uid: "",
    });
    const dictContents = {
      word: "",
      explanation: "",
    };
    const postsData = reactive<any>({ posts: [] });

    firebase.auth().onAuthStateChanged((user) => {
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

    async function createDict() {
      const auth = await db
        .collection("user")
        .doc(await firebase.auth().currentUser?.uid);
      auth.set({
        uid: await firebase.auth().currentUser?.uid,
      });
      const dict = auth.collection("dictionary").doc();
      dict.set({
        title: dictionary.title,
        words: dictionary.words,
        timeStamp: firebase.firestore.Timestamp.now().toDate(),
        documentId: dict.id,
      });
      dictionary.title = "";
      dictionary.timeStamp = {};
    }

    async function deleteDict(documentId: any) {
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

    async function addWordExplanation(
      data: any,
      documentId: any,
      words: DictContents
    ) {
      await db
        .collection("user")
        .doc(await firebase.auth().currentUser?.uid)
        .collection("dictionary")
        .doc(documentId)
        .update({
          words: firebase.firestore.FieldValue.arrayUnion({
            word: words.word,
            explanation: words.explanation,
          }),
        });
      data.words.push({
        word: words.word,
        explanation: words.explanation,
      });
      words.word = "";
      words.explanation = "";
    }
    async function deleteWordExplanation(
      data: any,
      documentId: any,
      words: DictContents
    ) {
      await db
        .collection("user")
        .doc(await firebase.auth().currentUser?.uid)
        .collection("dictionary")
        .doc(documentId)
        .update({
          words: firebase.firestore.FieldValue.arrayRemove({
            word: words.word,
            explanation: words.explanation,
          }),
        });
      const index = data.words.findIndex((word: any) => word === words);
      if (index !== -1) {
        data.words.splice(index, 1);
      }
    }
    // ログアウト処理
    async function logout() {
      try {
        await Firebase.logout();
        alert("ログアウトに成功しました！");
      } catch (err) {
        console.error(err);
        alert("ログアウトに失敗しました...");
      }
    }

    return {
      dictionary,
      dictContents,
      postsData,
      createDict,
      deleteDict,
      addWordExplanation,
      deleteWordExplanation,
      logout,
    };
  },
});
</script>

<style scoped lang="scss"></style>