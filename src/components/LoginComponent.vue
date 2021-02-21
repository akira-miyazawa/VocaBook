<template>
  <div id="login">
    <el-row type="flex" justify="center">
      <el-col :span="8" class="login-form">
        <el-form label-position="top" label-width="140px">
          <el-alert
            title="ログインに失敗しました。"
            type="error"
            show-icon
            :closable="false"
            v-if="isFailure"
          ></el-alert>
          <el-form-item class="icon" label="メールアドレス">
            <el-input
              type="text"
              class="email"
              v-model="state.email"
              placeholder="入力してください"
            />
          </el-form-item>
          <el-form-item class="icon" label="パスワード">
            <el-input
              class="password"
              :minlength="6"
              :maxlength="20"
              v-model="state.password"
              show-password
              placeholder="入力してください"
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
import { defineComponent, reactive, ref, watch } from "vue";
import { UserLogin } from "../types/user";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const state = reactive<UserLogin>({
      email: "",
      password: "",
    });
    const isFailure = ref<boolean>(false);

    watch(state, () => {
      state.email = state.email.replace(/\s+/g, "");
      state.password = state.password.replace(/\s+/g, "");
    });

    // ログイン処理
    async function login(email: string, password: string) {
      try {
        await firebase.login(email, password);
        state.email = "";
        state.password = "";
        isFailure.value = false;
      } catch (err) {
        isFailure.value = true;
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
      isFailure,
      store,
      state,
      login,
      logout,
    };
  },
});
</script>