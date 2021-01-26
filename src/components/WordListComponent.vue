<template>
  <div id="word-list">
    {{ dictionary.title }}
    <el-table :data="dictionary.words">
      <el-table-column prop="word" />
      <el-table-column prop="explanation" />
      <el-table-column>
        <template #default="scope">
          <i
            class="el-icon-delete-solid"
            @click="deleteWord(dictionary, scope.row, scope.$index)"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { DictContents, Dictionary } from "@/types/dectionary";
import { computed, defineComponent, PropType, ref } from "vue";

export default defineComponent({
  props: {
    dict: {
      type: Object as PropType<Dictionary>,
    },
  },
  emits: ["deleteWord"],
  setup(props, context) {
    const dictionary = computed(() => props.dict);

    function deleteWord(
      dict: Dictionary,
      dictContents: DictContents,
      index: number
    ) {
      context.emit("deleteWord", dict, dictContents, index);
    }

    return {
      dictionary,
      deleteWord,
    };
  },
});
</script>