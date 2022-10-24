<template>
  <div class="grid grid-cols-12 mx-32 my-12 gap-6">
    <q-form
      @submit="handleFilter"
      class="col-span-4 border-2 p-4 flex flex-col mb-auto rounded"
    >
      <p class="text-dark font-bold">Preço</p>
      <div class="grid grid-cols-2 gap-4 my-4">
        <q-input
          class="col-span-1"
          filled
          v-model="filtros.de"
          dense
          mask="#,##"
          fill-mask="0"
          reverse-fill-mask
        >
          <template v-slot:prepend>
            <p class="text-sm">De <span class="text-primary">R$</span></p>
          </template>
        </q-input>
        <q-input
          class="col-span-1"
          filled
          v-model="filtros.ate"
          dense
          mask="#,##"
          fill-mask="0"
          reverse-fill-mask
        >
          <template v-slot:prepend>
            <p class="text-sm">Até <span class="text-primary">R$</span></p>
          </template>
        </q-input>
      </div>
      <p class="text-dark font-bold">Categoria</p>
      <q-option-group
        name="categoria"
        v-model="filtros.categoria"
        :options="optionsCategoria"
        type="checkbox"
        color="primary"
        @change="
          () => {
            console.log(filtros.categoria);
          }
        "
        inline
      ></q-option-group>
      <div class="flex justify-end">
        <q-btn color="primary" type="submit"> Filtrar </q-btn>
      </div>
    </q-form>
    <div class="col-span-8">
      <div class="grid grid-cols-12">
        <div class="col-span-12">
          <q-input
            debounce="500"
            class="mb-4 w-full"
            placeholder="Pesquise entre mais de 200 itens variados"
            outlined
            dense
            type="email"
            v-model="searchFieldValue"
            icon="search"
            @change="handleSearch"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <div v-if="searchText" class="col-span-12 mb-4 text-dark">
          <p>Mostrando resultados da busca por: {{ searchText }}</p>
        </div>
        <div class="col-span-12 flex justify-center m-6" v-if="loading">
          <q-spinner color="primary" size="3em" :thickness="10" />
        </div>
        <div v-else class="grid grid-cols-12 gap-6 col-span-12">
          <q-card class="col-span-4 text-dark">
            <img src="https://cdn.quasar.dev/img/mountains.jpg" />
            <q-card-section class="flex flex-col">
              <h4 class="font-bold mb-1">
                SportWear <span class="font-normal">Camisa Esportiva</span>
              </h4>
              <div class="flex items-center mb-1">
                <q-icon name="star" class="mr-1" color="info" />
                <p class="text-sm">4,3 (121)</p>
              </div>
              <p class="font-extrabold text-primary mb-1">R$ 110,39</p>
              <div class="flex justify-end">
                <q-btn color="primary" class=""> DETALHES </q-btn>
              </div>
            </q-card-section>
          </q-card>
          <q-card class="col-span-4 text-dark">
            <img src="https://cdn.quasar.dev/img/mountains.jpg" />
            <q-card-section class="flex flex-col">
              <h4 class="font-bold mb-1">
                SportWear <span class="font-normal">Camisa Esportiva</span>
              </h4>
              <div class="flex items-center mb-1">
                <q-icon name="star" class="mr-1" color="info" />
                <p class="text-sm">4,3 (121)</p>
              </div>
              <p class="font-extrabold text-primary mb-1">R$ 110,39</p>
              <div class="flex justify-end">
                <q-btn color="primary" class=""> DETALHES </q-btn>
              </div>
            </q-card-section>
          </q-card>
          <q-card class="col-span-4 text-dark">
            <img src="https://cdn.quasar.dev/img/mountains.jpg" />
            <q-card-section class="flex flex-col">
              <h4 class="font-bold mb-1">
                SportWear <span class="font-normal">Camisa Esportiva</span>
              </h4>
              <div class="flex items-center mb-1">
                <q-icon name="star" class="mr-1" color="info" />
                <p class="text-sm">4,3 (121)</p>
              </div>
              <p class="font-extrabold text-primary mb-1">R$ 110,39</p>
              <div class="flex justify-end">
                <q-btn color="primary" class=""> DETALHES </q-btn>
              </div>
            </q-card-section>
          </q-card>
          <q-card class="col-span-4 text-dark">
            <img src="https://cdn.quasar.dev/img/mountains.jpg" />
            <q-card-section class="flex flex-col">
              <h4 class="font-bold mb-1">
                SportWear <span class="font-normal">Camisa Esportiva</span>
              </h4>
              <div class="flex items-center mb-1">
                <q-icon name="star" class="mr-1" color="info" />
                <p class="text-sm">4,3 (121)</p>
              </div>
              <p class="font-extrabold text-primary mb-1">R$ 110,39</p>
              <div class="flex justify-end">
                <q-btn color="primary" class=""> DETALHES </q-btn>
              </div>
            </q-card-section>
          </q-card>
          <q-card class="col-span-4 text-dark">
            <img src="https://cdn.quasar.dev/img/mountains.jpg" />
            <q-card-section class="flex flex-col">
              <h4 class="font-bold mb-1">
                SportWear <span class="font-normal">Camisa Esportiva</span>
              </h4>
              <div class="flex items-center mb-1">
                <q-icon name="star" class="mr-1" color="info" />
                <p class="text-sm">4,3 (121)</p>
              </div>
              <p class="font-extrabold text-primary mb-1">R$ 110,39</p>
              <div class="flex justify-end">
                <q-btn color="primary" class=""> DETALHES </q-btn>
              </div>
            </q-card-section>
          </q-card>
          <q-card class="col-span-4 text-dark">
            <img src="https://cdn.quasar.dev/img/mountains.jpg" />
            <q-card-section class="flex flex-col">
              <h4 class="font-bold mb-1">
                SportWear <span class="font-normal">Camisa Esportiva</span>
              </h4>
              <div class="flex items-center mb-1">
                <q-icon name="star" class="mr-1" color="info" />
                <p class="text-sm">4,3 (121)</p>
              </div>
              <p class="font-extrabold text-primary mb-1">R$ 110,39</p>
              <div class="flex justify-end">
                <q-btn color="primary" class=""> DETALHES </q-btn>
              </div>
            </q-card-section>
          </q-card>
          <q-card class="col-span-4 text-dark">
            <img src="https://cdn.quasar.dev/img/mountains.jpg" />
            <q-card-section class="flex flex-col">
              <h4 class="font-bold mb-1">
                SportWear <span class="font-normal">Camisa Esportiva</span>
              </h4>
              <div class="flex items-center mb-1">
                <q-icon name="star" class="mr-1" color="info" />
                <p class="text-sm">4,3 (121)</p>
              </div>
              <p class="font-extrabold text-primary mb-1">R$ 110,39</p>
              <div class="flex justify-end">
                <q-btn color="primary" class=""> DETALHES </q-btn>
              </div>
            </q-card-section>
          </q-card>
          <q-card class="col-span-4 text-dark">
            <img src="https://cdn.quasar.dev/img/mountains.jpg" />
            <q-card-section class="flex flex-col">
              <h4 class="font-bold mb-1">
                SportWear <span class="font-normal">Camisa Esportiva</span>
              </h4>
              <div class="flex items-center mb-1">
                <q-icon name="star" class="mr-1" color="info" />
                <p class="text-sm">4,3 (121)</p>
              </div>
              <p class="font-extrabold text-primary mb-1">R$ 110,39</p>
              <div class="flex justify-end">
                <q-btn color="primary" class=""> DETALHES </q-btn>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div v-if="!loading" class="flex flex-center col-span-12 my-4">
          <q-pagination v-model="currentPage" :max="5" direction-links />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
let searchFieldValue = ref("");
let currentPage = ref(1);
let searchText = ref("");
let loading = ref(false);

let filtros = ref({
  de: "",
  ate: "",
  categoria: [],
});
let optionsCategoria = [
  { label: "Casa", value: "casa" },
  { label: "Computadores e Imformática", value: "computadores_informativa" },
  { label: "Livros", value: "livros" },
];

const handleSearch = () => {
  loading.value = true;
  setTimeout(() => {
    searchText.value = searchFieldValue.value;
    loading.value = false;
  }, 1000);
};

const handleFilter = () => {
  loading.value = true;
  console.log(filtros.value)
  setTimeout(() => {
    loading.value = false;
  }, 1000);
};
</script>
