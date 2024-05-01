<template>
  <div class="index-page">
    <h1>Welcome to the Product Catalog</h1>
    <ProductCatalog />
  </div>
</template>



<script setup>
import ProductCatalog from '../components/ProductCatalog.vue';


defineOptions({
  name: 'MainPage',
  components: {
    ProductCatalog
  }
});
</script>
