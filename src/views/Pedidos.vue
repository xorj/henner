<template>
  <main class="mx-32 mt-10">
    <h2 class="font-bold text-3xl text-dark mb-4">PEDIDOS</h2>
    <div v-if="loading" class="flex justify-center w-full mt-12">
      <q-spinner size="5em" :thickness="5" color="primary" />
    </div>
    <div v-else>
        <p v-if="!pedidos" class="underline text-terceary text-sm cursor-pointer">
      Você não possui nenhum pedido.
    </p>
    <div v-else>
      <q-card v-for="pedido in pedidos" class="w-full mb-4" flat bordered>
        <q-card-section horizontal>
          <q-card-section class="col-3">
            <div class="flex items-center mb-2">
              <p class="text-terceary font-bold mr-2">
                Pedido realizado em <br />
                <span class="text-black">{{ pedido.data }}</span>
              </p>
            </div>
          </q-card-section>
          <q-card-section class="col-2">
            <p class="text-terceary font-bold mr-2">
              TOTAL <br />
              <span class="text-black">R$ {{ pedido.total.toFixed(2) }}</span>
            </p>
          </q-card-section>
          <q-card-section class="col-2">
            <p class="text-terceary font-bold mr-2">
              PEDIDO <br />
              <span class="text-black"> Nº {{ pedido.id }}</span>
            </p>
          </q-card-section>
          <q-card-section class="col-2">
            <p class="text-terceary font-bold mr-2">
              STATUS <br />
              <span class="text-black"> {{ pedido.status }}</span>
            </p>
          </q-card-section>
          <q-card-section class="flex justify-end itens-center col-3">
            <q-btn
              flat
              color="primary"
              @click="cancelarPedido(pedido.id)"
              :disabled="pedido.status == 'Cancelado'"
            >
              CANCELAR PEDIDO
            </q-btn>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
    </div>
  </main>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const router = useRouter();
const $q = useQuasar();
const store = useStore();

let pedidos = ref([]);
let loading = ref(true);

const loadPedidos = async () => {
  let response = await store.dispatch("pegarPedidosUsuario");
  pedidos.value = response;
  pedidos.value.forEach((pedido) => {
    pedido.status = getStatus(pedido.status);
    let data = new Date(pedido.data).toLocaleDateString("pt-BR", {
      timezone: "America/Sao_Paulo",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    pedido.data = data.slice(0, 11) + " às " + data.slice(11);
  });
  loading.value = false;
};

onMounted(async () => {
  await loadPedidos();
});

const cancelarPedido = async (id_pedido) => {
  await store
    .dispatch("cancelarPedido", { id_pedido })
    .then(() => {
      $q.notify({
        message: "Pedido cancelado com sucesso!",
        color: "positive",
      });
      loadPedidos();
    })
    .catch((error) => {
      $q.notify({
        message: "Erro ao cancelar pedido!",
        color: "negative",
      });
    });
    loading.value = false;
};

const getStatus = (status) => {
  switch (status) {
    case "1":
      return "Pendente";
    case "2":
      return "Pago";
    case "3":
      return "Cancelado";
    case "4":
      return "Entregue";
  }
};
</script>
