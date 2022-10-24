<template>
  <nav class="bg-white px-2 md:px-3 flex font-medium shadow-1 h-16">
    <Logo />
    <div class="ml-auto flex items-center">
      <LinksProducts />
      <CartLink />
      <UserInfo />
    </div>
  </nav>
</template>
<script setup>
import Logo from "./Logo.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
import LinksProducts from "./LinksProducts.vue";
import CartLink from "./CartLink.vue";
import UserInfo from "./UserInfo.vue";


const route = useRoute();
</script>
