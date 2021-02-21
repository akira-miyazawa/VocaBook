<template>
  <div id="dictionary-list">
    <el-row>
      <template v-for="(dict, index) in dictionaries" :key="index">
        <el-card class="card" @click="insertDisplayValue(dict)" shadow="hover">
          <el-row>
            <el-row class="text">{{ `${dict.title}` }}</el-row>
            <el-button
              class="button"
              type="success"
              icon="el-icon-plus"
              @click="isShowModalWindow = true"
              :disabled="isVisibleQuiz"
              size="mini"
            />
            <el-button
              class="button"
              type="info"
              icon="el-icon-edit"
              @click="editStart(dict, index)"
              :disabled="isVisibleQuiz"
              size="mini"
            />
            <el-popconfirm
              confirmButtonText="削除する"
              cancelButtonText="キャンセル"
              iconColor="red"
              title="本当に削除してよろしいですか"
              @confirm="deleteDict(dict.documentId)"
            >
              <template #reference>
                <el-button
                  class="button"
                  type="danger"
                  icon="el-icon-delete"
                  :disabled="isVisibleQuiz"
                  size="mini"
                />
              </template>
            </el-popconfirm>
          </el-row>
        </el-card>
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
            :disabled="isEmpty"
            >追加する</el-button
          >
        </span>
      </template>
    </el-dialog>
    <el-dialog class="modal-window" v-model="isShowModalWindow">
      <el-alert
        title="すでに保存されている内容があります"
        type="error"
        show-icon
        :closable="false"
        v-if="isDuplicate"
      ></el-alert>
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
          <el-button
            @click="addWord(dictionary, dictContents)"
            :disabled="isEmpty || isDuplicate"
            >追加する</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { DictContents, Dictionary } from "@/types/dectionary";
import { computed, defineComponent, PropType, reactive, ref, watch } from "vue";

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
  emits: ["deletDict", "updateDict", "addWord", "insertValue", "editStart"],
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
    const isEmpty = ref<boolean>(true);
    const isDuplicate = ref<boolean>(false);

    watch(updateTitle, (newTitle) => {
      if (newTitle === "") {
        isEmpty.value = true;
        return;
      }
      isEmpty.value = false;
    });

    watch(dictContents, () => {
      dictContents.word = dictContents.word.replace(/\s+/g, "");
      dictContents.explanation = dictContents.explanation.replace(/\s+/g, "");
      if (dictContents.word === "" || dictContents.explanation === "") {
        isEmpty.value = true;
        return;
      }
      isEmpty.value = false;
    });

    watch(dictContents, () => {
      if (
        dictionary.value?.words.some(
          (w) =>
            w.word === dictContents.word ||
            w.explanation === dictContents.explanation
        )
      ) {
        isDuplicate.value = true;
        return;
      }
      isDuplicate.value = false;
    });

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
      isEmpty,
      isDuplicate,
      dictContents,
      dictTitle,
      isModal,
      isShowModalWindow,
      deleteDict,
      updateDict,
      addWord,
      editStart,
      insertDisplayValue,
    };
  },
});
</script>

<style  lang="postcss" scoped>
#dictionary-list {
  height: 80vh;
  overflow: scroll;
  margin: 10px;
}
.card {
  display: flex;
  margin: 10px;
  writing-mode: vertical-rl;
  font-size: 20px;
  height: 350px;
}
.card >>> .el-card {
  border: 1px solid #b9b5b5;
  box-shadow: 2px -10px 5px #b9b5b5;
  border-bottom-right-radius: 2000px 300px;
  border-bottom-left-radius: 2000px 300px;
}
.text {
  border: 1px solid #b9b5b5;
  border-bottom-right-radius: 2000px 300px;
  border-bottom-left-radius: 2000px 300px;
  height: 200px;
  align-items: center;
  justify-content: center;
  overflow: scroll;
}
.button {
  margin-top: 5px;
  margin-left: 0;
}
</style>