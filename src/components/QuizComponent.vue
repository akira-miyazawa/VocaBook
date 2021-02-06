<template>
  <div>{{ quiz.question }}</div>
  <el-radio-group v-model="answer">
    <template v-for="selection in quiz.selections" :key="selection">
      <el-radio :label="selection.explanation">{{ selection.word }}</el-radio>
    </template>
  </el-radio-group>
  <br /><br />
  <el-button
    type="primary"
    :plain="result"
    @click="checkResult(quiz.question, answer)"
    >解答</el-button
  >
</template>
<script lang="ts">
import { Question } from "@/types/questions";
import { computed, defineComponent, PropType, ref } from "vue";

export default defineComponent({
  props: {
    quizOne: {
      type: Object as PropType<Question>,
    },
  },

  setup(props, context) {
    const quiz = computed(() => props.quizOne);
    const answer = ref("");
    const result = ref<boolean>();
    function checkResult(question: string, answer: string) {
      result.value = question === answer;
      context.emit("answerResult", result.value);
    }
    return { quiz, answer, checkResult, result };
  },
});
</script>