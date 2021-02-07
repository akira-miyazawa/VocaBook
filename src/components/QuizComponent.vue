<template>
  <div>{{ quiz.question }}</div>
  <el-radio-group v-model="answerValue">
    <template v-for="selection in quiz.selections" :key="selection">
      <el-radio :label="selection.explanation">{{ selection.word }}</el-radio>
    </template>
  </el-radio-group>
  <br /><br />
  <el-button
    type="primary"
    :plain="result"
    @click="checkResult(quiz.question, answerValue)"
    >解答</el-button
  >
  <el-button type="info" @click="pauseQuiz">リセット</el-button>
</template>
<script lang="ts">
import { Question } from "@/types/questions";
import Notify from "element-plus/lib/el-notification";
import { computed, defineComponent, PropType, ref } from "vue";

export default defineComponent({
  props: {
    quizOne: {
      type: Object as PropType<Question>,
    },
  },
  emits: ["answerResult", "pauseQuiz"],
  setup(props, context) {
    const quiz = computed(() => props.quizOne);
    const answerValue = ref("");
    const result = ref<boolean>();
    function checkResult(question: string, answer: string) {
      if (answer == undefined || answer === "") {
        return;
      }
      result.value = question === answer;
      if (result.value) {
        Notify({ title: "正解", type: "success", duration: 1500 });
      } else {
        Notify({ title: "残念", type: "error", duration: 1500 });
      }
      answerValue.value = "";
      context.emit("answerResult", result.value);
    }
    function pauseQuiz() {
      context.emit("pauseQuiz");
    }
    return { quiz, answerValue, checkResult, result, pauseQuiz };
  },
});
</script>