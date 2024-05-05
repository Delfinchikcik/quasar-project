<template>

    <div>
        <!-- <ProductCard v-for="product in products" :key="product.id" :product="product" /> -->
    </div>

</template>

<script setup>
// import ProductCard from './ProductCard.vue'
defineProps({
    products: {
        type: Array,
        required: true
    }
})

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
