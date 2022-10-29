<template>
  <router-link
    :to="userLogged ? '/carrinho' : '/login'"
    class="text-dark flex items-center px-4 border-x-2 h-full"
  >
    <q-icon name="shopping_cart" color="primary" size="1.5rem" class="mr-1" />
    <p>Carrinho</p>
    <q-tooltip v-if="!userLogged"> Logue para acessar o carrinho </q-tooltip>
  </router-link>
</template>
<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const userLogged = computed(() => !!store.state.user.token);
</script>
