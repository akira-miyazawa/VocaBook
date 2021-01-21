<template>
  <div class="home">
    <HelloWorld />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import Firebase from "../plugins/firebase";
import store from "@/store/store";

export default defineComponent({
  name: "Home",
  components: {
    HelloWorld,
  },
});
</script>
