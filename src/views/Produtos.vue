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
          unmasked-value
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
          unmasked-value
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
        color="primary"
        inline
      >
      </q-option-group>
      <div class="flex justify-end mt-3">
        <q-btn
          icon="delete"
          flat
          round
          color="primary"
          class="mr-2"
          @click="resetFilters"
        />
        <q-btn color="primary" type="submit">Filtrar</q-btn>
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
          <q-card v-for="produto in produtos" class="col-span-4 text-dark">
            <img :src="produto.thumbnail" class="h-48" />
            <q-card-section class="flex flex-col">
              <h4 class="font-bold mb-1">
                {{ produto.nome }}
              </h4>
              <span class="font-normal mb-1">{{ produto.marca }}</span>
              <p class="font-extrabold text-primary mb-1">
                R$ {{ produto.preco }}
              </p>
              <div class="flex justify-end">
                <q-btn color="primary" class=""> DETALHES </q-btn>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <!-- <div v-if="!loading" class="flex flex-center col-span-12 my-4">
          <q-pagination v-model="currentPage" :max="5" direction-links />
        </div> -->
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
let searchFieldValue = ref("");
let currentPage = ref(1);
let searchText = ref("");
let loading = ref(false);

const store = useStore();

let filtros = ref({
  de: "",
  ate: "",
  categoria: "",
});

let optionsCategoria = [
  { value: 1, label: "Smartphones" },
  { value: 2, label: "Beleza" },
  { value: 3, label: "Computadores e Informática" },
  { value: 4, label: "Alimentos e Bebidas" },
  { value: 5, label: "Decoração para Casa" },
];

let produtos = ref([]);

onMounted(async () => {
  loading.value = true;
  listProducts();
  loading.value = false;
});

const getProducts = (search, categoria) => {
  let produtos = store.dispatch("listarProdutos", { search, categoria });
  return produtos;
};

const listProducts = () => {
  loading.value = true;
  getProducts(searchText.value, filtros.value.categoria).then((response) => {
    let filteredProducts = response.filter((produto) => {
      if (filtros.value.de && filtros.value.ate) {
        return (
          produto.preco >= filtros.value.de/100 &&
          produto.preco <= filtros.value.ate/100
        );
      } else if (filtros.value.de) {
        return produto.preco >= filtros.value.de/100;
      } else if (filtros.value.ate) {
        return produto.preco <= filtros.value.ate/100;
      } else {
        return true;
      }
    });
    produtos.value = filteredProducts;
    loading.value = false;
  });
};

const resetFilters = () => {
  filtros.value = {
    de: "",
    ate: "",
    categoria: "",
  };
  listProducts();
};

const handleSearch = () => {
  searchText.value = searchFieldValue.value;
  listProducts();
};

const handleFilter = () => {
  listProducts();
};
</script>
