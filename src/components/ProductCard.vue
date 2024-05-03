<template>
    <div class="product-catalog">
        <q-card class="product-list relative q-my-md">
            <q-btn class="favoritIcon" @click="() => favoritTogle(product)" round color="deep-orange"
                icon="local_activity" />
            <div class="q-pa-md row items-start q-gutter-md">
                <q-card class="my-card" flat bordered>
                    <!-- <div class="q-pa-md">
                        <q-carousel animated v-model="slide" arrows navigation infinite>
                            <q-carousel-slide v-for="(image, index) in product.image" :key="index" :name="index + 1"
                                :img-src="image" />
                        </q-carousel>
                    </div> -->
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
                </q-card>
            </div>
        </q-card>
    </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "src/firebase";
// тянем инфу из firebase
const products = ref([]);
const slide = ref(1);


onMounted(async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "testProductsGroupProject"));
        products.value = [];
        querySnapshot.forEach((doc) => {
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
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});

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
