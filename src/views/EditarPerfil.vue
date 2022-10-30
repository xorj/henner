<template>
  <main class="my-20 mx-10 md:mx-48">
    <h2 class="font-bold text-3xl mb-4">EDITAR PERFIL</h2>
    <div class="py-4 px-5 rounded border">
      <h3 class="font-bold uppercase">Editar Endereço</h3>
      <Form
        :validation-schema="dataSchemaCadastro"
        @submit="onSubmit"
        :initial-values="{ enderecoInicial }"
      >
        <div class="grid grid-cols-12 gap-4 w-full">
          <div class="col-span-6">
            <Field name="cep" v-slot="{ errorMessage, value, field }">
              <q-input
                autofocus
                type="text"
                label="CEP"
                outlined
                mask="#####-###"
                unmasked-value
                v-bind="field"
                :model-value="value"
                :error="!!errorMessage"
                :error-message="errorMessage"
                @change="onCepChange(value)"
              >
              </q-input>
            </Field>
          </div>
          <div class="col-span-6">
            <Field name="estado" v-slot="{ errorMessage, value, field }">
              <q-input
                autofocus
                type="text"
                label="UF"
                outlined
                mask="AA"
                unmasked-value
                v-bind="field"
                :model-value="value"
                :error="!!errorMessage"
                :error-message="errorMessage"
              >
              </q-input>
            </Field>
          </div>
          <div class="col-span-6">
            <Field name="cidade" v-slot="{ errorMessage, value, field }">
              <q-input
                autofocus
                type="text"
                label="Cidade"
                outlined
                unmasked-value
                v-bind="field"
                :model-value="value"
                :error="!!errorMessage"
                :error-message="errorMessage"
              >
              </q-input>
            </Field>
          </div>
          <div class="col-span-6">
            <Field name="bairro" v-slot="{ errorMessage, value, field }">
              <q-input
                autofocus
                type="text"
                label="Bairro"
                outlined
                unmasked-value
                v-bind="field"
                :model-value="value"
                :error="!!errorMessage"
                :error-message="errorMessage"
              >
              </q-input>
            </Field>
          </div>
          <div class="col-span-6">
            <Field name="rua" v-slot="{ errorMessage, value, field }">
              <q-input
                autofocus
                type="text"
                label="Rua"
                outlined
                unmasked-value
                v-bind="field"
                :model-value="value"
                :error="!!errorMessage"
                :error-message="errorMessage"
              >
              </q-input>
            </Field>
          </div>
          <div class="col-span-6">
            <Field name="numero" v-slot="{ errorMessage, value, field }">
              <q-input
                autofocus
                type="text"
                label="Número"
                outlined
                unmasked-value
                v-bind="field"
                :model-value="value"
                :error="!!errorMessage"
                :error-message="errorMessage"
              >
              </q-input>
            </Field>
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
  </main>
</template>

<script setup>
import { ref } from "vue";
import { Field, Form } from "vee-validate";
import * as yup from "yup";
import ibgeServices from "@/services/ibgeServices";

const dataSchemaEndereco = yup.object({
  rua: yup
    .string()
    .required("Rua é um campo obrigatório")
    .min(5, "Mínimo de 5 caracteres")
    .max(50, "Máximo de 50 caracteres"),
  numero: yup
    .string()
    .required("Número é um campo obrigatório")
    .min(1, "Mínimo de 1 caracter")
    .max(10, "Máximo de 10 caracteres"),
  bairro: yup
    .string()
    .required("Bairro é um campo obrigatório")
    .min(3, "Mínimo de 5 caracteres")
    .max(50, "Máximo de 50 caracteres"),
  cidade: yup
    .string()
    .required("Cidade é um campo obrigatório")
    .min(3, "Mínimo de 3 caracteres")
    .max(50, "Máximo de 50 caracteres"),
  uf: yup
    .string()
    .required("UF é um campo obrigatório")
    .min(2, "Mínimo de 2 caracteres")
    .max(2, "Máximo de 2 caracteres"),
  cep: yup
    .string()
    .required("CEP é um campo obrigatório")
    .matches("/^[0-9]{5}-[0-9]{3}$/", "CEP inválido"),
});

const dataSchemaCartao = yup.object({
  numero: yup
    .string()
    .required("Número do cartão é um campo obrigatório")
    .min(16, "Mínimo de 16 caracteres")
    .max(16, "Máximo de 16 caracteres"),
  nome: yup
    .string()
    .required("Escolha um nome para o cartão")
    .min(3, "Mínimo de 3 caracteres")
    .max(50, "Máximo de 50 caracteres"),
  validade: yup
    .string()
    .required("Validade é um campo obrigatório")
    .min(5, "Mínimo de 5 caracteres")
    .max(5, "Máximo de 5 caracteres"),
  codigo: yup
    .string()
    .required("Código de Verificação (CCV) é um campo obrigatório")
    .min(3, "Mínimo de 3 caracteres")
    .max(3, "Máximo de 3 caracteres"),
});

let enderecoInicial = ref({
  rua: "",
  numero: "",
  bairro: "",
  cidade: "",
  uf: "",
  cep: "",
});

const setEndereco = (endereco) => {
  console.log(endereco);
  enderecoInicial = {
    rua: endereco.logradouro,
    numero: "",
    bairro: endereco.bairro,
    cidade: endereco.localidade,
    uf: endereco.uf,
    cep: endereco.cep,
  };
  console.log(enderecoInicial);
  console.log(dataSchemaEndereco);
};

const onCepChange = async (cep) => {
  if (cep.length === 8) {
    ibgeServices.getEnderecoByCEP({ cep }).then((response) => {
      setEndereco(response);
    });
  }
};
</script>
