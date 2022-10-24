<template>
  <q-btn-dropdown
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
          to="/produtos"
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
    </q-list>
  </q-btn-dropdown>
</template>
<style>
.menu-top-margin {
  top: 65px !important;
}
</style>
