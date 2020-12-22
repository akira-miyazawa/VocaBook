<template>
  <div class="Register">
    <h1>新規登録</h1>
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
import firebase from "firebase";
import { defineComponent, reactive } from "vue";
import { UserAuthentication } from "../types/user";

export default defineComponent({
  setup() {
    const state = reactive<UserAuthentication>({
      email: "",
      password: ""
    });
    async function register() {
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(state.email, state.password);
      } catch (error) {
        console.log(error);
      }
    }
    return {
      state,
      register
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
