<template>
  <main class="grid grid-cols-12 mx-20 my-12 gap-4">
    <div class="col-span-12">
      <h4 class="uppercase text-2xl font-semibold">MEU CARRINHO</h4>
      <p class="underline text-terceary text-sm cursor-pointer">
        Remover todos os itens do carrinho
      </p>
    </div>
    <div class="col-span-8 flex flex-column">
      <q-card v-for="item in itemsCarrinho" class="w-full" flat bordered>
        <q-card-section horizontal>
          <q-img class="col-3" src="https://cdn.quasar.dev/img/parallax2.jpg" />

          <q-card-section class="col-5">
            <div class="flex items-center">
              <p class="text-terceary font-bold mr-2">{{ item.nome }}</p>
              <p class="text-primary font-semibold">{{ item.preco }}</p>
            </div>
            <div>
              <p class="font-bold text-secondary">Em estoque</p>
              <q-select
                v-model="item.quantidadeSelecionada"
                label="2"
                :options="
                    Array.from({ length: item.quantidade }, (_, i) => i + 1)
                "
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
    <div class="grid col-span-4 border p-4 rounded gap-y-4">
      <p class="text-xl">
        Valor total do pedido:
        <span class="text-primary font-bold">R$ 120</span>
      </p>
      <p class="text-lg">
        Número de items: <span class="text-primary font-bold">3</span>
      </p>
      <q-btn color="primary" class="w-full">
        <q-icon name="shopping_cart" class="mr-2" />
        Fechar Pedido
      </q-btn>
    </div>
  </main>
</template>
<script setup>
import { ref } from "vue";

let itemsCarrinho = ref([
  {
    nome: "Camiseta Cats Division",
    preco: 119.39,
    quantidadeDisponivel: 2,
    quantidadeSelecionada: 1,
    imagem: "https://cdn.quasar.dev/img/parallax2.jpg",
  },
  {
    nome: "Camiseta Cats Division",
    preco: 119.39,
    quantidadeDisponivel: 2,
    quantidadeSelecionada: 1,
    imagem: "https://cdn.quasar.dev/img/parallax2.jpg",
  },
  {
    nome: "Camiseta Cats Division",
    preco: 119.39,
    quantidadeDisponivel: 2,
    quantidadeSelecionada: 1,
    imagem: "https://cdn.quasar.dev/img/parallax2.jpg",
  },
]);

function getItemOptions(disponivel) {
  return Array.from({ length: disponivel }, (_, i) => i + 1).map((i) => ({
    text: i,
    value: i,
  }));
}
</script>
