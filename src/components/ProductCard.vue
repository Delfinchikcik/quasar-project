<template>
  <div class="product-catalog">
    <q-card class="product-list relative q-my-md" v-for="(product, index) in props.productsList" :key="product.id">
      <q-btn class="favoritIcon" @click="favoriteFunction(product, uuid)" round color="deep-orange"
        icon="local_activity" />
      <div class="product-catalog">
        <q-card class="product-list relative q-my-md" v-for="product in props.productsList" :key="product.id">
          <q-btn class="favoritIcon" @click="() => favoritTogle(product)" round color="deep-orange"
            icon="local_activity" />
          <div class="q-pa-md row items-start q-gutter-md">
            <q-card class="my-card" flat bordered>
              <q-img class="cart_photo" :src="product.img_2" />
              <div class="q-pa-md">
                <q-carousel animated v-model="slide[product.id]" arrows navigation infinite>
                  <q-carousel-slide :name="1" :img-src="product.img_1" :product="product" />
                  <q-carousel-slide :name="2" :img-src="product.img_2" :product="product" />
                  <q-carousel-slide :name="3" :img-src="product.img_3" :product="product" />
                  <q-carousel-slide :name="4" :img-src="product.img_4" :product="product" />
                  <q-carousel-slide :name="5" :img-src="product.img_5" :product="product" />
                </q-carousel>
              </div>
              <q-card-section>
                <div class="text-h5 q-mt-sm q-mb-xs">{{ product.name }}</div>
                <div class="text-h5 q-mt-sm q-mb-xs">{{ product.price }}</div>
                <div class="text-caption text-grey">
                  {{ product.description }}
                </div>
              </q-card-section>
              <q-card-actions>
                <slot :uuid="uuid" :product="product">
                  <q-btn @click="addToShop(product)" flat color="secondary" label="Забронировать" />
                </slot>
                <q-space />
                <q-btn label="Подробнее" color="grey" round flat dense :icon="expanded[index] ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
                  " @click="expanded[index] = !expanded[index]" />
                <q-btn label="Подробнее" color="grey" round flat dense :icon="expanded[product.id] ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
                  " @click="toggleExpanded(product.id)" />
              </q-card-actions>
              <transition-group>
                <div key="more-info" v-show="expanded[product.id]">
                  <q-separator />
                  <q-card-section key="more-info-sections" class="text-subtitle2">
                    <p key="group icon-people">Размер группы: {{ product.group }} </p>
                    <p key="duration">Продолжительность экскурсии (в часах): {{ product.duration }}</p>
                  </q-card-section>
                </div>
              </transition-group>
            </q-card>
          </div>
        </q-card>
      </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import { defineProps, ref, defineEmits } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { useFavoriteStore } from "src/stores/favorite";
import { SET_FAVORITE, SET_SHOP } from "src/queries/getProducts";
import { useShopStore } from "src/stores/shop";

const uuid = "1ef4a1d2-1bf2-4c81-b279-a7ca641175ac";

const expanded = ref([]);
const slide = ref({});

const props = defineProps({
  productsList: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits(["favoriteFunction", "removeShop"]);
const favoriteStore = useFavoriteStore();
const shopStore = useShopStore();
const { mutate: addFavorite } = useMutation(SET_FAVORITE);
const { mutate: addShop } = useMutation(SET_SHOP);

async function addItem(product) {
  console.log(product);
  try {
    const variables = {
      User_id: uuid,
      description: product.description,
      destination: product.destination,
      duration: product.duration,
      group: product.group,
      img_1: product.img_1,
      img_2: product.img_2,
      img_3: product.img_3,
      img_4: product.img_4,
      img_5: product.img_5,
      name: product.name,
      price: product.price,
      type: product.type,
    };
    const { data } = await addFavorite(variables);
    console.log("Добавил в избранное", data);
    favoriteStore.addFavorite(product);
  } catch (error) {
    console.error("Ошибка добавления", error);
  }
}

const favoriteFunction = (product) => {
  if (favoriteStore.isFavorite(product.name)) {
    console.log(favoriteStore.isFavorite(product.name));
    emit("favoriteFunction", uuid, product);
    console.log(uuid, product.name);
  } else addItem(product);
};

const addToShop = async (product) => {
  try {
    const variables = {
      User_id: uuid,
      description: product.description,
      destination: product.destination,
      duration: product.duration,
      group: product.group,
      img_1: product.img_1,
      img_2: product.img_2,
      img_3: product.img_3,
      img_4: product.img_4,
      img_5: product.img_5,
      name: product.name,
      price: product.price,
      type: product.type,
    };
    const { data } = await addShop(variables);
    console.log("Добавил в корзину", data);
    shopStore.addShop(product);
  } catch (error) {
    console.error("Ошибка добавления", error);
  }
}
</script>

<style>
.product-catalog__searchbar__input {
  outline: none;
  outline: none;
}

.product-catalog {
  width: 100%;
  padding: 16px;
  width: 100%;
  padding: 16px;
}

.catalog-title {
  font-size: 32px;
  margin-bottom: 16px;
  font-size: 32px;
  margin-bottom: 16px;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 900px;
  margin: 0 auto;
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

.cart_photo {
  max-height: 400px;
}
</style>
