<template>
  <div class="login">
    <h1>Login page</h1>
    <h2>登録</h2>
    <label for="emaill">Email:</label>
    <input id="emaill" type="email" v-model="state.email" />
    <br /><br />
    <label for="password">パスワード:</label>
    <input id="password" type="password" v-model="state.password" />
    <br /><br />
    <button @click="register">送信</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { UserAuthentication } from "../types/user";

export default defineComponent({
  setup() {
    const state = reactive<UserAuthentication>({
      email: "",
      password: ""
    });
    return {
      state
    };
  }
  // methods: {
  //   register() {
  //     this.$store.dispatch("login", {
  //       email: this.email,
  //       password: this.password
  //     });
  //     this.email = "";
  //     this.password = "";
  //   }
  // }
});
</script>