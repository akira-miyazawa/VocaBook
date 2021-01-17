<template>
  <div id="login">
    <el-row type="flex" justify="center">
      <el-col :span="8" class="login-form">
        <el-form label-position="top" label-width="140px">
          <el-form-item class="icon" label="メールアドレス">
            <el-input type="text" id="email" v-model="state.email" />
          </el-form-item>
          <el-form-item class="icon" label="パスワード">
            <el-input
              id="password"
              :minlength="6"
              :maxlength="20"
              v-model="state.password"
              show-password
            />
          </el-form-item>
          <el-button type="primary" @click="login(state.email, state.password)">
            ログイン
          </el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import firebase from "../../src/plugins/firebase";
import { computed, defineComponent, reactive } from "vue";
import { UserLogin } from "../types/user";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const state = reactive<UserLogin>({
      email: "",
      password: "",
    });

    firebase.onAuth();
    const userAuth = reactive({
      user: computed(() => store.getters.email),
      userStatus: computed(() => store.getters.isSignedIn),
    });

    // ログイン処理
    async function login(email: string, password: string) {
      try {
        await firebase.login(email, password);
        state.email = "";
        state.password = "";
        alert("ログインに成功しました！");
      } catch (err) {
        console.error(err);
        alert("ログインに失敗しました...");
        return;
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