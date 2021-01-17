<template>
  <div class="Register">
    <el-row type="flex" justify="center">
      <el-col :span="8" class="login-form">
        <el-form label-position="top" label-width="140px">
          <el-form-item class="icon" label="ニックネーム">
            <el-input type="text" id="name" v-model="state.name" />
          </el-form-item>
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
          <el-button type="primary" @click="signUp()"> ログイン </el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { UserRegister } from "../types/user";
import firebase from "firebase";
import Firebase, { db } from "../../src/plugins/firebase";

export default defineComponent({
  setup() {
    const state = reactive<UserRegister>({
      name: "",
      email: "",
      password: "",
    });

    async function signUp() {
      try {
        await Firebase.signUp(state.email, state.password);
        await db
          .collection("user")
          .doc(await firebase.auth().currentUser?.uid)
          .set({
            name: state.name,
          });
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