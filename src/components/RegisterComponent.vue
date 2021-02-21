<template>
  <div class="Register">
    <el-row type="flex" justify="center">
      <el-col :span="8" class="login-form">
        <el-alert
          title="新規登録に失敗しました。"
          type="error"
          show-icon
          :closable="false"
          v-if="isFailure"
        ></el-alert>
        <el-form label-position="top" label-width="140px">
          <el-form-item class="icon" label="ニックネーム">
            <el-input
              type="text"
              class="name"
              v-model="state.name"
              placeholder="入力してください"
            />
          </el-form-item>
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
              placeholder="6文字以上で設定してください"
            />
          </el-form-item>
          <el-button type="primary" @click="signUp()"> 新規登録 </el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from "vue";
import { UserRegister } from "../types/user";
import "firebase/firestore";
import Firebase from "../../src/plugins/firebase";

export default defineComponent({
  setup() {
    const state = reactive<UserRegister>({
      name: "",
      email: "",
      password: "",
    });
    const isFailure = ref<boolean>(false);

    watch(state, () => {
      state.name = state.name.replace(/\s+/g, "");
      state.email = state.email.replace(/\s+/g, "");
      state.password = state.password.replace(/\s+/g, "");
    });

    async function signUp() {
      try {
        await Firebase.signUp(state.email, state.password, state.name);
        state.email = "";
        state.password = "";
        isFailure.value = false;
      } catch (err) {
        isFailure.value = true;
      }
    }
    return {
      isFailure,
      state,
      signUp,
    };
  },
});
</script>