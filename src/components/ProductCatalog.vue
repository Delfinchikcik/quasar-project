<template>
  <div>
    <q-card class="product-card" v-for="product in productsList" :key="product.id">
      <img src="">
      <q-card-section>
        <div class="text-h6">{{ product.name }}</div>
        <div class="text-subtitle2">{{ product.price }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ product.description }}
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { watch } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { useProductsStore } from 'src/stores/products';
import { GET_PRODUCTS } from 'src/queries/getProducts'


const products = useProductsStore();
const { result, loading, error } = useQuery(GET_PRODUCTS);

watch(loading, (value) => {
  if (!value) {
    products.setProducts(result.value?.products);
    console.log(result.value)
  }
})
const productsList = products.products;
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