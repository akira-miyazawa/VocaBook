<template>
  <div id="dictionary-list">
    <el-row>
      <template v-for="dict in dictionaries" :key="dict">
        <el-col :span="8">
          <el-card class="card" @click="insertDisplayValue(dict)">
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
            <button @click="addWord(dict, dictContents)">追加</button>
          </el-card>
        </el-col>
      </template>
      <el-col :span="8">
        <el-card class="card">
          <input id="name" type="text" v-model="dictTitle" />
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="createDict(dictTitle)"
            circle
          />
        </el-card>
      </el-col>
    </el-row>
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
    dict: {
      type: Object as PropType<Dictionary>,
    },
  },

  setup(props, context) {
    const dictionaries = computed(() => props.posts);
    const dictionary = computed(() => props.dict);
    const dictTitle = ref<string>("");
    const dictContents: DictContents = {
      word: "",
      explanation: "",
    };

    const db = firebase.firestore();

    async function createDict(title: string) {
      context.emit("createDict", title);
      dictTitle.value = "";
    }

    async function deleteDict(documentId: string) {
      context.emit("deletDict", documentId);
    }

    async function addWord(dict: Dictionary, dictContents: DictContents) {
      context.emit("addWord", dict, dictContents);
    }

    function insertDisplayValue(dict: Dictionary) {
      context.emit("insertValue", dict);
    }

    return {
      dictionaries,
      dictionary,
      dictContents,
      dictTitle,
      createDict,
      deleteDict,
      addWord,
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