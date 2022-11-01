<template>
  <Navbar />
  <router-view />
</template>
<script setup>
import Navbar from "./components/Navbar.vue";
import { useStore } from "vuex";
import { onBeforeMount } from "vue";


onBeforeMount(() => {
  if (localStorage.getItem("token")) {
  const store = useStore();
  store.commit("SET_TOKEN", localStorage.getItem("token"));
  store.dispatch("pegarInfoUser");
}
});

</script>
<style></style>
