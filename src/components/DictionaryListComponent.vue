<template>
  <div id="dictionary-list">
    <el-row>
      <template v-for="dict in dictionaries" :key="dict">
        <el-col :span="8">
          <el-card
            class="card"
            @click="insertDisplayValue(dict.title, dict.words)"
          >
            {{ `「${dict.title}」` }}
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="deleteDict(dict.documentId)"
              circle
            />
            <br /><br />
            <label for="word">単語:</label>
            <input id="word" type="text" v-model="dictContents.word" />
            <br /><br />
            <label for="explanation">解説:</label>
            <textarea id="explanation" v-model="dictContents.explanation" />
            <br /><br />
            <button @click="addWordExplanation(dict, dictContents)">
              追加
            </button>
          </el-card>
        </el-col>
      </template>
      <el-col :span="8">
        <el-card class="card">
          <input id="name" type="text" v-model="dictionary.title" />
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="createDict"
            circle
          />
        </el-card>
      </el-col>
    </el-row>
    <h3>新しい辞書を作る</h3>
    <label for="name">VocaBookの名前:</label>
    <input id="name" type="text" v-model="dictionary.title" />
    <br /><br />
    <button @click="createDict">新しい辞書を作る</button>
    <br /><br />
    <h3>辞書に単語を追加する</h3>
    <template v-for="dict in dictionaries" :key="dict">
      {{ `辞書名：${dict.title}` }}
      {{ dict.uid }}
      <button @click="deleteDict(dict.documentId)">削除</button>
      <br /><br />
      <label for="word">単語:</label>
      <input id="word" type="text" v-model="dictContents.word" />
      <br /><br />
      <label for="explanation">解説:</label>
      <textarea id="explanation" v-model="dictContents.explanation" />
      <br /><br />
      <button @click="addWordExplanation(dict, dictContents)">追加</button>
      <h4>一覧</h4>
      <template v-for="item in dict.words" :key="item">
        {{ `${item.word}: ${item.explanation}` }}
        <button @click="deleteWord(dict, item)">削除</button>
        <br /><br />
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import store from "@/store/store";
import { DictContents, Dictionary } from "@/types/dectionary";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { computed, defineComponent, PropType, reactive, ref } from "vue";
import Firebase from "../plugins/firebase";

export default defineComponent({
  props: {
    posts: {
      type: Array as PropType<Dictionary[]>,
    },
  },
  setup(props, context) {
    const dictionaries = computed(() => props.posts);
    const dictionary = reactive<Dictionary>({
      title: "",
      words: [],
      timeStamp: "",
      documentId: "",
      uid: "",
    });
    const dictContents: DictContents = {
      word: "",
      explanation: "",
    };
    const displayValue = reactive<any>({ title: "", words: [] });

    const db = firebase.firestore();

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
      dictionary.timeStamp = "";
    }

    async function deleteDict(documentId: string) {
      context.emit("deletDict", documentId);
    }

    async function addWordExplanation(
      dictionary: Dictionary,
      dictContents: DictContents
    ) {
      await db
        .collection("user")
        .doc(await firebase.auth().currentUser?.uid)
        .collection("dictionary")
        .doc(dictionary.documentId)
        .update({
          words: firebase.firestore.FieldValue.arrayUnion({
            word: dictContents.word,
            explanation: dictContents.explanation,
          }),
        });
      dictionary.words.push({
        word: dictContents.word,
        explanation: dictContents.explanation,
      });
      dictContents.word = "";
      dictContents.explanation = "";
    }

    async function deleteWord(
      dictionary: Dictionary,
      dictContents: DictContents
    ) {
      context.emit("deleteWord", dictionary, dictContents);
    }

    function insertDisplayValue(title: string, words: DictContents[]) {
      context.emit("insertValue", title, words);
    }

    return {
      dictionaries,
      dictionary,
      dictContents,
      displayValue,
      createDict,
      deleteDict,
      addWordExplanation,
      deleteWord,
      insertDisplayValue,
    };
  },
});
</script>

<style scoped lang="scss">
.card {
  margin: 10px;
}
</style>