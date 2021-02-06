<template>
  <div id="quiz-list">
    <template v-if="!isVisibleQuiz">
      <button @click="setQuizList(originWords.words)">クイズスタート</button>
    </template>
    <template v-else>
      <div>{{ quizIndex + 1 }}/{{ quizList.questions.length }}</div>
      <QuizComponent :quizOne="quiz" @answerResult="answerResult" />
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
  },
  components: {
    QuizComponent,
  },
  setup(props) {
    const dictionary = computed(() => props.dict);
    const quizList = reactive<Questions>({ questions: [] });
    const quiz = reactive<Question>({
      question: "",
      selections: [],
    });
    const originWords = reactive<any>({ words: [] });
    const quizIndex = ref<number>(0);
    const isVisibleQuiz = ref<boolean>(false);
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
      isVisibleQuiz.value = true;
    }

    function insertQuiz(quizList: Questions, index: number) {
      quiz.question = quizList.questions[index].question;
      quiz.selections = quizList.questions[index].selections;
    }

    function answerResult(result: boolean) {
      console.log(quizIndex.value);
      console.log(quizList.questions.length);
      if (!result) {
        return;
      }
      if (quizIndex.value + 1 === quizList.questions.length) {
        quiz.question = "";
        quiz.selections = [];
        quizIndex.value = 0;
        isVisibleQuiz.value = false;
        return;
      }
      if (result) {
        quizIndex.value++;
        insertQuiz(quizList, quizIndex.value);
      }
    }

    return {
      quizList,
      quiz,
      quizIndex,
      isVisibleQuiz,
      dictionary,
      originWords,
      createDummyList,
      setQuizList,
      answerResult,
      insertQuiz,
    };
  },
});
</script>
