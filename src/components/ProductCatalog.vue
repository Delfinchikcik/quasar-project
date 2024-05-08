<template>
  <div>
    <!-- фильтрация -->
    <q-select v-model="selectedDestination" :options="destinations" label="Место вашего приключения" />
    <q-select v-model="selectedType" :options="types" label="Тип путешествия" />
    <q-select v-model="selectedSort" :options="sortOrderOptions" emit-value map-options label="Сортировка по цене" />
    <!-- <q-input v-model="minPrice" type="number" label="Минимальная цена" />
    <q-input v-model="maxPrice" type="number" label="Максимальная цена" /> -->
    <!-- сортировка -->
    <!-- <button @click="getLazyProducts({ variables: filter })">
      Apply Filters
    </button> -->
    <q-btn @click="getSortedProducts">Применить</q-btn>
    <!-- карточки -->
    <ProductCard :productsList="productsList" />
  </div>
</template>

<script setup>

import { reactive, computed, ref, watch, defineComponent } from 'vue'
import { useQuery, provideApolloClient } from '@vue/apollo-composable'
import { GET_PRODUCTS, GET_SORTED_PRODUCTS } from '../queries/getProducts'
import { useProductsStore } from 'src/stores/products';
import ProductCard from './ProductCard.vue';
import apolloClient from 'src/apollo/client';

provideApolloClient(apolloClient);

defineComponent({
  name: "ProductCatalog",
  components: {
    ProductCard,
  },
});
// Запускаем процесс при инициализации, подтягиваем карточки

const products = useProductsStore();

const { result, loading, error } = useQuery(GET_PRODUCTS);

watch(loading, (value) => {
  if (value) return;
  products.fetchProducts(result.value?.products);
});
const productsList = ref([])

productsList.value = computed(() => products.products).value

const selectedType = ref("")
const selectedDestination = ref("")
const selectedSort = ref("")
const destinations = ref(["Ялта", "Санкт-Петербург"])
const types = ref(["Групповая", "Индивидуальная"])
const sortOrderOptions = [
  { value: 'asc', label: 'От дешевых к дорогим' },
  { value: 'desc', label: 'От дорогих к дешевым' },
];

const getSortedProducts = async () => {


  const { result: sortedProductsResult, loading: sortedProductsLoading, error } = useQuery(GET_SORTED_PRODUCTS(selectedDestination.value, selectedType.value, selectedSort.value));
  watch(sortedProductsResult, (value) => {
    if (value) {
      // console.log(sortedProductsResult)
      // products.fetchProducts(sortedProductsResult.value?.products);
      productsList.value = computed(() => sortedProductsResult.value?.products).value
    }
  });

};
</script>
<style>
.product-catalog__searchbar__input {
  outline: none;
}

.product-catalog {
  width: 100%;
  padding: 16px;
}

.catalog-title {
  font-size: 32px;
  margin-bottom: 16px;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 900px;
  margin: 0 auto;
}

.product-item {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
  background-color: #fff;
}

.favoritIcon {
  position: absolute;
  right: 2.4%;
  top: 2.8%;
  z-index: 2;
  opacity: 0.9;
}
</style>
