<template>
  <div v-if="loading" class="flex justify-center w-full mt-12">
    <q-spinner size="5em" :thickness="5" color="primary" />
  </div>
  <main v-else class="grid grid-cols-12 mx-20 my-12 gap-4">
    <div class="col-span-12">
      <h4 class="uppercase text-2xl font-semibold">MEU CARRINHO</h4>
      <p
        v-if="podeRemoverTodos"
        class="underline text-terceary text-sm cursor-pointer"
        @click="removerTodosItems"
      >
        Remover todos os itens do carrinho
      </p>
    </div>
    <div v-if="!itensCarrinho.length" class="col-span-8 flex flex-column">
      <h3>Você não possui nenhum item no carrinho.</h3>
    </div>
    <div v-else class="col-span-8 flex flex-column">
      <q-card v-for="item in itensCarrinho" class="w-full mb-4" flat bordered>
        <q-card-section horizontal>
          <q-img
            class="col-3"
            :src="item.produto.thumbnail"
            :ratio="1 / 2"
            style="height: 150px"
          />
          <q-card-section class="col-5">
            <div class="flex items-center mb-2">
              <p class="text-terceary font-bold mr-2">
                {{ item.produto.nome }}
              </p>
              <p class="text-primary font-semibold">
                R$ {{ item.produto.preco }}
              </p>
            </div>
            <div class="flex items-center">
              <p
                :class="{
                  'w-full': true,
                  'mb-3': true,
                  'font-bold': true,
                  'text-secondary': item.produto.estoque - item.quantidade >= 0,
                  'text-negative': item.produto.estoque - item.quantidade < 0,
                }"
              >
                {{
                  item.produto.estoque - item.quantidade >= 0
                    ? "Em estoque"
                    : "Sem estoque"
                }}
              </p>
              <p class="mr-2 font-regular">Quantidade</p>
              <q-select
                class="w-24"
                v-model="item.quantidade"
                outlined
                dropdown-icon="expand_more"
                dense
                @update:model-value="mudarQuantidadeCarrinho(item.id, item.quantidade)"
                :options="getItemOptions(item.produto.estoque)"
              />
            </div>
          </q-card-section>
          <q-card-section class="flex content-end col-4">
            <p
              class="underline text-terceary text-sm cursor-pointer w-full text-end"
              @click="removerItemCarrinho(item.id)"
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
          <span class="text-primary font-bold">R$ {{ valorTotal }}</span>
        </p>
      </div>
      <div class="mb-3">
        <p class="text-base">
          Número de items:
          <span class="text-primary font-bold">{{ numItems }}</span>
        </p>
      </div>
      <q-btn icon="shopping_cart" color="primary" class="w-full h-10" @click="efetuarPedido" :disabled="!itensCarrinho.length">
        EFETUAR PEDIDO
      </q-btn>
    </div>
  </main>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();
const $q = useQuasar();

let itensCarrinho = ref([]);
let idCarrinho = ref(-1);
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
  itensCarrinho.value.forEach((item) => {
    total += item.produto.preco * item.quantidade;
  });

  return total.toFixed(2);
});

let numItems = computed(() => {
  let total = 0;
  itensCarrinho.value.forEach((item) => {
    total += item.quantidade;
  });
  return total;
});

let podeRemoverTodos = computed(() => {
  return itensCarrinho.value.length;
});

const mudarQuantidadeCarrinho = async (item_id, quantidade) => {
  await store.dispatch("mudarQuantidadeCarrinho", { item_id, quantidade });
  $q.notify({
    icon: "remove_shopping_cart",
    color: "positive",
    message: `Quantidade alterada para ${quantidade}`,
    timeout: 1000,
  });
  updateCarrinho();
};

const removerItemCarrinho = async (item_id) => {
  await store.dispatch("removerItemDoCarrinho", { item_id });
  $q.notify({
    icon: "remove_shopping_cart",
    color: "positive",
    message: "Item removido do carrinho",
    timeout: 1000,
  });
  updateCarrinho();
};

const removerTodosItems = async () => {
  await store.dispatch("removerTodosItensDoCarrinho", {
    carrinho_id: idCarrinho.value,
  });
  updateCarrinho();
};

const updateCarrinho = async () => {
  loading.value = true;
  itensCarrinho.value = await store.dispatch("pegarCarrinhoUsuario");
  if (itensCarrinho.value.length) {
    idCarrinho.value = itensCarrinho.value[0].carrinho;
    podeRemoverTodos = true;
  } else {
    podeRemoverTodos = false;
  }
  loading.value = false;
};

onMounted(async () => {
  await updateCarrinho();
});

const efetuarPedido = () => {
  router.push({name: "Efetuar Pedido"});
}
</script>
