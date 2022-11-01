<template>
  <main class="mx-32 mt-10">
    <h2 class="font-bold text-3xl text-dark mb-4">EFETUAR COMPRA</h2>
    <p
      v-if="!validarCartao || !validarEndereco"
      class="underline text-terceary text-sm cursor-pointer"
      @click="goToEditarPerfil"
    >
      Para finalizar a compra, é necessário preencher os campos de Endereço e
      Cartão
    </p>
    <p
      v-if="!itensNoCarrinho"
      class="underline text-terceary text-sm cursor-pointer"
      @click="goToListarProdutos"
    >
      Por favor, adicione itens ao carrinho para finalizar a compra
    </p>
    <q-stepper v-else v-model="step" vertical color="primary" animated>
      <q-step :name="1" title="Endereço" :icon="step == 1 ? 'home' : 'done'">
        <div class="flex justify-end">
          <div class="text-terceary font-regular w-full">
            <p>Nome do Destinatário</p>
          </div>
          <div class="text-terceary font-regular w-full">
            <p>{{ endereco.rua }}, {{ endereco.numero }}</p>
          </div>
          <div class="text-terceary font-regular w-full">
            <p>
              {{ endereco.bairro }}, {{ endereco.cidade }} -
              {{ endereco.estado }} {{ endereco.cep }}
            </p>
          </div>
          <q-btn class="mt-3" color="primary" @click="step++"> Próximo </q-btn>
        </div>
      </q-step>
      <q-step
        :name="2"
        title="Método de Pagamento"
        :icon="step <= 2 ? 'payments' : 'done'"
      >
        <q-list>
          <q-item tag="label" v-ripple>
            <q-item-section avatar center>
              <q-radio v-model="formaDePagamento" val="2" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="grid grid-cols-12">
                <div class="flex justify-center">
                  <q-img
                    class="my-auto"
                    src="@/assets/boleto.svg"
                    height="27px"
                    width="41px"
                  />
                </div>
                <div class="col-span-11">
                  <p class="font-semibold mb-2">Boleto</p>
                  <p class="col-span-11 text-sm align-middle">
                    Vencimento em 1 dia útil. A data de entrega será alterada
                    devido ao tempo de processamento do Boleto. Veja mais na
                    próxima página.
                  </p>
                </div>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section avatar center>
              <q-radio v-model="formaDePagamento" val="3" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="grid grid-cols-12">
                <div class="flex justify-center">
                  <q-img
                    class="my-auto"
                    src="@/assets/pix.svg"
                    height="25px"
                    width="25px"
                  />
                </div>
                <div class="col-span-11">
                  <p class="font-semibold mb-2">Pix</p>
                  <p class="col-span-11 text-sm align-middle">
                    O código Pix gerado para o pagamento é válido por 30 minutos
                    após a finalização do pedido.
                  </p>
                </div>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section avatar center>
              <q-radio v-model="formaDePagamento" val="1" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="grid grid-cols-12">
                <div class="flex justify-center">
                  <q-img
                    class="my-auto"
                    src="@/assets/cartao.svg"
                    height="27px"
                    width="41px"
                  />
                </div>
                <div class="col-span-11">
                  <p class="font-semibold mb-2">Cartão</p>
                  <p class="col-span-11 text-sm align-middle">
                    Vencimento em 30 minutos. A data de entrega será alterada
                    devido ao tempo de processamento da cobrança. Veja mais na
                    próxima página.
                  </p>
                </div>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <div
          class="flex border rounded w-max py-5 px-6 mt-5 ml-6"
          v-if="formaDePagamento == '1'"
        >
          <div class="h-full mr-5">
            <div>
              <p>Número do Cartão</p>
              <p class="border rounded p-2 mt-2" style="width: 200px">
                {{ cartao.numero }}
              </p>
            </div>
            <div class="mt-3">
              <p>Código de Segurança (CVV)</p>
              <p class="border rounded p-2 mt-2" style="width: 200px">
                {{ cartao.codigo }}
              </p>
            </div>
          </div>
          <div class="h-full">
            <div>
              <p>Data de Expiração</p>
              <p class="border rounded p-2 mt-2" style="width: 200px">
                {{ cartao.validade }}
              </p>
            </div>
          </div>
        </div>

        <div class="flex justify-between mt-4">
          <q-btn class="mt-3" color="primary" @click="step--"> Voltar </q-btn>
          <q-btn
            :disable="!formaDePagamento"
            class="mt-3"
            color="primary"
            @click="step++"
          >
            Próximo
          </q-btn>
        </div>
      </q-step>
      <q-step
        :name="3"
        title="Itens do Pedido"
        :icon="step <= 3 ? 'category' : 'done'"
      >
        <div class="grid grid-cols-12 gap-4 mt-3">
          <div v-for="item in carrinho" class="flex col-span-4 rounded border">
            <q-img
              class="col-3"
              :src="item.produto.thumbnail"
              height="100px"
              width="100px"
            />
            <div class="p-4">
              <p class="font-semibold text-terceary">{{item.produto.nome}} ({{item.quantidade}})</p>
              <p class="font-bold text-sm text-primary">R$ {{item.produto.preco}}</p>
            </div>
          </div>
        </div>
        <div class="flex justify-between mt-4">
          <q-btn class="mt-3" color="primary" @click="step--"> Voltar </q-btn>
          <q-btn
            :disable="!formaDePagamento"
            class="mt-3"
            color="primary"
            @click="step++"
          >
            Próximo
          </q-btn>
        </div>
      </q-step>
      <q-step
        :name="4"
        title="Resumo do Pedido"
        :icon="step <= 4 ? 'category' : 'done'"
      >
        <div class="flex border p-4 rounded mx-auto">
          <div>
            <div class="mb-3">
              <p class="text-lg">
                Valor total do pedido:
                <span class="text-primary font-bold">R$ {{totalCarrinho}}</span>
              </p>
            </div>
            <div class="mb-3">
              <p class="text-base">
                Número de items: <span class="text-primary font-bold">{{quantidadeItens}}</span>
              </p>
            </div>
            <div class="mb-3">
              <p class="text-base">
                Ao fazer seu pedido, você concorda com as da
                <span class="text-primary underline cursor-pointer"
                  >Condições de Uso</span
                >
                HENNER.
              </p>
            </div>
          </div>
          <div class="flex items-end ml-auto">
            <q-btn
              icon="shopping_cart"
              color="primary"
              class="w-full h-10"
              @click="fazerPedido"
            >
              FECHAR PEDIDO
            </q-btn>
          </div>
        </div>
      </q-step>
    </q-stepper>
  </main>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const router = useRouter();
