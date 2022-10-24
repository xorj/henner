<template>
  <main class="flex flex-col my-20 mx-48">
    <h2 class="font-bold text-3xl text-dark mb-4">CRIE SUA CONTA</h2>
    <Form
      :validation-schema="dataSchemaCadastro"
      @submit="onSubmit"
      :initial-values="{ agreeWithTerms: false }"
    >
      <div class="grid grid-cols-12 gap-4 w-full">
        <div class="col-span-6">
          <Field name="nome" v-slot="{ errorMessage, value, field }">
            <q-input
              type="text"
              placeholder="Nome Completo"
              outlined
              v-bind="field"
              :model-value="value"
              :error="!!errorMessage"
              :error-message="errorMessage"
            >
            </q-input>
          </Field>
        </div>
        <div class="col-span-6">
          <Field name="cpf" v-slot="{ errorMessage, value, field }">
            <q-input
              type="text"
              placeholder="CPF"
              outlined
              unmasked-value
              mask="###.###.###-##"
              v-bind="field"
              :model-value="value"
              :error="!!errorMessage"
              :error-message="errorMessage"
            >
            </q-input>
          </Field>
        </div>
        <div class="col-span-6">
          <Field name="data_nascimento" v-slot="{ errorMessage, value, field }">
            <q-input
              type="date"
              outlined
              hint="Data de Nascimento"
              v-bind="field"
              :model-value="value"
              :error="!!errorMessage"
              :error-message="errorMessage"
            >
            </q-input>
          </Field>
        </div>
        <div class="col-span-6">
          <Field name="telefone" v-slot="{ errorMessage, value, field }">
            <q-input
              type="text"
              outlined
              placeholder="Telefone celular"
              v-bind="field"
              mask="(##) #####-####"
              :model-value="value"
              :error="!!errorMessage"
              :error-message="errorMessage"
            >
            </q-input>
          </Field>
        </div>
        <div class="col-span-12">
          <Field name="email" v-slot="{ errorMessage, value, field }">
            <q-input
              outlined
              label="E-mail"
              v-bind="field"
              :model-value="value"
              :error="!!errorMessage"
              :error-message="errorMessage"
            >
            </q-input>
          </Field>
        </div>
        <div class="col-span-6">
          <Field name="password" v-slot="{ errorMessage, value, field }">
            <q-input
              outlined
              label="Defina sua senha"
              v-bind="field"
              :model-value="value"
              :error="!!errorMessage"
              :error-message="errorMessage"
              :type="hidePassword ? 'password' : 'text'"
            >
              <template v-if="!errorMessage" v-slot:append>
                <q-icon
                  :name="hidePassword ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="hidePassword = !hidePassword"
                />
              </template>
            </q-input>
          </Field>
        </div>
        <div class="col-span-6">
          <Field
            class="col-span-6"
            name="confirmPassword"
            v-slot="{ errorMessage, value, field }"
          >
            <q-input
              outlined
              v-bind="field"
              label="Confirme sua senha"
              :model-value="value"
              :type="hidePassword ? 'password' : 'text'"
              :error="!!errorMessage"
              :error-message="errorMessage"
            >
              <template v-if="!errorMessage" v-slot:append>
                <q-icon
                  :name="hidePassword ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="hidePassword = !hidePassword"
                />
              </template>
            </q-input>
          </Field>
        </div>
        <div class="col-span-12">
          <Field
            name="agreeWithTerms"
            v-slot="{ errorMessage, value, field }"
            class="flex"
          >
            <q-checkbox
              outlined
              label="Li e estou de acordo com as políticas da empresa e políticas de privacidade.*"
              v-bind="field"
              :model-value="value"
              :error="!!errorMessage"
            />
            <p class="ml-3 text-xs text-negative">
              {{ errorMessage }}
            </p>
          </Field>
        </div>
        <div class="col-span-12 flex items-center flex-col">
          <q-btn
            type="submit"
            color="primary"
            label="Cadastrar"
            class="py-2 px-24 w-64"
          />
          <p class="mt-2">
            Já possui cadastro? Faça o
            <router-link
              to="/login"
              class="underline underline-offset-4 text-primary"
              >Login </router-link
            >.
          </p>
        </div>
      </div>
    </Form>
  </main>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { Field, Form } from "vee-validate";
import * as yup from "yup";

const hidePassword = ref(true);

const dataSchemaCadastro = yup.object({
  nome: yup
    .string()
    .required("Nome é obrigatório")
    .min(10, "Nome tem que ter no mínimo 10 caracteres")
    .max(25, "Nome tem que ter no mínimo 25 caracteres"),
  cpf: yup.string().length(11, "CPF incompleto").required("Campo obrigatório"),
  data_nascimento: yup.string().required("Data de nascimento é obrigatório"),
  telefone: yup
    .string()
    .length(15, "Telefone inválido")
    .required("Campo obrigatório"),
  email: yup
    .string()
    .email("Formato de e-mail inválido")
    .required("Por favor, insira seu e-mail"),
  password: yup
    .string()
    .min(8, "Senha deve conter pelo menos 8 caracteres")
    .matches(/[0-9]/, "Senha deve conter pelo menos 1 número")
    .matches(/[A-Z]/, "Senha deve conter pelo menos 1 letra maiúscula")
    .matches(
      /[\-\+\'\`\~\^\!\@\#\$\%\¨\&\*\(\)\[\]\{\}\?\/\;\:\.\,\<\>\\\|\'\"]/,
      "Senha deve conter pelo menos 1 símbolo"
    )
    .required("Campo obrigatório"),
  confirmPassword: yup
    .string()
    .required("Campo obrigatório")
    .oneOf([yup.ref("password")], "Senhas devem ser iguais"),
  agreeWithTerms: yup
    .boolean()
    .oneOf([true], "Você deve concordar com os termos e condições")
    .default(false),
});

const onSubmit = (values) => {
  console.log(values);
};
</script>
