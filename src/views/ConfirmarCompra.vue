<template>
  <main class="mx-32 mt-10">
    <h2 class="font-bold text-3xl text-dark mb-4">EFETUAR COMPRA</h2>

    <q-stepper v-model="step" vertical color="primary" animated>
      <q-step :name="1" title="Endereço" :icon="step == 1 ? 'home' : 'done'">
        <div class="flex justify-end">
          <div class="text-terceary font-regular w-full">
            <p>Richard Mayhew</p>
          </div>
          <div class="text-terceary font-regular w-full">
            <p>Rua Hamilton de Barros Soutinho, 962</p>
          </div>
          <div class="text-terceary font-regular w-full">
            <p>Jatiúca, Maceió - AL 57035-690</p>
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
              <q-radio v-model="formaDePagamento" val="boleto" />
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
              <q-radio v-model="formaDePagamento" val="pix" />
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
              <q-radio v-model="formaDePagamento" val="cartao" />
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
                  <p class="font-semibold mb-2">Cartão (Débito)</p>
                  <p class="col-span-11 text-sm align-middle">
                    Vencimento em 1 dia útil. A data de entrega será alterada
                    devido ao tempo de processamento do Boleto. Veja mais na
                    próxima página.
                  </p>
                </div>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <div
          class="flex border rounded w-max py-5 px-6 mt-5 ml-6"
          v-if="formaDePagamento == 'cartao'"
        >
          <div class="h-full mr-5">
            <div>
              <p>Número do Cartão</p>
              <p class="border rounded p-2 mt-2" style="width: 200px">
                1111 1111 1111
              </p>
            </div>
            <div class="mt-3">
              <p>Código de Segurança (CVV)</p>
              <p class="border rounded p-2 mt-2" style="width: 200px">123</p>
            </div>
          </div>
          <div class="h-full">
            <div>
              <p>Data de Expiração</p>
              <p class="border rounded p-2 mt-2" style="width: 200px">04/25</p>
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
          <div class="flex col-span-4 rounded border">
            <q-img
              class="col-3"
              src="https://cdn.quasar.dev/img/avatar2.jpg"
              height="100px"
              width="100px"
            />
            <div class="p-4">
              <p class="font-semibold text-terceary">Nome do Produto</p>
              <p class="font-bold text-sm text-primary">R$ 100,00</p>
            </div>
          </div>
          <div class="flex col-span-4 rounded border">
            <q-img
              class="col-3"
              src="https://cdn.quasar.dev/img/avatar2.jpg"
              height="100px"
              width="100px"
            />
            <div class="p-4">
              <p class="font-semibold text-terceary">Nome do Produto</p>
              <p class="font-bold text-sm text-primary">R$ 100,00</p>
            </div>
          </div>
          <div class="flex col-span-4 rounded border">
            <q-img
              class="col-3"
              src="https://cdn.quasar.dev/img/avatar2.jpg"
              height="100px"
              width="100px"
            />
            <div class="p-4">
              <p class="font-semibold text-terceary">Nome do Produto</p>
              <p class="font-bold text-sm text-primary">R$ 100,00</p>
            </div>
          </div>
          <div class="flex col-span-4 rounded border">
            <q-img
              class="col-3"
              src="https://cdn.quasar.dev/img/avatar2.jpg"
              height="100px"
              width="100px"
            />
            <div class="p-4">
              <p class="font-semibold text-terceary">Nome do Produto</p>
              <p class="font-bold text-sm text-primary">R$ 100,00</p>
            </div>
          </div>
          <div class="flex col-span-4 rounded border">
            <q-img
              class="col-3"
              src="https://cdn.quasar.dev/img/avatar2.jpg"
              height="100px"
              width="100px"
            />
            <div class="p-4">
              <p class="font-semibold text-terceary">Nome do Produto</p>
              <p class="font-bold text-sm text-primary">R$ 100,00</p>
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
                <span class="text-primary font-bold">R$ 1212,98</span>
              </p>
            </div>
            <div class="mb-3">
              <p class="text-base">
                Número de items: <span class="text-primary font-bold">4</span>
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
            <q-btn icon="shopping_cart" color="primary" class="w-full h-10">
              FECHAR PEDIDO
            </q-btn>
          </div>
        </div>
      </q-step>
    </q-stepper>
  </main>
</template>
<script setup>
import { ref } from "vue";

const step = ref(1);
const formaDePagamento = ref("");
</script>
