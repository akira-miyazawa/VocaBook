<template>
  <div id="word-list">
    {{ dictContents.title }}
    <el-table :data="dictContents.words">
      <el-table-column prop="word" />
      <el-table-column prop="explanation" />
      <el-table-column><i class="el-icon-delete-solid" /></el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { DisplayDictContents } from "@/types/dectionary";
import { computed, defineComponent, PropType, ref } from "vue";
export default defineComponent({
  props: {
    displayValue: {
      type: Object as PropType<DisplayDictContents[]>,
    },
  },
  setup(props) {
    const dictContents = computed(() => props.displayValue);
    return {
      dictContents,
    };
  },
});
</script>