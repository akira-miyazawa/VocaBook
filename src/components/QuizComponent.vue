<template class="quiz">
  <div class="question">{{ quiz.question }}</div>
  <el-radio-group class="radio-group" v-model="answerValue">
    <template v-for="selection in quiz.selections" :key="selection">
      <el-row class="radio"
        ><el-radio :label="selection.explanation">{{
          selection.word
        }}</el-radio></el-row
      >
    </template>
  </el-radio-group>
  <br /><br />
  <el-button
    type="primary"
    :plain="result"
    @click="checkResult(quiz.question, answerValue)"
    >回答</el-button
  >
  <el-button type="info" @click="pauseQuiz">中断</el-button>
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
<style lang="postcss" scoped>
.quiz {
  width: 100%;
}
.question {
  word-break: break-all;
  width: 100%;
  margin: 10px;
}
.el-radio {
  white-space: normal;
}
</style>