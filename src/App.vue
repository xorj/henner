<template>
  <Navbar />
  <router-view />
</template>
<script setup>
import Navbar from "./components/Navbar.vue";
import { useStore } from "vuex";

if (localStorage.getItem("token")) {
  const store = useStore();
  store.commit("SET_TOKEN", localStorage.getItem("token"));
}
</script>
<style></style>
