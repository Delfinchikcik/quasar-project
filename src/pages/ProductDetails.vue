<template>
  <q-page>
    <div class="select-container">
      <!-- Выпадающий список для выбора способа сортировки -->
      <select class="custom-select" v-model="sortOption" @change="sortItems">
        <option v-for="option in sortOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
      </select>
    </div>

    <div class="event-grid">
      <q-card v-for="(item, index) in sortedItems" :key="index" class="event-card">
        <q-card-section>
          <div class="q-gutter-md">
            <div class="event-title">{{ item.title }}</div>
            <q-img :src="item.image" alt="Product Image" class="event-image" />
            <div class="event-description">{{ item.description }}</div>
            <div class="event-price">Цена: {{ item.price }}</div>
            <div class="event-time">Время: {{ item.time }}</div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProductDetails',
  data() {
    return {
      items: [],
      sortOption: 'title',
      sortOptions: [
        { label: 'По наименованию', value: 'title' },
        { label: 'По цене', value: 'price' },
        { label: 'По времени', value: 'time' }
      ]
    };
  },
  computed: {
    sortedItems() {
      const sortedItems = [...this.items];
      switch (this.sortOption) {
        case 'title':
          sortedItems.sort((a, b) => (a.title > b.title ? 1 : -1));
          break;
        case 'price':
          sortedItems.sort((a, b) => a.price - b.price);
          break;
        case 'time':
          sortedItems.sort((a, b) => (a.time > b.time ? 1 : -1));
          break;
      }
      return sortedItems;
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      try {
        const response = await axios.get('events.json');
        this.items = response.data;
      } catch (error) {
        console.error('Error loading data:', error);
      }
    },
    sortItems() {
      switch (this.sortOption) {
        case 'title':
          this.items.sort((a, b) => (a.title > b.title ? 1 : -1));
          break;
        case 'price':
          this.items.sort((a, b) => a.price - b.price);
          break;
        case 'time':
          this.items.sort((a, b) => (a.time > b.time ? 1 : -1));
          break;
      }
    }
  }
};
</script>

<style scoped>
.event-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.event-card {
  width: 30%;
  margin: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.event-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.event-description {
  margin-bottom: 10px;
}

.event-price {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.event-time {
  font-size: 1.2rem;
  margin-bottom: 5px;
}

.event-image {
  border-radius: 10px 10px 0 0;
}

.q-card-section {
  padding: 20px;
}

.select-container {
  display: flex;
  justify-content: center;
  padding: 20px 20px; /* Регулирует отступы вокруг текста внутри select */
}

.custom-select {
  padding: 10px 20px; /* Регулирует отступы вокруг текста внутри select */
  font-size: 16px; /* Размер шрифта */
}
</style>
