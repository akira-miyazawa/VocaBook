<template>
  <div id="home">
    <HeaderComponent
      :isVisible="isVisibleQuiz"
      @createDict="createDictionary"
    />
    <template v-if="postsData.posts.length > 0">
      <el-row>
        <el-col :span="6">
          <DictionaryListComponent
            :posts="postsData.posts"
            :dict="dictionary"
            :isVisible="isVisibleQuiz"
            @createDict="createDictionary"
            @deletDict="deletDictionary"
            @updateDict="updateDictionary"
            @addWord="addWordExplanation"
            @insertValue="insertDisplayValue"
          />
        </el-col>
        <el-col :span="18">
          <WordListComponent
            :dict="dictionary"
            :isVisible="isVisibleQuiz"
            @deleteWord="deleteWordExplanation"
            @updateWord="updateWordExlanation"
            @substituteTrue="substituteTrue"
            @substituteFalse="substituteFalse"
          />
        </el-col>
      </el-row>
    </template>
    <el-alert
      v-else
      class="info"
      title="ようこそVocaBookへ"
      type="success"
      center
      :closable="false"
      v-loading="loading"
      element-loading-text="Loading..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255,255,255,255)"
      element-loading-opacity="0"
    >
      新規作成からあなただけの辞書を作りましょう<i
        class="el-icon-magic-stick"
      />
    </el-alert>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import DictionaryListComponent from "@/components/DictionaryListComponent.vue";
import WordListComponent from "@/components/WordListComponent.vue";
import Firebase from "../plugins/firebase";
import { DictContents, Dictionary } from "@/types/dectionary";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    HeaderComponent,
    DictionaryListComponent,
    WordListComponent,
  },
  setup(props, context) {
    const postsData = reactive<any>({ posts: [] });
    const dictionary = reactive<Dictionary>({
      title: "",
      words: [],
      timeStamp: "",
      documentId: "",
      uid: "",
    });
    const isVisibleQuiz = ref<boolean>(false);
    const loading = ref<boolean>(true);
    const router = useRouter();

    const db = firebase.firestore();

    firebase.auth().onAuthStateChanged((user) => {
      Firebase.init();
      if (user) {
        db.collection("user")
          .doc(firebase.auth().currentUser?.uid)
          .collection("dictionary")
          .orderBy("timeStamp", "asc")
          .onSnapshot(function (snapshot) {
            snapshot.docChanges().forEach((change) => {
              if (change.type === "added") {
                postsData.posts.unshift(change.doc.data());
              }
            });
          });
      } else {
        router.push("/login");
      }
      setTimeout(() => {
        loading.value = false;
      }, 500);
    });
    async function createDictionary(dictTitle: string) {
      const auth = await db
        .collection("user")
        .doc(await firebase.auth().currentUser?.uid);
      auth.set({
        uid: await firebase.auth().currentUser?.uid,
      });
      const dict = await auth.collection("dictionary").doc();
      dict.set({
        title: dictTitle,
        words: [],
        timeStamp: firebase.firestore.Timestamp.now().toDate(),
        documentId: dict.id,
      });
      dictTitle = "";
    }

    async function deletDictionary(documentId: string) {
      await db
        .collection("user")
        .doc(await firebase.auth().currentUser?.uid)
        .collection("dictionary")
        .doc(documentId)
        .delete();
      const index = postsData.posts.findIndex(
        (dict: any) => dict.documentId === documentId
      );
      if (index !== -1) {
        postsData.posts.splice(index, 1);
      }
      dictionary.title = "";
      dictionary.words = [];
      dictionary.documentId = "";
      dictionary.timeStamp = "";
      dictionary.uid = "";
    }

    async function updateDictionary(
      title: string,
      documentId: string,
      index: number
    ) {
      await db
        .collection("user")
        .doc(await firebase.auth().currentUser?.uid)
        .collection("dictionary")
        .doc(documentId)
        .update({ title: title });
      postsData.posts[index].title = title;
      dictionary.title = title;
    }

    async function addWordExplanation(
      dict: Dictionary,
      dictContents: DictContents
    ) {
      const beforeDictLength = dict.words.length;
      // FireStoreは同じ内容の配列を入れることができない
      await db
        .collection("user")
        .doc(await firebase.auth().currentUser?.uid)
        .collection("dictionary")
        .doc(dict.documentId)
        .update({
          words: firebase.firestore.FieldValue.arrayUnion({
            word: dictContents.word,
            explanation: dictContents.explanation,
          }),
        });

      let newPostData: Dictionary = {
        title: "",
        words: [],
        timeStamp: "",
        documentId: "",
        uid: "",
      };

      // 取得処理
      await db
        .collection("user")
        .doc(await firebase.auth().currentUser?.uid)
        .collection("dictionary")
        .doc(dict.documentId)
        .get()
        .then((doc) => {
          newPostData = doc.data() as Dictionary;
        });

      if (beforeDictLength === newPostData.words.length) {
        alert("内容が重複しているため、追加できません。");
        return;
      }

      dict.words.push({
        word: dictContents.word,
        explanation: dictContents.explanation,
      });
      dictContents.word = "";
      dictContents.explanation = "";
    }

    async function deleteWordExplanation(
      dict: Dictionary,
      dictContents: DictContents,
      index: number
    ) {
      await db
        .collection("user")
        .doc(await firebase.auth().currentUser?.uid)
        .collection("dictionary")
        .doc(dict.documentId)
        .update({
          words: firebase.firestore.FieldValue.arrayRemove({
            word: dictContents.word,
            explanation: dictContents.explanation,
          }),
        });
      if (index !== -1) {
        dict.words.splice(index, 1);
      }
    }

    async function updateWordExlanation(
      dict: Dictionary,
      dictContents: DictContents,
      index: number
    ) {
      if (
        dict.words.some((w) => {
          return (
            w.word == dictContents.word &&
            w.explanation == dictContents.explanation
          );
        })
      ) {
        if (
          dict.words.findIndex(({ word }) => {
            return word === dictContents.word;
          }) === index &&
          dict.words.findIndex(({ explanation }) => {
            return explanation === dictContents.explanation;
          }) === index
        ) {
          return;
        }
        alert("内容が重複しているため、編集できません。");
        return;
      }
      dict.words[index].word = dictContents.word;
      dict.words[index].explanation = dictContents.explanation;
      await db
        .collection("user")
        .doc(await firebase.auth().currentUser?.uid)
        .collection("dictionary")
        .doc(dict.documentId)
        .update({
          words: dict.words,
        });
      dictContents.word = "";
      dictContents.explanation = "";
    }

    function insertDisplayValue(dict: Dictionary) {
      dictionary.title = dict.title;
      dictionary.words = dict.words;
      dictionary.documentId = dict.documentId;
      dictionary.timeStamp = dict.timeStamp;
      dictionary.uid = dict.uid;
    }

    function substituteTrue(result: boolean) {
      isVisibleQuiz.value = true;
    }

    function substituteFalse() {
      isVisibleQuiz.value = false;
    }

    return {
      postsData,
      dictionary,
      isVisibleQuiz,
      loading,
      router,
      createDictionary,
      deletDictionary,
      updateDictionary,
      addWordExplanation,
      deleteWordExplanation,
      updateWordExlanation,
      insertDisplayValue,
      substituteTrue,
      substituteFalse,
    };
  },
});
</script>
<style lang="postcss" scoped>
.info {
  height: 85vh;
}
.info >>> .el-alert__title {
  font-size: 50px;
}
.info >>> .el-alert__description {
  margin: 10px;
  font-size: 20px;
}
</style>