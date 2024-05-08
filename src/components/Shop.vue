<template>
  <div class="wrapper">
    <product-card :products-list="shopList" v-slot="{ uuid, product }">
      <slot>
        <q-btn
          @click="removeAtShop(uuid, product)"
          flat
          color="red"
          label="Удалить"
        />
      </slot>
    </product-card>
    <q-dialog class="dialog_page" v-model="card">
      <q-card class="q-pa-lg">
        <h4 class="q-mt-sm q-mb-sm text-center">Оформление заказа</h4>
        <p class="q-my-none">Ваш заказ:</p>
        <q-card-section class="shopCartArea">
          <div
            class="q-my-sm flex wrap justify-between"
            v-for="product in shopList"
            :key="product.id"
          >
            <div>{{ product.name }}</div>
            <div class="q-ml-md">{{ product.price }} р.</div>
          </div>
        </q-card-section>
        <p>Итого к оплате: {{ totalSum }}</p>
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
            :rules="[(val) => (val && val.length > 0) || 'Напишите ваше имя']"
          />

          <q-input
            filled
            type="email"
            v-model="email"
            label="Выш e-mail"
            lazy-rules
            :rules="[
              (val) => (val !== null && val !== '') || 'Вы ничего не ввели',
              (val) => val.includes('@') || 'Введите корректный e-mail',
            ]"
          />

          <q-toggle
            v-model="accept"
            @click="disableChange"
            label="Я принимаю лицензионное соглашения"
          />

          <div>
            <q-btn
              label="Оформить"
              :disable="submitDisable"
              type="submit"
              color="primary"
            />
            <q-btn
              label="Стереть данные"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
              @click="resetForm"
            />
          </div>
        </q-form>
      </q-card>
    </q-dialog>
    <q-btn class="shop_btn" color="primary" @click="open">Оформить заказ</q-btn>
  </div>
</template>

<script setup>
import { defineComponent, ref, watch } from "vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { useShopStore } from "src/stores/shop";
import { GET_SHOP, REMOVE_SHOP } from "src/queries/getProducts";
import ProductCard from "./ProductCard.vue";

defineComponent({
  name: "ShopPage",
  components: {
    ProductCard,
  },
});

const name = ref("");
const email = ref("");
const accept = ref(false);
const submitDisable = ref(true);
const totalSum = ref(0);
const totalCounter = () => {
  totalSum.value += shopStore.shop.reduce(
    (acc, product) => acc + product.price,
    0
  );
};
const shopStore = useShopStore();
const { result, loading } = useQuery(GET_SHOP);
const shopList = shopStore.shop;

watch(loading, (value) => {
  if (!value) {
    console.log(result.value);
    const shop = result.value?.Shop;
    shopStore.setShop(shop);
    console.log(shop);
    totalCounter();
  }
});

const { mutate: removeShop } = useMutation(REMOVE_SHOP);

const removeAtShop = async (uuid, product) => {
  console.log("Удаление " + uuid, product);
  try {
    const variables = {
      User_id: uuid,
      name: product.name,
    };
    const { data } = await removeShop(variables);
    console.log("Удалил из корзины", data);
    shopStore.removeShop(product.name);
    totalSum.value -= product.price;
  } catch (error) {
    console.error("Не удалось удалить из корзины", error);
  }
};

const card = ref(false);
const open = () => {
  card.value = true;
};

const disableChange = () => {
  submitDisable.value = !submitDisable.value;
};
const resetForm = () => {
  name.value = "";
  email.value = "";
};
const totalPrice = () => {
  products.value.forEach((product) => {
    totalSum.value += product.price;
  });
};
</script>

<style>
.shop_btn {
  color: #ffffff;
  position: fixed;
  top: 100px;
  right: 20px;
  border-radius: 10px;
  padding: 10px;
}
.shopCartArea {
  border: 1px solid black;
}
</style>
