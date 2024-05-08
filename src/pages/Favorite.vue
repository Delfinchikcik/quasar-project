<template>
  <ProductCard :productsList="favoriteList" @favoriteFunction="favoritTogle" />
</template>

<script setup>
import { watch, defineComponent } from "vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { useFavoriteStore } from "src/stores/favorite";
import { GET_FAVORITE, REMOVE_FAVORITE } from "src/queries/getProducts";
import ProductCard from "components/ProductCard.vue";

defineComponent({
  name: "FavoritePage",
  components: {
    ProductCard,
  },
});
const favoriteStore = useFavoriteStore(); // Переименовываем переменную, чтобы избежать конфликта с ключевым словом favorite
const { result, loading } = useQuery(GET_FAVORITE);
const favoriteList = favoriteStore.favorite;
// Получаем избранные товары из хранилища

watch(loading, (value) => {
  if (!value) {
    console.log(result.value);
    const favorites = result.value?.favorite;
    favoriteStore.setFavorite(favorites);
    console.log(favorites);
  }
});

const { mutate: removeFavorite } = useMutation(REMOVE_FAVORITE);

const favoritTogle = async (uuid, product) => {
  console.log(`Сработал эмит ${uuid, product.name}`);
  try {
    const variables = {
      User_id: uuid,
      name: product.name,
    };
    const { data } = await removeFavorite(variables);
    console.log("Removed from favorites:", data);
    favoriteStore.removeFavorite(product.name);
  } catch (error) {
    console.error("Error removing from favorites:", error);
  }
};

</script>
