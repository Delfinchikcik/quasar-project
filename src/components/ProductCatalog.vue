<template>
    <div class="product-catalog">
        <div class="product-list" v-for="(product, index) in products" :key="product.article">
            <div class="q-pa-md row items-start q-gutter-md">
                <q-card class="my-card" flat bordered>
                    <q-img src="" />

                    <q-card-section>
                        <!-- <div class="text-overline text-orange-9">{{ product.name }}</div> -->
                        <div class="text-h5 q-mt-sm q-mb-xs">{{ product.name }}</div>
                        <div class="text-caption text-grey">
                            {{ product.description }}
                        </div>
                    </q-card-section>

                    <q-card-actions>
                        <!-- <q-btn flat color="primary" label="" /> -->
                        <q-btn flat color="secondary" label="Забронировать" />

                        <q-space />

                        <q-btn label="Подробнее" color="grey" round flat dense
                            :icon="expanded[index] ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                            @click="expanded[index] = !expanded[index]" />
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
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs } from "firebase/firestore"
import { db } from '../boot/firebase.js'

const products = ref([])
const expanded = ref([])

console.log('Initial products:', products.value)

onMounted(async function () {
    try {
        console.log('Получение данных из БД...')
        const querySnapshot = await getDocs(collection(db, "testProductsGroupProject"))
        console.log('Query snapshot:', querySnapshot)
        products.value = []

        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data())
            const data = doc.data() || {}
            const product = {
                id: doc.id,
                available: data.available,
                category: data.category,
                description: data.description,
                images: data.images,
                name: data.name,
                price: data.price,
                destination: data.destination,
                duration: data.duration,
                group: data.group,

            }
            products.value.push(product)
            expanded.value.push(false)
        })
    } catch (error) {
        console.error("Ошибка получения данных:", error)
    }
})
</script>

<style scoped>
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
}

.product-item {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding: 16px;
    margin-bottom: 16px;
    background-color: #fff;
}
</style>