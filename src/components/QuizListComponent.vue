<template>
  <div id="quiz-list">
    <template v-if="!isVisibleQuiz">
      <el-button
        @click="setQuizList(originWords.words, isVisibleQuiz)"
        type="success"
        icon="el-icon-success"
        plain
      >
        クイズスタート
      </el-button>
    </template>
    <template v-else>
      <div>{{ quizIndex + 1 }}/{{ quizList.questions.length }}</div>
      <QuizComponent
        :quizOne="quiz"
        @answerResult="answerResult"
        @pauseQuiz="pauseQuiz"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { DictContents, Dictionary } from "@/types/dectionary";
import {
  computed,
  defineComponent,
  PropType,
  reactive,
  Ref,
  ref,
  watch,
} from "vue";
import _ from "lodash";
import { Question, Questions } from "@/types/questions";
import QuizComponent from "@/components/QuizComponent.vue";
export default defineComponent({
  props: {
    dict: {
      type: Object as PropType<Dictionary>,
    },
    isVisible: {
      type: Boolean,
    },
  },
  components: {
    QuizComponent,
  },
  emits: ["substituteTrue", "substituteFalse"],
  setup(props, context) {
    const dictionary = computed(() => props.dict);
    const isVisibleQuiz = computed(() => props.isVisible);
    const quizList = reactive<Questions>({ questions: [] });
    const quiz = reactive<Question>({
      question: "",
      selections: [],
    });
    const originWords = reactive<any>({ words: [] });
    const quizIndex = ref<number>(0);
    originWords.words = dictionary.value?.words;
    watch(
      () => dictionary,
      (newDict, oldDict) => {
        originWords.title = newDict.value?.title;
        originWords.words = newDict.value?.words;
      },
      { deep: true }
    );

    function createDummyList(words: DictContents[], index: number) {
      return words.filter((item) => item.word != words[index].word);
    }

    // ランダムにクイズを生成
    function setQuizList(words: DictContents[]) {
      quizList.questions = _.shuffle(
        words.map((item, index) => {
          const dummyList = createDummyList(words, index);
          return {
            question: words[index].explanation,
            selections: _.shuffle(
              _.concat(_.sampleSize(dummyList, 3), words[index])
            ),
          };
        })
      );
      quiz.question = quizList.questions[quizIndex.value].question;
      quiz.selections = quizList.questions[quizIndex.value].selections;
      context.emit("substituteTrue");
    }

    function insertQuiz(quizList: Questions, index: number) {
      quiz.question = quizList.questions[index].question;
      quiz.selections = quizList.questions[index].selections;
    }

    function answerResult(result: boolean) {
      if (!result) {
        return;
      }
      if (quizIndex.value + 1 === quizList.questions.length) {
        quiz.question = "";
        quiz.selections = [];
        quizIndex.value = 0;
        context.emit("substituteFalse");
        return;
      }
      if (result) {
        quizIndex.value++;
        insertQuiz(quizList, quizIndex.value);
      }
    }

    function pauseQuiz() {
      quiz.question = "";
      quiz.selections = [];
      quizIndex.value = 0;
      context.emit("substituteFalse");
    }

    return {
      dictionary,
      quizList,
      quiz,
      quizIndex,
      isVisibleQuiz,
      originWords,
      createDummyList,
      setQuizList,
      answerResult,
      insertQuiz,
      pauseQuiz,
    };
  },
});
</script>
