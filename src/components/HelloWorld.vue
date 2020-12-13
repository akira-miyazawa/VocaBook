<template>
  <div class="hello">
    <label>name:</label>
    <input v-model="name" />
    <label>message:</label>
    <input v-model="message" />
    <p>{{ message }}</p>
    <button @click="setDb">データベースに追加</button>
    <button @click="setDb">messageを一部変更</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { db } from "../plugins/firebase";

export type SaveData = {
  name: string;
  message: string;
};

export default defineComponent({
  data() {
    return {
      name: "",
      message: ""
    };
  },
  methods: {
    async setDb() {
      const saveData: SaveData = {
        name: this.name,
        message: this.message
      };
      await db
        .collection("dictionary_post_t")
        .doc("dictionary")
        .set(saveData);
    },
    async setNewData() {
      const saveData: SaveData = {
        name: this.name,
        message: this.message
      };
      await db
        .collection("dictonary_post_t")
        .doc("dictionary")
        .update({ message: saveData.message });
    }
  }
});
</script>

<style scoped lang="scss"></style>
