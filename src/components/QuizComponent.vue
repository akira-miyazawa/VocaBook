<template>
  <div id="quiz"></div>
  <button @click="setQuizList(originWords.words)">クイズスタート</button>
  <br />
  <br />
  <template v-for="question in quizList.questions" :key="question">
    {{ question.question }}
    <br />
    <br />
    <template v-for="item in question.selections" :key="item">
      {{ item.word }}
    </template>
    <br />
    <br />
  </template>
</template>

<script lang="ts">
import { DictContents, Dictionary } from "@/types/dectionary";
import { computed, defineComponent, PropType, reactive, watch } from "vue";
import _ from "lodash";
import { Questions } from "@/types/questions";
export default defineComponent({
  props: {
    dict: {
      type: Object as PropType<Dictionary>,
    },
  },
  setup(props) {
    const quizList = reactive<Questions>({ questions: [] });
    const dictionary = computed(() => props.dict);
    const originWords = reactive<any>({ words: [] });
    const answerWord = reactive<DictContents>({
      word: "",
      explanation: "",
    });
    const answerWords = reactive<any>({ words: [] });
    const DummyWords = reactive<any>({ words: [] });
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
    }

    function checkAnswer(answer: string, response: string) {
      return answer === response;
    }

    return {
      quizList,
      dictionary,
      originWords,
      answerWords,
      answerWord,
      DummyWords,
      createDummyList,
      setQuizList,
    };
  },
});
</script>
