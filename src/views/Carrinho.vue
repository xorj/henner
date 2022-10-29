<template>
  <div v-if="loading" class="flex justify-center w-full mt-12">
        <q-spinner size="5em" :thickness="5" color="primary" />
      </div>
  <main v-else class="grid grid-cols-12 mx-20 my-12 gap-4">
    <div class="col-span-12">
      <h4 class="uppercase text-2xl font-semibold">MEU CARRINHO</h4>
      <p class="underline text-terceary text-sm cursor-pointer">
        Remover todos os itens do carrinho
      </p>
    </div>
    <div class="col-span-8 flex flex-column">
      <q-card
        v-for="item in itemsCarrinho"
        class="w-full mb-4"
        flat
        bordered
      >
        <q-card-section horizontal>
          <q-img class="col-3" :src="item.produto.thumbnail" :ratio="1/2" style="height: 150px"/>
          <q-card-section class="col-5">
            <div class="flex items-center mb-2">
              <p class="text-terceary font-bold mr-2">{{ item.produto.nome }}</p>
              <p class="text-primary font-semibold">R$ {{ item.produto.preco }}</p>
            </div>
            <div class="flex items-center">
              <p :class="{'mr-2': true, 'font-bold': true, 'text-secondary':  (item.produto.estoque - item.quantidade >= 0), 'text-negative': (item.produto.estoque - item.quantidade < 0)}">{{item.produto.estoque - item.quantidade >= 0 ? 'Em estoque' : 'Sem estoque'}}</p>
              <p class="mr-2 font-regular">Quantidade</p>
              <q-select
                class="w-24"
                v-model="item.quantidade"
                outlined
                dropdown-icon="expand_more"
                dense
                :options="getItemOptions(item.produto.estoque)"
              />
            </div>
          </q-card-section>
          <q-card-section class="flex content-end col-4">
            <p
              class="underline text-terceary text-sm cursor-pointer w-full text-end"
            >
              Remover do carrinho
            </p>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-span-4 border p-4 rounded h-min">
      <div class="mb-3">
        <p class="text-lg">
          Valor total do pedido:
          <span class="text-primary font-bold">R$ {{valorTotal}}</span>
        </p>
      </div>
      <div class="mb-3">
        <p class="text-base">
          Número de items: <span class="text-primary font-bold">{{numItems}}</span>
        </p>
      </div>
      <q-btn icon="shopping_cart" color="primary" class="w-full h-10">
        FECHAR PEDIDO
      </q-btn>
    </div>
  </main>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

let itemsCarrinho = ref([]);
let loading = ref(true);

function getItemOptions(disponivel) {
  let options = [];
  for (let i = 1; i <= disponivel; i++) {
    options.push(i);
  }

  return options;
}

let valorTotal = computed(() => {
  let total = 0;
  itemsCarrinho.value.forEach((item) => {
    total += item.produto.preco * item.quantidade;
  });

  return total;
});

let numItems = computed(() => {
  let total = 0;
  itemsCarrinho.value.forEach((item) => {
    total += item.quantidade;
  });
  return total;
});


onMounted(async () => {
  loading.value = true;
  itemsCarrinho.value = await store.dispatch("pegarCarrinhoUsuario");
  loading.value = false;
});
</script>