const $q = useQuasar();
const store = useStore();

const step = ref(1);
const formaDePagamento = ref("2");

let endereco = ref({});
let cartao = ref({});
let carrinho = ref([]);
let totalCarrinho = ref(0);
let quantidadeItens = ref(0);

const calcTotalCarrinho = () => {
  let total = 0;
  carrinho.value.forEach((item) => {
    total += item.subtotal;
  });
  totalCarrinho.value = total;
};
const calcQtdCarrinho = () => {
  let total = 0;
  carrinho.value.forEach((item) => {
    total += item.quantidade;
  });
  quantidadeItens.value = total;
};


onMounted(async () => {
  const enderecoAtual = await store.dispatch("pegarEnderecoUsuario");
  const cartaoAtual = await store.dispatch("pegarCartaoUsuario");
  const carrinhoAtual = await store.dispatch("pegarCarrinhoUsuario");

  if (enderecoAtual) {
    endereco.value = enderecoAtual[0];
    validarEndereco.value = !!endereco.value.rua;
  }
  if (cartaoAtual) {
    cartao.value = cartaoAtual[0];
    validarCartao.value = !!cartao.value.numero;
  }
  if (carrinhoAtual) {
    carrinho.value = carrinhoAtual;
    calcTotalCarrinho();
    calcQtdCarrinho();
  }
});

let validarEndereco = ref(false);

let validarCartao = ref(false);

const fazerPedido = async () => {
  store
    .dispatch("fazerPedido", {
      endereco: endereco.value.id,
      forma_de_pagamento: formaDePagamento.value,
    })
    .then((response) => {
      $q.notify({
        type: "positive",
        message: "Pedido realizado com sucesso!",
      });
      router.push("/pedidos");
    })
    .catch((error) => {
      $q.notify({
        type: "negative",
        message: "Erro ao realizar pedido!",
      });
    });
};

const goToEditarPerfil = () => {
  router.push({ name: "Editar Perfil" });
};

const goToListarProdutos = () => {
  router.push({ name: "Produtos" });
};
</script>
