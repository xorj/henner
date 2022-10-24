<template>
  <div class="hidden items-center md:flex h-full">
    <router-link to="/produtos" class="text-dark flex items-center px-4 h-full">
      <q-icon name="trending_up" color="primary" size="1.5rem" class="mr-1" />
      <p>Mais Vendidos</p>
    </router-link>
    <router-link to="/produtos" class="text-dark flex items-center px-4  h-full">
      <q-icon name="interests" color="dark" size="1.5rem" class="mr-1" />
      <p>Categorias</p>
    </router-link>
    <router-link to="/produtos" class="text-dark flex items-center px-4  h-full">
      <p>Promoções</p>
    </router-link>
  </div>
  <div class="flex md:hidden items-center h-full">
    <router-link to="/produtos" class="text-dark flex items-center px-4 h-full">
      <q-icon name="sell" color="primary" size="1.5rem" class="mr-1" />
      <p>Ver produtos</p>
    </router-link>
  </div>
</template>
