<template>
  <div id="app">
    <h3>新しい辞書を作る</h3>
    <label for="name">VocaBookの名前:</label>
    <input id="name" type="text" v-model="dictionary.title" />
    <br /><br />
    <button @click="createDict">新しい辞書を作る</button>
    <button @click="deleteDict(data.documentId)">削除</button>
    <br /><br />
    <h3>辞書に単語を追加する</h3>
    {{postsData}}
    <div v-for="data in postsData.posts" :key="data">
      {{ `辞書名：${data.title}` }}
      <br/><br/>
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
      <button @click="addWordsExplanation(data.documentId)">追加</button>
      <button @click="deleteWordsExplanation(data.documentId)">削除</button>
      <br /><br />
      <div v-for="item in data.words" :key="item">
        {{ `単語：${item.word}` }}
        {{ `解説：${item.explanation}` }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { DictContents, Dictionary } from "@/types/dectionary";
import firebase from "firebase";
import { defineComponent, reactive } from "vue";
import { db } from "../plugins/firebase";

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
      documentId: {}
    });
    const dictContents = reactive<DictContents>({
      word: "",
      explanation: ""
    });
    const postsData = reactive<any>({ posts: [] });

    db.collection("dictionary_post_t")
      .orderBy("timeStamp", "desc")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          postsData.posts.push(doc.data());
        });
      });

    async function createDict() {
      const ref = await db.collection("dictionary_post_t").doc();
      ref.set({
        title: dictionary.title,
        words: dictionary.words,
        timeStamp: firebase.firestore.Timestamp.now().toDate(),
        documentId: ref.id
      });
      dictionary.title = "";
      dictionary.timeStamp = {};
    }

    async function deleteDict(documentId: any) {
      await db
        .collection("dictionary_post_t")
        .doc(documentId)
        .delete();
    }

    async function addWordsExplanation(documentId: any) {
      await db
        .collection("dictionary_post_t")
        .doc(documentId)
        .update({
          words: firebase.firestore.FieldValue.arrayUnion({
            word: dictContents.word,
            explanation: dictContents.explanation
          })
        });
      dictContents.word = "";
      dictContents.explanation = "";
    }
    async function deleteWordsExplanation(documentId: any) {
      await db
        .collection("dictionary_post_t")
        .doc(documentId)
        .delete();
    }

    return {
      dictionary,
      dictContents,
      postsData,
      createDict,
      deleteDict,
      addWordsExplanation
    };
  }
});
</script>

<style scoped lang="scss"></style>