<template>
  <div class="login">
    <dir v-if="!userAuth.userStatus">
      <h1>ログイン</h1>
      <h2>登録</h2>
      <label for="emaill">Email:</label>
      <input id="emaill" type="email" v-model="state.email" />
      <br /><br />
      <label for="password">パスワード:</label>
      <input id="password" type="password" v-model="state.password" />
      <br /><br />
      <button @click="login(state.email, state.password)">送信</button>
      {{ `email: ${state.email}` }}
      {{ `password: ${state.password}` }}
    </dir>
    <dir v-else>
      <h1>ログアウト</h1>
      <button @click="logout">ログアウトする</button>
    </dir>
  </div>
</template>

<script lang="ts">
import firebase from "../../src/plugins/firebase";
import { computed, defineComponent, reactive } from "vue";
import { UserAuthentication } from "../types/user";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const state = reactive<UserAuthentication>({
      email: "",
      password: "",
    });

    firebase.onAuth();
    const userAuth = reactive({
      user: computed(() => store.getters.user),
      userStatus: computed(() => store.getters.isSignedIn),
    });

    // ログイン処理
    async function login(email: string, password: string) {
      try {
        await firebase.login(email, password);
        state.email = "";
        state.password = "";
        alert("ログインに成功しました！");
      } catch {
        alert("ログインに失敗しました...");
      }
    }

    // ログアウト処理
    async function logout() {
      try {
        await firebase.logout();
        alert("ログアウトに成功しました！");
      } catch (err) {
        console.error(err);
        alert("ログアウトに失敗しました...");
      }
    }

    return {
      store,
      state,
      userAuth,
      login,
      logout,
    };
  },
});
</script>