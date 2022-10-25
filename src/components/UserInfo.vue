<template>
  <q-btn-dropdown
    v-if="userLogged"
    no-caps
    flat
    :ripple="false"
    content-class="menu-top-margin"
    color="primary"
    dropdown-icon="expand_more"
    class="h-full"
  >
    <template v-slot:label>
      <div class="mr-2 flex">
        <q-icon
          class="p-1.5 flex items-center"
          size="xs"
          name="person"
          color="primary"
        />
      </div>
      <div class="flex items-center">
        <p class="text-primary mb-0 text-base">Nome do Usuário</p>
      </div>
    </template>
    <q-list>
      <q-item clickable v-close-popup>
        <router-link
          to="/"
          class="text-dark flex items-center justify-center px-4 h-full w-full"
        >
          <q-item-label>
            <q-btn
              flat
              no-caps
              color="primary"
              class="text-capitalize w-full text-right"
              label="Editar Informações"
            />
          </q-item-label>
        </router-link>
      </q-item>
      <q-item clickable v-close-popup>
        <q-btn
          flat
          no-caps
          color="primary"
          class="text-capitalize w-full text-right"
          label="Sair"
          @click="logout"
        />
      </q-item>
    </q-list>
  </q-btn-dropdown>
  <div v-else class="flex items-center h-full">
    <router-link to="/login" class="text-dark flex items-center px-4 h-full">
      <q-icon name="login" color="primary" size="1.5rem" class="mr-1" />
      Login
    </router-link>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const $q = useQuasar();
const router = useRouter();
const store = useStore();
const userLogged = computed(() => !!store.state.user.token);

const logout = () => {
  store.dispatch("logout").then(() => {
    $q.notify({
      icon: "check",
      color: "positive",
      message: "Você saiu do sistema",
      timeout: 1000,
    });
  });

  router.push("Login");
};
</script>
<style>
.menu-top-margin {
  top: 65px !important;
}
</style>
