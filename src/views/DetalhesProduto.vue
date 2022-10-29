<template>
  <main class="mt-20 mx-40">
    <div v-if="loading" class="flex justify-center">
      <q-spinner size="5em" :thickness="10" color="primary" />
    </div>
    <div class="grid grid-cols-12 gap-8">
      <div class="col-span-6">
        <q-img :src="produto?.thumbnail" ratio="1" height="294px" />
      </div>
      <div class="col-span-6 border rounded p-4 h-min">
        <p class="text-2xl font-bold">
          {{ produto?.nome }}
          <span class="text-2xl text-terceary font-normal">{{
            produto?.marca
          }}</span>
        </p>
        <p class="text-primary text-2xl font-extrabold">
          R$ {{ produto?.preco }}
        </p>
        <p class="text-terceary mt-6">Antes de comprar escolha a quantidade</p>
        <p class="text-secondary font-bold">Em estoque</p>
        <div class="flex items-center">
          <p class="mr-2">Quantidade</p>
          <q-select
            class="w-24"
            v-model="quantidadeCarrinho"
            outlined
            dropdown-icon="expand_more"
            dense
            :options="optionsQuantidade(produto.estoque)"
          />
        </div>
        <q-btn
          class="mt-12 w-full"
          color="primary"
          icon="shopping_cart"
          :disable="quantidadeCarrinho == 0 || !logado"
          @click="adicionarCarrinho"
        >
          ADICIONAR AO CARRINHO
        </q-btn>
      </div>
      <div class="col-span-12">
        <h4 class="uppercase text-2xl font-semibold">SOBRE O PRODUTO</h4>
        <p class="mt-4">
          {{ produto?.descricao }}
        </p>
      </div>
      <div class="col-span-12">
        <h4
          class="uppercase text-2xl font-semibold underline underline-offset-4 text-primary"
        >
          AVALIAÇÕES
        </h4>
        <p class="mt-4">Produto ainda não possui avaliações.</p>
      </div>
    </div>
  </main>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";

const $q = useQuasar();
const route = useRoute();
const store = useStore();

let produto = ref({});
let loading = ref(true);
let quantidadeCarrinho = ref(0);
const id = route.params.id;
const logado = computed(() => !!store.state.user.token);

onMounted(async () => {
  loading.value = true;
  produto.value = await store.dispatch("detalhesProdutos", { id });
  loading.value = false;
});

function optionsQuantidade(estoque) {
  let options = [];
  for (let i = 0; i <= estoque; i++) {
    options.push(i);
  }
  return options;
}

function adicionarCarrinho() {
  store
    .dispatch("adicionarItemAoCarrinho", {
      produto_id: id,
      quantidade: quantidadeCarrinho.value,
    })
    .then(() => {
      $q.notify({
        icon: "add_shopping_cart",
        color: "positive",
        message: `Você adicionou ${quantidadeCarrinho.value } ${
          quantidadeCarrinho.value > 1 ? "itens" : "item"
        } ao carrinho`,
        timeout: 1000,
      });
    }).catch(() => {
      $q.notify({
        icon: "warning",
        color: "negative",
        message: `Não foi possível adicionar o item ao carrinho`,
        timeout: 1000
    })});
}
</script>
