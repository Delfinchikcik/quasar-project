<template>
   <div class="product-catalog">
    <q-card class="product-list relative q-my-md" v-for="product in props.productsList" :key="product.id">
      <q-btn class="favoritIcon" @click="() => favoritTogle(product)" round color="deep-orange" icon="local_activity" />
      <div class="q-pa-md row items-start q-gutter-md">
        <q-card class="my-card" flat bordered>
          <q-img src="" />
          <q-card-section>
            <div class="text-h5 q-mt-sm q-mb-xs">{{ product.name }}</div>
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
import {defineProps, ref} from 'vue'

const expanded = ref([]);
const props = defineProps({
    productsList: {
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