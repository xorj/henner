<template>
  <main class="flex flex-col my-20 mx-10 md:mx-48">
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
              autofocus
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
              autocomplete="new-password"
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
              autocomplete="new-password"
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
              label="Li e estou de acordo com as pol??ticas da empresa e pol??ticas de privacidade.*"
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
            J?? possui cadastro? Fa??a o
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
import { ref } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { Field, Form } from "vee-validate";
import * as yup from "yup";
import { useRouter } from "vue-router";

const router = useRouter();
const $q = useQuasar();
const store = useStore();
const hidePassword = ref(true);

const dataSchemaCadastro = yup.object({
  nome: yup
    .string()
    .required("Nome ?? obrigat??rio")
    .min(10, "Nome tem que ter no m??nimo 10 caracteres")
    .max(50, "Nome tem que ter no m??ximo 50 caracteres"),
  cpf: yup.string().length(11, "CPF incompleto").required("Campo obrigat??rio"),
  data_nascimento: yup.string().required("Data de nascimento ?? obrigat??rio"),
  telefone: yup
    .string()
    .length(15, "Telefone inv??lido")
    .required("Campo obrigat??rio"),
  email: yup
    .string()
    .email("Formato de e-mail inv??lido")
    .required("Por favor, insira seu e-mail"),
  password: yup
    .string()
    .min(8, "Senha deve conter pelo menos 8 caracteres")
    .matches(/[0-9]/, "Senha deve conter pelo menos 1 n??mero")
    .matches(/[A-Z]/, "Senha deve conter pelo menos 1 letra mai??scula")
    .matches(
      /[\-\+\'\`\~\^\!\@\#\$\%\??\&\*\(\)\[\]\{\}\?\/\;\:\.\,\<\>\\\|\'\"]/,
      "Senha deve conter pelo menos 1 s??mbolo"
    )
    .required("Campo obrigat??rio"),
  confirmPassword: yup
    .string()
    .required("Campo obrigat??rio")
    .oneOf([yup.ref("password")], "Senhas devem ser iguais"),
  agreeWithTerms: yup
    .boolean()
    .oneOf([true], "Voc?? deve concordar com os termos e condi????es")
    .default(false),
});

const onSubmit = (values) => {
  store
    .dispatch("cadastro", values)
    .then(() => {
      $q.notify({
        icon: "check",
        color: "positive",
        message: "Voc?? se cadastrou com sucesso!",
        timeout: 1000,
      });
      router.push({ name: "Login" });
    })
    .catch((error) => {
      let errorData = error.response?.data;
      if (errorData) {
        let errors = Object.entries(errorData).map(([key, value]) => {
          return value;
        });
        errors.forEach((error) => {
          $q.notify({
            icon: "error",
            color: "negative",
            message: error,
            timeout: 1000,
          });
        });
      }
    });
};
</script>
