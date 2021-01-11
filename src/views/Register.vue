<template>
  <div class="Register">
    <h1>新規登録</h1>
    <h2>登録</h2>
    <label for="email">Email:</label>
    <input id="email" type="email" v-model="state.email" />
    <br /><br />
    <label for="password">パスワード:</label>
    <input id="password" type="password" v-model="state.password" />
    <br /><br />
    <button @click="signUp(state.email, state.password)">送信</button>
    {{ `email: ${state.email}` }}
    {{ `password: ${state.password}` }}
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { UserAuthentication } from "../types/user";
import firebase from "../../src/plugins/firebase";

export default defineComponent({
  setup() {
    const state = reactive<UserAuthentication>({
      email: "",
      password: "",
    });

    async function signUp(email: string, password: string) {
      try {
        await firebase.signUp(email, password);
      } catch (err) {
        console.error(err);
        alert("新規登録に失敗しました...");
      }
      state.email = "";
      state.password = "";
      alert("新規登録に成功しました！");
    }
    return {
      state,
      signUp,
    };
  },
});
</script>
