<template>
  <div id="dictionary-list">
    <el-row>
      <el-col :span="12">
        <el-card class="card">
          <h2>VocaBook</h2>
          <h3>新規作成</h3>
          <el-input class="name" type="text" v-model="dictTitle" />
          <el-button
            type="primary"
            icon="el-icon-notebook-2"
            @click="createDict(dictTitle)"
            circle
          />
        </el-card>
      </el-col>
      <template v-for="dict in dictionaries" :key="dict">
        <el-col :span="12">
          <el-card class="card" @click="insertDisplayValue(dict)">
            {{ `「${dict.title}」` }}
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="deleteDict(dict.documentId)"
              circle
            />
            <el-button
              icon="el-icon-edit"
              @click="isShowModalWindow = true"
              circle
            />
          </el-card>
        </el-col>
      </template>
    </el-row>
    <el-dialog class="modal-window" v-model="isShowModalWindow">
      <el-form>
        <el-form-item label="ワード">
          <el-input v-model="dictContents.word"></el-input>
        </el-form-item>
        <el-form-item label="解説">
          <el-input v-model="dictContents.explanation"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isShowModalWindow = false">キャンセル</el-button>
          <el-button @click="addWord(dictionary, dictContents)"
            >追加する</el-button
          >
        </span>
      </template>
    </el-dialog>
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
import ModalWindowCompnent from "@/components/ModalWindowCompnent.vue";

export default defineComponent({
  props: {
    posts: {
      type: Array as PropType<Dictionary[]>,
    },
    dict: {
      type: Object as PropType<Dictionary>,
    },
  },
  emits: ["createDict", "deletDict", "addWord", "insertValue"],
  setup(props, context) {
    const dictionaries = computed(() => props.posts);
    const dictionary = computed(() => props.dict);
    const dictTitle = ref<string>("");
    const dictContents = reactive<DictContents>({
      word: "",
      explanation: "",
    });
    const isShowModalWindow = ref<boolean>(false);

    const db = firebase.firestore();

    function createDict(title: string) {
      context.emit("createDict", title);
      dictTitle.value = "";
    }

    function deleteDict(documentId: string) {
      context.emit("deletDict", documentId);
    }

    function addWord(dict: Dictionary, dictContents: DictContents) {
      context.emit("addWord", dict, dictContents);
      isShowModalWindow.value = false;
    }

    function insertDisplayValue(dict: Dictionary) {
      context.emit("insertValue", dict);
    }

    return {
      dictionaries,
      dictionary,
      dictContents,
      dictTitle,
      isShowModalWindow,
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