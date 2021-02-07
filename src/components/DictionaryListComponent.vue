<template>
  <div id="dictionary-list">
    <el-row>
      <el-col :span="12">
        <el-card class="card">
          <h2>VocaBook</h2>
          <h3>新規作成</h3>
          <el-input
            class="name"
            type="text"
            v-model="dictTitle"
            :disabled="isVisibleQuiz"
          />
          <el-button
            type="primary"
            icon="el-icon-notebook-2"
            @click="createDict(dictTitle)"
            circle
            :disabled="isVisibleQuiz"
          />
        </el-card>
      </el-col>
      <template v-for="(dict, index) in dictionaries" :key="index">
        <el-col :span="12">
          <el-card
            class="card"
            @click="insertDisplayValue(dict)"
            shadow="hover"
          >
            {{ `「${dict.title}」` }}
            <el-button
              type="info"
              icon="el-icon-edit"
              @click="editStart(dict, index)"
              circle
            />
            <el-button
              type="success"
              icon="el-icon-plus"
              @click="isShowModalWindow = true"
              circle
            />
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="deleteDict(dict.documentId)"
              circle
            />
          </el-card>
        </el-col>
      </template>
    </el-row>
    <el-dialog class="modal-window" v-model="isModal">
      <el-form>
        <el-form-item label="VocaBook">
          <el-input v-model="updateTitle"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isModal = false">キャンセル</el-button>
          <el-button
            @click="updateDict(updateTitle, updateDocumentId, updateDictIndex)"
            >追加する</el-button
          >
        </span>
      </template>
    </el-dialog>
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

export default defineComponent({
  props: {
    posts: {
      type: Array as PropType<Dictionary[]>,
    },
    dict: {
      type: Object as PropType<Dictionary>,
    },
    isVisible: {
      type: Boolean,
    },
  },
  emits: [
    "createDict",
    "deletDict",
    "updateDict",
    "addWord",
    "insertValue",
    "editStart",
  ],
  setup(props, context) {
    const dictionaries = computed(() => props.posts);
    const dictionary = computed(() => props.dict);
    const isVisibleQuiz = computed(() => props.isVisible);
    const dictTitle = ref<string>("");
    const dictContents = reactive<DictContents>({
      word: "",
      explanation: "",
    });
    const isModal = ref<boolean>(false);
    const isShowModalWindow = ref<boolean>(false);
    const updateTitle = ref<string>("");
    const updateDocumentId = ref<string>("");
    const updateDictIndex = ref<number>();

    const db = firebase.firestore();

    function createDict(title: string) {
      context.emit("createDict", title);
      dictTitle.value = "";
    }

    function deleteDict(documentId: string) {
      context.emit("deletDict", documentId);
    }

    function updateDict(title: string, documentId: string, index: number) {
      context.emit("updateDict", title, documentId, index);
      isModal.value = false;
    }

    function addWord(dict: Dictionary, dictContents: DictContents) {
      context.emit("addWord", dict, dictContents);
      isShowModalWindow.value = false;
    }

    function editStart(dict: Dictionary, index: number) {
      updateTitle.value = dict.title;
      updateDocumentId.value = dict.documentId;
      updateDictIndex.value = index;
      isModal.value = true;
    }

    function insertDisplayValue(dict: Dictionary) {
      if (!isVisibleQuiz.value) {
        context.emit("insertValue", dict);
      }
    }

    return {
      dictionaries,
      dictionary,
      isVisibleQuiz,
      updateTitle,
      updateDocumentId,
      updateDictIndex,
      dictContents,
      dictTitle,
      isModal,
      isShowModalWindow,
      createDict,
      deleteDict,
      updateDict,
      addWord,
      editStart,
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