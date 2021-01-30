<template>
  <div id="word-list">
    {{ dictionary.title }}
    <el-table :data="dictionary.words">
      <el-table-column prop="word" />
      <el-table-column prop="explanation" />
      <el-table-column>
        <template #default="scope">
          <i
            class="el-icon-edit"
            @click="editStart(scope.row, scope.$index)"
          ></i>
        </template>
      </el-table-column>
      <el-table-column>
        <template #default="scope">
          <i
            class="el-icon-delete-solid"
            @click="deleteWord(dictionary, scope.row, scope.$index)"
          />
        </template>
      </el-table-column>
    </el-table>
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
          <el-button @click="updateWord(dictionary, dictContents)"
            >変更する</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { DictContents, Dictionary } from "@/types/dectionary";
import { computed, defineComponent, PropType, reactive, ref } from "vue";

export default defineComponent({
  props: {
    dict: {
      type: Object as PropType<Dictionary>,
    },
  },
  emits: ["updateWord", "deleteWord"],
  setup(props, context) {
    const dictionary = computed(() => props.dict);
    const isShowModalWindow = ref<boolean>(false);
    const dictContents = reactive<DictContents>({
      word: "",
      explanation: "",
    });
    const dictContentsIndex = ref<number>();

    function updateWord(
      dict: Dictionary,
      dictContents: DictContents,
      index: number
    ) {
      console.log(`dictContentsIndex:${dictContentsIndex.value}`);
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

    return {
      dictionary,
      isShowModalWindow,
      dictContents,
      dictContentsIndex,
      updateWord,
      deleteWord,
      editStart,
    };
  },
});
</script>