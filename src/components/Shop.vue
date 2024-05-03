<template>
  <div class="wrapper">
  <div class="product-catalog">
    <q-card
      class="product-list relative q-my-md"
      v-for="product in products"
      :key="product.id"
    >
      <q-btn
        class="favoritIcon"
        @click="() => favoritTogle(product)"
        round
        color="deep-orange"
        icon="star"
      />
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
            <q-btn @click="() => addToCart(product)" class="bg-red"
              >Удалить</q-btn
            >
            <q-space />
            <q-btn
              label="Подробнее"
              color="grey"
              round
              flat
              dense
              :icon="
                expanded[index] ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
              "
              @click="expanded[index] = !expanded[index]"
            />
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
  <q-dialog class="dialog_page" v-model="card">
    <q-card class="q-pa-lg">
      <h4 class="q-mt-sm q-mb-sm text-center" >Оформление заказа</h4>
      <p class="q-my-none" >Ваш заказ:</p>
      <q-card-section class="shopCartArea">
        <div
      class="q-my-sm flex wrap justify-between"
      v-for="product in products"
      :key="product.id"
    >
      <div>{{ product.name}}</div>
      <div class="q-ml-md">{{ product.price}} р.</div>
  </div>
      </q-card-section>
      <p>Итого к оплате: {{ totalSum}} </p>
    <q-form
     prevent
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md q-mt-md"
    >
      <q-input
        filled
        v-model="name"
        label="ФИО*"
        hint="Введите ваше ФИО"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Напишите ваше имя']"
      />

      <q-input
        filled
        type="email"
        v-model="email"
        label="Выш e-mail"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Вы ничего не ввели',
          val => val.includes('@')  || 'Введите корректный e-mail'
        ]"
      />

      <q-toggle v-model="accept" @click="disableChange" label="Я принимаю лицензионное соглашения" />

      <div>
        <q-btn label="Оформить" :disable="submitDisable" type="submit" color="primary"/>
        <q-btn label="Стереть данные" type="reset" color="primary" flat class="q-ml-sm" @click="resetForm" />
      </div>
    </q-form>
  </q-card>
    </q-dialog>
    <q-btn class="shop_btn" color="primary" @click="open">Оформить заказ</q-btn>
</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../boot/firebase.js";

defineOptions({
  name: "ShopPage",
});
const products = ref([]);
const expanded = ref([]);
const name = ref('');
const email = ref('');
const accept = ref(false);
const submitDisable = ref(true)
const totalSum = ref(0)

//Получение данных с Бд
onMounted(async function () {
  try {
    console.log("Получение данных из БД...");
    const querySnapshot = await getDocs(
      collection(db, "testProductsGroupProject")
    );
    console.log("Query snapshot:", querySnapshot);
    products.value = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      const data = doc.data() || {};
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
        favorit: data.favorit,
        shop_add: data.shop_add,
      };
      if (product.shop_add) {
        products.value.push(product);
      }
    });
  } catch (error) {
    console.error("Ошибка получения данных:", error);
  }
  totalPrice()
});

//Реализация добавления и удаления из избранного
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

const addToCart = async (productId) => {
  const productRef = doc(db, "testProductsGroupProject", productId.id);
  const addCartValue = !productId.shop_add;
  try {
    // Обновляем значение shop_add в документе Firestore
    await updateDoc(productRef, { shop_add: addCartValue });
    console.log("Favorit status updated successfully");
    const index = products.value.findIndex((p) => p.id === productId.id);
    products.value[index].shop_add = addCartValue;
    //Обновляем массив карточек
    products.value = products.value.filter(
      (product) => product.id !== productId.id
    );
  } catch (error) {
    console.error("Error updating favorit status:", error);
  }
};
const card =ref(false)
const open = ()=> {
  card.value = true
}

const disableChange = ()=>{
  submitDisable.value = !submitDisable.value
}
const resetForm = () =>{
  name.value = ''
  email.value = ''
}
const totalPrice = () => {
  products.value.forEach((product)=>{
    totalSum.value += product.price
  })
}
</script>

<style>
.shop_btn{
  color: #ffffff;
  position: fixed;
  top:100px;
  right: 20px;
  border-radius: 10px;
  padding: 10px;
}
.shopCartArea{
border: 1px solid black;
}
</style>