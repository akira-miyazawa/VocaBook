<template>
  <div id="word-list">
    <el-row class="list-header">
      <el-col :span="8">
        <el-radio-group class="radio-group" v-model="isStartQuestion">
          <el-radio-button :label="false" :disabled="isVisibleQuiz"
            >一覧</el-radio-button
          >
          <el-radio-button :label="true">問題</el-radio-button>
        </el-radio-group></el-col
      >
      <el-col :span="8"
        ><h3 class="title">{{ dictionary.title }}</h3></el-col
      >
      <el-col :span="8">単語数: {{ dictionary.words.length }}</el-col>
    </el-row>
    <template v-if="!isStartQuestion">
      <template v-if="dictionary.words.length === 0">
        <el-alert
          class="info"
          title="＋ボタンからあなたのVocaBookを作ろう"
          type="success"
          center
          :closable="false"
          ><i class="el-icon-info" />
          ワードと解説を登録して、あなただけの辞書を作ることができます
        </el-alert>
      </template>
      <el-table
        v-else
        :data="dictionary.words"
        :show-header="false"
        class="table"
        style="width: 100%"
      >
        <el-table-column prop="word" width="300" />
        <el-table-column prop="explanation" />
        <el-table-column align="right" width="180">
          <template #default="scope">
            <el-button
              size="mini"
              type="info"
              @click="editStart(scope.row, scope.$index)"
            >
              <i class="el-icon-edit"></i>
            </el-button>
            <el-popconfirm
              confirmButtonText="削除する"
              cancelButtonText="キャンセル"
              iconColor="red"
              title="本当に削除してよろしいですか"
              @confirm="deleteWord(dictionary, scope.row, scope.$index)"
            >
              <template #reference>
                <el-button size="mini" type="danger">
                  <i class="el-icon-delete" />
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <QuizListComponent
      v-else
      :dict="dictionary"
      :isVisible="isVisibleQuiz"
      @substituteTrue="substituteTrue"
      @substituteFalse="substituteFalse"
    />
    <el-dialog class="modal-window" v-model="isShowModalWindow">
      <el-alert
        title="文字数上限に達しています"
        type="error"
        show-icon
        :closable="false"
        v-if="isInputLimit"
      />
      <el-alert
        title="すでに保存されている内容があります"
        type="error"
        show-icon
        :closable="false"
        v-if="isDuplicate"
      ></el-alert>
      <el-form>
        <el-form-item label="ワード">
          <el-input
            v-model="dictContents.word"
            placeholder="30文字以下"
          ></el-input>
        </el-form-item>
        <el-form-item label="解説">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            v-model="dictContents.explanation"
            placeholder="100文字以下"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isShowModalWindow = false">キャンセル</el-button>
          <el-button
            @click="updateWord(dictionary, dictContents)"
            :disabled="isEmpty || isInputLimit || isDuplicate"
            >変更する</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { DictContents, Dictionary } from "@/types/dectionary";
import { computed, defineComponent, PropType, reactive, ref, watch } from "vue";
import QuizListComponent from "@/components/QuizListComponent.vue";

export default defineComponent({
  props: {
    dict: {
      type: Object as PropType<Dictionary>,
    },
    isVisible: {
      type: Boolean,
    },
  },
  emits: ["updateWord", "deleteWord", "substituteTrue", "substituteFalse"],
  components: { QuizListComponent },
  setup(props, context) {
    const dictionary = computed(() => props.dict);
    const isVisibleQuiz = computed(() => props.isVisible);
    const isShowModalWindow = ref<boolean>(false);
    const dictContents = reactive<DictContents>({
      word: "",
      explanation: "",
    });
    const dictContentsIndex = ref<number>();
    const isStartQuestion = ref<boolean>(false);
    const isEmpty = ref<boolean>(false);
    const isInputLimit = ref<boolean>(false);
    const isDuplicate = ref<boolean>(false);

    watch(dictContents, (newContents) => {
      dictContents.word = dictContents.word.replace(/\s+/g, "");
      dictContents.explanation = dictContents.explanation.replace(/\s+/g, "");
      if (dictContents.word === "" || dictContents.explanation === "") {
        isEmpty.value = true;
        return;
      }
      isEmpty.value = false;
      if (
        dictContents.word.length > 30 ||
        dictContents.explanation.length > 100
      ) {
        isInputLimit.value = true;
        return;
      }
      isInputLimit.value = false;
    });

    watch(dictContents, () => {
      const updateWords = dictionary.value?.words.filter(
        (w, index) => index != dictContentsIndex.value
      );
      if (updateWords == undefined) return;
      if (
        updateWords.some(
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

    function updateWord(dict: Dictionary, dictContents: DictContents) {
      context.emit("updateWord", dict, dictContents, dictContentsIndex.value);
      isShowModalWindow.value = false;
    }

    function deleteWord(
      dict: Dictionary,
      dictContents: DictContents,
      index: number
    ) {
      context.emit("deleteWord", dict, dictContents, index);
    }

    function editStart(contents: DictContents, index: number) {
      dictContentsIndex.value = index;
      dictContents.word = contents.word;
      dictContents.explanation = contents.explanation;
      isShowModalWindow.value = true;
    }

    function substituteTrue() {
      context.emit("substituteTrue");
    }
    function substituteFalse() {
      context.emit("substituteFalse");
    }

    return {
      dictionary,
      isVisibleQuiz,
      isShowModalWindow,
      dictContents,
      dictContentsIndex,
      isStartQuestion,
      isEmpty,
      isInputLimit,
      isDuplicate,
      updateWord,
      deleteWord,
      editStart,
      substituteTrue,
      substituteFalse,
    };
  },
});
</script>
<style scoped lang="postcss">
#word-list {
  height: 100%;
  margin: 10px 20px 0 10px;
}
.list-header {
  padding: 10px;
  border-bottom: 1px solid #b9b5b5;
  align-items: center;
}
.title {
  word-break: break-all;
}
.table {
  max-height: 70vh;
  overflow: scroll;
  margin-right: 10px;
}
.el-table::before {
  left: 0;
  bottom: 0;
  width: 0;
  height: 0;
}
.info {
  height: 70vh;
}
.info >>> .el-alert__title {
  font-size: 20px;
}
.radio-group
  >>> .el-radio-button__orig-radio:checked
  + .el-radio-button__inner {
  color: #fff;
  background-color: #909399;
  border-color: #909399;
  box-shadow: -1px 0 0 0 #909399;
}
.radio-group:hover >>> .el-radio-button__inner {
  color: #909399;
}
</style>