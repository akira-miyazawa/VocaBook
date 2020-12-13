<template>
  <div class="hello">
    <input v-model="message" />
    <p>{{ message }}</p>
    <button @click="setDb">データベースに追加</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { db } from "../plugins/firebase";

export type SaveDate = {
  message: string;
};

export default defineComponent({
  data() {
    return {
      message: "こんにちは"
    };
  },
  methods: {
    async setDb() {
      await db
        .collection("dictionary_post_t")
        .doc("dictionary")
        .set(this.$data);
    }
  }
});
</script>

<style scoped lang="scss"></style>
