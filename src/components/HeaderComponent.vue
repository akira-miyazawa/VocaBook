<template>
  <div id="header">
    <el-row height="80px">
      <el-col :span="8" class="user-auth">
        <i class="el-icon-user-solid">{{ displayName }} さん</i>
      </el-col>
      <el-col :span="8">
        <img src="../assets/vocabook.png" width="70" height="70" />
      </el-col>
      <el-col :span="8" class="user-auth">
        <el-button type="info" @click="logout">ログアウト</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Firebase from "../plugins/firebase";

export default defineComponent({
  setup() {
    const displayName = ref(localStorage.getItem("jwt"));

    async function logout() {
      try {
        await Firebase.logout();
      } catch (err) {
        console.error(err);
      }
    }

    return {
      displayName,
      logout,
    };
  },
});
</script>
<style lang="postcss" scoped>
#header {
  margin: 20px;
  border-bottom: solid 1px #dcdfe6;
}
.icon {
  text-align: center;
}
.user-auth {
  margin-top: auto;
  margin-bottom: auto;
}
</style>