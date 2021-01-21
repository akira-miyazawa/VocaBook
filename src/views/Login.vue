<template>
  <div id="login">
    <el-row type="flex" justify="center">
      <el-col class="title">
        <img src="../assets/vocabook.png" width="100" height="100" />
      </el-col>
      <el-col class="title">
        <h1 class="icon">VocaBook</h1>
      </el-col>
    </el-row>
    <el-radio-group v-model="login">
      <el-radio :label="true">ログイン</el-radio>
      <el-radio :label="false">新規登録</el-radio>
    </el-radio-group>
    <LoginComponent v-if="login" />
    <RegisterComponent v-else />
  </div>
</template>

<script lang="ts">
import Firebase from "../../src/plugins/firebase";
import { computed, defineComponent, reactive, ref } from "vue";
import LoginComponent from "@/components/LoginComponent.vue";
import RegisterComponent from "@/components/RegisterComponent.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Login",
  components: {
    LoginComponent,
    RegisterComponent,
  },
  setup() {
    Firebase.onAuth();
    const login = ref(true);
    return {
      login,
    };
  },
});
</script>

<style lang="postcss" scoped>
.icon {
  font-family: Hiragino Maru Gothic ProN W4;
}
</style>