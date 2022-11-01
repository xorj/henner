<template>
  <main class="my-20 mx-10 md:mx-48">
    <h2 class="font-bold text-3xl mb-4">EDITAR PERFIL</h2>
    <div class="py-4 px-5 rounded border">
      <h3 class="font-bold uppercase">Editar Endereço</h3>
      <Form @submit="onSubmitEndereco">
        <div class="grid grid-cols-12 gap-4 w-full">
          <div class="col-span-12 md:col-span-6">
            <q-input
              v-model="endereco.cep"
              outlined
              label="CEP"
              name="cep"
              id="cep"
              type="text"
              class="w-full"
              mask="#####-###"
              @update:model-value="onCepChange(endereco.cep)"
            />
          </div>
          <div class="col-span-12 md:col-span-6">
            <q-input
              v-model="endereco.estado"
              outlined
              label="Estado (UF)"
              id="uf"
              type="text"
              class="w-full"
              mask="AA"
            />
          </div>
          <div class="col-span-12 md:col-span-6">
            <q-input
              v-model="endereco.cidade"
              outlined
              label="Cidade"
              id="cidade"
              type="text"
              class="w-full"
            />
          </div>
          <div class="col-span-12 md:col-span-6">
            <q-input
              v-model="endereco.bairro"
              outlined
              label="Bairro"
              id="bairro"
              type="text"
              class="w-full"
            />
          </div>
          <div class="col-span-12 md:col-span-6">
            <q-input
              v-model="endereco.rua"
              outlined
              label="Rua"
              id="rua"
              type="text"
              class="w-full"
            />
          </div>
          <div class="col-span-12 md:col-span-6">
            <q-input
              v-model="endereco.numero"
              outlined
              label="Número"
              id="numero"
              type="text"
              class="w-full"
            />
          </div>
          <div class="col-span-12 flex items-end flex-col">
            <q-btn
              type="submit"
              color="primary"
              label="Salvar"
              class="py-2 px-24"
            />
          </div>
        </div>
      </Form>
    </div>
    <div class="py-4 px-5 mt-4 rounded border">
      <h3 class="font-bold uppercase">Editar Cartão</h3>
      <Form @submit="onSubmitCartao">
        <div class="grid grid-cols-12 gap-4 w-full">
          <div class="col-span-12 md:col-span-6">
            <q-input
              v-model="cartao.nome"
              outlined
              label="Nome no cartão"
              name="Nome no cartão"
              type="text"
              class="w-full"
            />
          </div>
          <div class="col-span-12 md:col-span-6">
            <q-input
              v-model="cartao.numero"
              outlined
              label="Número do cartão"
              id="numero_cartao"
              type="text"
              class="w-full"
              mask="#### #### #### ####"
            />
          </div>
          <div class="col-span-12 md:col-span-6">
            <q-input
              v-model="cartao.codigo"
              outlined
              label="Código de segurança (CVV)"
              id="cvv"
              type="text"
              class="w-full"
              mask="###"
            />
          </div>
          <div class="col-span-12 md:col-span-6">
            <q-input
              v-model="cartao.validade"
              outlined
              label="Validade"
              id="Validade"
              type="text"
              class="w-full"
              mask="##/##"
            />
          </div>
          <div class="col-span-12 flex items-end flex-col">
            <q-btn
              type="submit"
              color="primary"
              label="Salvar"
              class="py-2 px-24"
            />
          </div>
        </div>
      </Form>
    </div>
    <div class="py-4 px-5 mt-4 rounded border">
      <h3 class="font-bold uppercase">DESATIVAR CONTA</h3>
      <div class="grid grid-cols-12 gap-4 w-full">
        <div class="col-span-4 flex flex-col">
          <q-btn
            @click="onClickDesativarConta"
            color="negative"
            label="Desativar conta"
            class="py-2 px-24"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Form } from "vee-validate";
import ibgeServices from "@/services/ibgeServices";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const $q = useQuasar();
const store = useStore();
const router = useRouter();

let endereco = ref({
  rua: "",
  numero: "",
  bairro: "",
  cidade: "",
  estado: "",
  cep: "",
});

let cartao = ref({
  numero: "",
  nome: "",
  validade: "",
  codigo: "",
});

const setEndereco = (enderecoResponse) => {
  endereco.value = {
    ...endereco.value,
    rua: enderecoResponse.logradouro,
    numero: "",
    bairro: enderecoResponse.bairro,
    cidade: enderecoResponse.localidade,
    estado: enderecoResponse.uf,
  };
};

const onCepChange = async (cep) => {
  if (cep.length === 9) {
    ibgeServices.getEnderecoByCEP({ cep }).then((response) => {
      if (response.erro) {
        $q.notify({
          type: "negative",
          message: "CEP não encontrado",
        });
      } else {
        setEndereco(response);
      }
    });
  }
};

onMounted(async () => {
  const enderecoAtual = await store.dispatch("pegarEnderecoUsuario");
  const cartaoAtual = await store.dispatch("pegarCartaoUsuario");

  if (enderecoAtual) {
    endereco.value = enderecoAtual[0];
  }
  if (cartaoAtual) {
    cartao.value = cartaoAtual[0];
  }
});

const onSubmitEndereco = () => {
  store
    .dispatch("atualizarEnderecoUsuario", {
      id_endereco: endereco.value.id,
      endereco: endereco.value,
    })
    .then((response) => {
      $q.notify({
        type: "positive",
        message: "Endereço atualizado com sucesso",
      });
    })
    .catch((error) => {
      $q.notify({
        type: "negative",
        message: "Por favor, preencha todos os campos de endereço",
      });
    });
};

const onSubmitCartao = () => {
  store
    .dispatch("atualizarCartaoUsuario", {
      id_cartao: cartao.value.id,
      cartao: cartao.value,
    })
    .then((response) => {
      $q.notify({
        type: "positive",
        message: "Cartão atualizado com sucesso",
      });
    })
    .catch((error) => {
      $q.notify({
        type: "negative",
        message: "Por favor, preencha todos os campos de cartão",
      });
    });
};

const onClickDesativarConta = () => {
  store
    .dispatch("desativarUsuario")
    .then((response) => {
      $q.notify({
        type: "positive",
        message: "Conta desativada com sucesso",
      });
      successDesativacao();
    })
    .catch((error) => {
      console.log(error);
      $q.notify({
        type: "negative",
        message: "Houve um erro ao desativar a conta",
      });
    });
};

const successDesativacao = () => {
  store.dispatch("logout").then(() => {
    $q.notify({
      icon: "check",
      color: "positive",
      message: "Você foi deslogado por ter desativado sua conta",
      timeout: 1000,
    });
  });
  router.push({ name: "Login" });
};
</script>
