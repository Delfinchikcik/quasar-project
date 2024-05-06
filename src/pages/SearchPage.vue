<template>
  <div>
    <!-- Поле ввода для поискового запроса -->
    <q-input
      v-model="searchQuery"
      @keyup.enter="performSearch"
      placeholder="Введите ваш запрос"
    />

    <!-- Компонент для отображения результатов поиска -->
    <div
      class="q-pa-md q-gutter-md row items-start q-col-gutter no-wrap justify-center items-center"
    >
        <div
          class="q-col-gutter row items-start q-gutter-md"
        >
          <div
            class="q-col-xs-12 q-col-sm-6 q-col-md-4 q-col-lg-3"
            v-for="(event, index) in results"
            :key="index"
          >
            <q-card class="my-card" flat bordered>
              <!-- Отображение изображения события -->
              <q-img :src="`/${event.image}`" />

              <q-card-section>
                <!-- Кнопка для добавления события в корзину -->
                <q-btn
                  fab
                  color="primary"
                  icon="shopping_cart"
                  class="absolute"
                  style="top: 0; right: 12px; transform: translateY(-50%)"
                  @click="addToCart(event)"
                />

                <!-- Заголовок события -->
                <div class="row no-wrap items-center">
                  <div class="col text-h6 ellipsis">
                    {{ event.title }}
                  </div>

                  <!-- Отображение времени события -->
                  <div
                    class="rounded-borders col-3 cursor-pointer full-height fluid"
                  >
                    <q-icon name="access_time" />
                    {{ event.time }}
                  </div>
                </div>

                <!-- Отображение рейтинга события -->
                <q-rating v-model="stars" :max="5" size="32px" />
              </q-card-section>

              <q-card-section class="q-pt-none">
                <!-- Отображение цены события -->
                <div class="text-subtitle1">{{ event.price }}</div>
                <!-- Отображение описания события -->
                <div class="text-caption text-grey">
                  {{ event.description }}
                </div>
              </q-card-section>

              <!-- Разделитель -->
              <q-separator />
            </q-card>
          </div>
        </div>

        <!-- Если результаты не найдены -->
        <div v-if="results.length === 0">Результаты по вашему запросу не найдены</div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const searchQuery = ref('');
const results = ref([]);
const router = useRouter();

const performSearch = () => {
  // Фильтрация результатов по запросу
  results.value = excursions.value.filter((excursion) =>
    // Проверяем каждое поле на соответствие запросу
    Object.values(excursion).some((value) =>
      typeof value === 'string' &&
      value.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  );
};

// Загрузка данных из events.json
const excursions = ref([]);
const loadExcursions = async () => {
  try {
    const response = await fetch('/events.json');
    const data = await response.json();
    excursions.value = data;
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
};
loadExcursions(); // Загрузка данных при монтировании компонента

// Метод для добавления товара в корзину
const addToCart = (event) => {
  // Получаем данные о товаре из параметра event
  const { id, title, price, image, description, time } = event;

  // Получаем текущее содержимое корзины из локального хранилища или создаем новый массив
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // Проверяем, есть ли уже такой товар в корзине
  const existingItemIndex = cartItems.findIndex((item) => item.id === id);

  if (existingItemIndex !== -1) {
    // Если товар уже есть в корзине, увеличиваем его количество
    cartItems[existingItemIndex].quantity++;
  } else {
    // Если товара нет в корзине, добавляем его
    const newItem = { id, title, quantity: 1, price, image, description, time };
    cartItems.push(newItem);
  }

  // Обновляем данные в локальном хранилище
  localStorage.setItem("cart", JSON.stringify(cartItems));

  // Здесь можно добавить дополнительные действия, например, уведомить пользователя о добавлении товара в корзину
  console.log("Товар добавлен в корзину:", event);

  // Переход на страницу MyCard с передачей параметров о товаре
  router.push({ name: 'MyCard', params: { id, title, price, image, description, time } });
};

// Следить за изменениями в searchQuery и выполнять поиск при изменении
watch(searchQuery, performSearch);
</script>

<style scoped>
/* Добавьте стили по вашему усмотрению */
.my-card {
  max-width: 300px;
  margin: 10px;
}
</style>
