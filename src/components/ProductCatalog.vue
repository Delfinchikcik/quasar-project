<template>
  <div class="product-catalog">
    <q-card class="filter-card">
      <q-form @submit.prevent>
        <q-select v-model="selectedDestination" :options="destinations" label="Destination" />
        <q-select v-model="selectedType" :options="types" label="Type" />
        <q-input v-model="minPrice" type="number" label="Min price" />
        <q-input v-model="maxPrice" type="number" label="Max price" />
        <q-btn @click="applyFilters">apply filters</q-btn>
      </q-form>
    </q-card>
    <q-card class="product-list relative q-my-md"
      v-for="(product, index) in (selectedDestination || selectedType || minPrice || maxPrice ? filteredProducts : products)"
      :key="product.id">
      <q-btn class="favoritIcon" @click="() => favoritTogle(product)" round color="deep-orange" icon="local_activity" />
      <div class="q-pa-md row items-start q-gutter-md">
        <q-card class="my-card" flat bordered>

          <div class="q-pa-md">
            <q-carousel animated v-model="slide" arrows navigation infinite>
              <q-carousel-slide v-for="(image, index) in product.image" :key="index" :name="index + 1"
                :img-src="image" />
            </q-carousel>
          </div>

          <!-- <q-img src="" /> -->
          <q-card-section>
            <div class="text-h5 q-mt-sm q-mb-xs">{{ product.name }}</div>
            <div class="text-h5 q-mt-sm q-mb-xs">{{ product.price }}</div>
            <div class="text-caption text-grey">
              {{ product.description }}
            </div>
          </q-card-section>
          <q-card-actions>
            <q-btn flat color="secondary" label="Забронировать" />
            <q-space />
            <q-btn label="Подробнее" color="grey" round flat dense :icon="expanded[index] ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
              " @click="expanded[index] = !expanded[index]" />
          </q-card-actions>
          <transition-group>
            <div key="more-info" v-show="expanded[index]">
              <q-separator />
              <q-card-section key="more-info-sections" class="text-subtitle2">
                <p key="group">{{ product.group }}</p>
                <p key="duration">{{ product.duration }}</p>
              </q-card-section>
            </div>
          </transition-group>
        </q-card>
      </div>
    </q-card>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "src/firebase";


const products = ref([]);
const expanded = ref([]);
const slide = ref(1);
const search = ref('');
const minPrice = ref("");
const maxPrice = ref("");
const selectedDestination = ref("");
const selectedType = ref("");
const destinations = ref([]);
const types = ref([]);
const filteredProducts = ref([]);

console.log("Товары изначально:", products.value);
//Получение данных
onMounted(async function () {
  try {
    console.log("Получение данных из БД...");
    const querySnapshot = await getDocs(
      collection(db, "testProductsGroupProject")
    );
    console.log("Query snapshot:", querySnapshot);
    products.value = [];
    destinations.value = [];
    types.value = [];

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      const data = doc.data() || {};
      const product = {
        id: doc.id,
        available: data.available,
        type: data.type,
        description: data.description,
        image: data.images,
        name: data.name,
        price: data.price,
        destination: data.destination,
        duration: data.duration,
        group: data.group,
        favorit: data.favorit,
      };
      products.value.push(product);
      console.log("Product images:", product.value);
      if (!destinations.value.includes(product.destination)) {
        destinations.value.push(product.destination);
      }
      if (!types.value.includes(product.type)) {
        types.value.push(product.type);
      }
    });
    console.log("Маршруты", destinations.value)
  } catch (error) {
    console.error("Ошибка получения данных:", error);
  }
});
function applyFilters() {
  filteredProducts.value = products.value.filter((product) => {
    return (selectedDestination.value === "" || product.destination === selectedDestination.value) &&
      (selectedType.value === "" || product.type === selectedType.value) &&
      (product.price >= minPrice.value) &&
      (product.price <= maxPrice.value);
  });
}

//Реализация Избранного
const favoritTogle = async (productId) => {
  const productRef = doc(db, "testProductsGroupProject", productId.id);
  const newFavoritValue = !productId.favorit;
  try {
    // Обновляем значение favorit в документе Firestore
    await updateDoc(productRef, { favorit: newFavoritValue });
    console.log("Favorit status updated successfully");
    const index = products.value.findIndex((p) => p.id === productId.id);
    products.value[index].favorit = newFavoritValue;
  } catch (error) {
    console.error("Error updating favorit status:", error);
  }
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