<template>
  <div id="word-list">
    <el-radio-group v-model="isStartQuestion">
      <el-radio-button :label="false" :disabled="isVisibleQuiz"
        >一覧</el-radio-button
      >
      <el-radio-button :label="true">問題</el-radio-button>
    </el-radio-group>
    <h3>{{ dictionary.title }}</h3>
    <template v-if="!isStartQuestion">
      <el-table
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
            @click="updateWord(dictionary, dictContents)"
            :disabled="isEmpty || isDuplicate"
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
    const isDuplicate = ref<boolean>(false);

    watch(dictContents, (newContents) => {
      dictContents.word = dictContents.word.replace(/\s+/g, "");
      dictContents.explanation = dictContents.explanation.replace(/\s+/g, "");
      if (dictContents.word === "" || dictContents.explanation === "") {
        isEmpty.value = true;
        return;
      }
      isEmpty.value = false;
    });

    watch(dictContents, () => {
      const updateWords = dictionary.value?.words.filter(
        (w, index) => index != dictContentsIndex.value
      );
      if (updateWords == undefined) return;
      if (
        updateWords.some(
          (w) =>
            w.word === dictContents.word || w.word === dictContents.explanation
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
.table {
  width: 100%;
  max-height: 70vh;
  overflow: scroll;
  margin-right: 10px;
}
.el-table__row >>> td {
  width: 30%;
}
.el-table_1_column_2 {
  width: 60%;
}
.el-table_1_column_3 {
  width: 10%%;
}
.el-table::before {
  left: 0;
  bottom: 0;
  width: 0;
  height: 0;
}
</style>