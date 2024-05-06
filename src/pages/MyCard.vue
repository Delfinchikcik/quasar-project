<!-- MyCard.vue -->
<template>
  <q-page class="fixed-bottom">
    <!-- Отображение содержимого корзины -->
    <div>
      <h1>Корзина</h1>
      <div v-if="cartItems.length === 0">
        <p>Корзина пуста</p>
      </div>
      <div v-else>
        <ul>
          <li v-for="(item, index) in cartItems" :key="index">
            {{ item.title }} - {{ item.price }} - Количество: {{ item.quantity }}
            <q-btn flat round icon="delete" @click="removeFromCart(index)" />
          </li>
        </ul>
        <p>Общее количество товаров: {{ totalQuantity }}</p>
        <p>Общая сумма: ₽ {{ totalAmount }}</p>
      </div>
    </div>
  </q-page>
</template>

<!-- MyCard.vue -->
<script setup>
import { ref, onMounted, computed, watch, inject } from 'vue';

// Определяем событие emit для оповещения верхнего меню о изменении корзины
const emit = inject('emit');

// Создаем локальное хранилище для корзины
const cartItems = ref([]);

// Извлекаем данные из локального хранилища при создании компонента
onMounted(() => {
  loadCartItems();
});

// Метод для загрузки данных из локального хранилища
const loadCartItems = () => {
  const storedItems = localStorage.getItem('cart');
  if (storedItems) {
    cartItems.value = JSON.parse(storedItems);
  }
}

// Метод для удаления элемента из корзины
const removeFromCart = (index) => {
  cartItems.value.splice(index, 1);
  saveCartItems(); // Сохраняем обновленную корзину в локальное хранилище
  // Вызываем событие для оповещения верхнего меню о изменении корзины
  emit('cartUpdated', cartItems.value.length);
}

// Метод для сохранения данных в локальном хранилище
const saveCartItems = () => {
  localStorage.setItem('cart', JSON.stringify(cartItems.value));
}

// Вычисляемое свойство для общего количества товаров в корзине
const totalQuantity = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.quantity, 0);
});

// Вычисляемое свойство для общей суммы товаров в корзине
const totalAmount = computed(() => {
  return cartItems.value.reduce((total, item) => {
    // Проверяем, что item.price представлен числом или может быть преобразовано в число
    const price = parseFloat(item.price);
    // Проверяем, является ли price числом
    if (!isNaN(price)) {
      // Добавляем к общей сумме цену товара, умноженную на количество
      return total + (price * item.quantity);
    } else {
      // Если цена некорректна, выводим сообщение об ошибке в консоль
      console.error('Invalid price for item:', item);
      return total; // Возвращаем текущую общую сумму
    }
  }, 0);
});
// Слушатель события для обновления корзины после удаления элемента
watch(cartItems, () => {
  saveCartItems(); // Сохраняем обновленную корзину в локальное хранилище
});
</script>








<style scoped>
.q-page {
  margin-left: 300px; /* Добавляем 300 пикселей слева */
}

.my-card {
  /* Добавляем отступ, чтобы компоненты не были прижаты к левой стороне */
  margin-left: 20px;
}
</style>
