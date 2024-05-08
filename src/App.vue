<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script setup>
// import { gql, useQuery } from "@apollo/client"
// import { GET_PRODUCTS } from "./queries/getProducts";
// import { useProductsStore } from "./stores/products";

// const products = useProductsStore();
// defineOptions({
//   name: "App",
// });
// const { result, loading, error } = useQuery(GET);

// watch(loading, (value) => {
//   if (value) return;
//   books.setBooks(result.value?.books.map);
// });

defineOptions({
  name: 'App'
});
</script>