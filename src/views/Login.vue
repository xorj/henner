<template>
  <main class="w-full h-full flex">
    <img src="@/assets/login-background.jpg" class="w-1/2 h-full drop-shadow" />
    <div class="w-1/2 p-4 flex justify-center items-center">
      <div class="md:mr-36">
        <h2 class="font-bold text-3xl text-dark mb-4">FAÇA O SEU LOGIN</h2>
        <Form
          class="flex items-center flex-col max-w-md"
          :validation-schema="dataSchemaLogin"
          @submit="onSubmitLogin"
        >
          <Field name="email" v-slot="{ errorMessage, value, field }">
            <q-input
              class="mb-4 w-full"
              label="E-mail"
              outlined
              type="email"
              :model-value="value"
              v-bind="field"
              :error-message="errorMessage"
              :error="!!errorMessage"
            />
          </Field>
          <Field name="password" v-slot="{ errorMessage, value, field }">
            <q-input
              class="w-full"
              label="Senha"
              outlined
              :type="togglePasswordVisible ? 'password' : 'text'"
              :model-value="value"
              v-bind="field"
              :error-message="errorMessage"
              :error="!!errorMessage"
              autocomplete="off"
            >
              <template v-slot:append>
                <q-icon
                  :name="
                    togglePasswordVisible ? 'visibility_off' : 'visibility'
                  "
                  class="cursor-pointer"
                  @click="togglePasswordVisible = !togglePasswordVisible"
                />
              </template>
            </q-input>
          </Field>
          <q-btn
            class="w-full mt-4 p-2"
            type="submit"
            color="primary"
            label="Entrar"
          />
        </Form>
        <div class="flex items-center flex-col mt-3">
          <p class="text-terceary text-">
            Novo por aqui?
            <router-link
              to="/cadastro"
              class="underline underline-offset-4 text-primary"
              >Cadastre-se</router-link
            >
            e desfrute do nosso site
          </p>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { useStore } from "vuex";
import { useQuasar } from "quasar";

import { ref } from "vue";
import * as yup from "yup";
import { Form, Field } from "vee-validate";
import { useRouter } from "vue-router";


const router = useRouter();

const $q = useQuasar();
const store = useStore();

let togglePasswordVisible = ref(true);

const dataSchemaLogin = yup.object({
  email: yup
    .string()
    .email("Formato do e-mail inválido.")
    .required("Por favor, insira seu e-mail"),
  password: yup.string().required("Por favor, digite a senha"),
});

function onSubmitLogin(values) {
  store
    .dispatch("login", values)
    .then(() => {
      $q.notify({
        icon: "check",
        color: "positive",
        message: "Login realizado com sucesso!",
        timeout: 1000,
      });
      router.push("Produtos");
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
}
</script>
