<template>
  <main class="grid grid-cols-12 mx-20 my-12 gap-4">
    <div class="col-span-12">
      <h4 class="uppercase text-2xl font-semibold">MEU CARRINHO</h4>
      <p class="underline text-terceary text-sm cursor-pointer">
        Remover todos os itens do carrinho
      </p>
    </div>
    <div class="col-span-8 flex flex-column">
      <q-card v-for="item in itemsCarrinho" class="w-full mb-4" flat bordered>
        <q-card-section horizontal>
          <q-img class="col-3" src="https://cdn.quasar.dev/img/parallax2.jpg" />
          <q-card-section class="col-5">
            <div class="flex items-center mb-2">
              <p class="text-terceary font-bold mr-2">{{ item.nome }}</p>
              <p class="text-primary font-semibold">R$ {{ item.preco }}</p>
            </div>
            <div class="flex items-center">
              <p class="mr-2 font-bold text-secondary">Em estoque</p>
              <p class="mr-2 font-regular">Quantidade</p>
              <q-select
                class="w-24"
                v-model="item.quantidadeSelecionada"
                outlined
                dropdown-icon="expand_more"
                dense
                :options="getItemOptions(item.quantidadeDisponivel)"
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
          <span class="text-primary font-bold">R$ 120</span>
        </p>
      </div>
      <div class="mb-3">
        <p class="text-base">
          Número de items: <span class="text-primary font-bold">3</span>
        </p>
      </div>
      <q-btn icon="shopping_cart" color="primary" class="w-full h-10">
        FECHAR PEDIDO
      </q-btn>
    </div>
  </main>
</template>
<script setup>
import { ref } from "vue";

let itemsCarrinho = ref([
  {
    nome: "Camiseta Dogs Division",
    preco: 119.39,
    quantidadeDisponivel: 3,
    quantidadeSelecionada: 1,
    imagem: "https://cdn.quasar.dev/img/parallax2.jpg",
  },
  {
    nome: "Camiseta Frogs Division",
    preco: 119.39,
    quantidadeDisponivel: 2,
    quantidadeSelecionada: 1,
    imagem: "https://cdn.quasar.dev/img/parallax2.jpg",
  },
  {
    nome: "Camiseta Cats Division",
    preco: 119.39,
    quantidadeDisponivel: 5,
    quantidadeSelecionada: 1,
    imagem: "https://cdn.quasar.dev/img/parallax2.jpg",
  },
]);

function getItemOptions(disponivel) {
  let options = [];
  for (let i = 1; i <= disponivel; i++) {
    options.push(i);
  }

  return options;
}
</script>
