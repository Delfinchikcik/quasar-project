<template>
  <q-page class="fixed-bottom">
    <div class="float-right">
      <q-dialog v-model="dialog" :position="position" class="float-right">
        <div class="q-pa-md row justify-center">
          <div style="width: 100%; max-width: 400px">
            <div class="chat_container q-pb-sm">
              <div class="chat_header">Чат</div>
              <q-chat-message
                v-for="(message, index) in chatMessages"
                :key="index"
                :sent="message.sent"
                :text-color="message.textColor"
                :bg-color="message.bgColor"
              >
                <template v-slot:name>{{ message.name }}</template>
                <template v-slot:avatar>
                  <img class="q-message-avatar" :src="message.avatar" />
                </template>
                <div>{{ message.text }}</div>
              </q-chat-message>
              <q-chat-message
                sent
                text-color="white"
                bg-color="primary"
                v-if="newMessageText"
              >
                <template v-slot:name>me</template>
                <template v-slot:avatar>
                  <img
                    class="q-message-avatar q-message-avatar--sent"
                    src="https://cdn.quasar.dev/img/avatar4.jpg"
                  />
                </template>
                <q-spinner-dots size="2rem" />
              </q-chat-message>
            </div>

            <q-input
              dark
              dense
              standout
              v-model="newMessageText"
              class="q-ml-md input_area"
              placeholder="Введите ваше сообщение"
              @keyup.enter="sendMessage"
            >
              <template v-slot:append>
                <q-icon
                  v-if="newMessageText"
                  name="send"
                  class="cursor-pointer"
                  @click="sendMessage"
                />
              </template>
            </q-input>
          </div>
        </div>
      </q-dialog>
      <q-btn
        style="position: fixed; bottom: 25%; right: 10px"
        color="primary"
        icon-right="mail"
        @click="open('right')"
      />
    </div>
  </q-page>
  <div class="q-mt-sm">
    <div class="row q-col-gutter-sm">
      <div style="height: 50vh" class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <q-carousel
          :class="$q.platform.is.desktop ? 'q-ml-sm' : ''"
          height="100%"
          swipeable
          animated
          v-model="slide"
          thumbnails
          infinite
          :interval="4000"
        >
          <q-carousel-slide
            class="rounded-borders"
            name="slide-1"
            img-src="gallery-2.jpg"
          >
            <div class="absolute-top custom-caption">
              <div class="text-subtitle1">Алупкинский дворец</div>
              <div class="text-caption">графа Михаила Семёновича Воронцова</div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide
            class="rounded-borders"
            name="slide-2"
            img-src="gallery-5.jpg"
          >
            <div class="absolute-top custom-caption">
              <div class="text-subtitle1">Ливадийский дворец</div>
              <div class="text-caption">Александра II</div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide
            class="rounded-borders"
            name="slide-3"
            img-src="gallery-1.jpg"
          >
            <div class="absolute-top custom-caption">
              <div class="text-subtitle1">Массандровский дворец</div>
              <div class="text-caption">Александра III</div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide
            class="rounded-borders"
            name="slide-4"
            img-src="AuDag_Adalary.jpg"
          >
            <div class="absolute-top custom-caption">
              <div class="text-subtitle1">Аю-Даг и Адалары</div>
              <div class="text-caption"></div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide
            class="rounded-borders"
            name="slide-5"
            img-src="Hram_Solnca.jpeg"
          >
            <div class="absolute-top custom-caption">
              <div class="text-subtitle1">Храм Солнца</div>
              <div class="text-caption"></div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide
            class="rounded-borders"
            name="slide-6"
            img-src="Mis_Fiolent_Yalta.png"
          >
            <div class="absolute-top custom-caption">
              <div class="text-subtitle1">Мыс Фиолент</div>
              <div class="text-caption"></div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide
            class="rounded-borders"
            name="slide-7"
            img-src="Hram_Yalty_Svyatogo_Mihaila.jpg"
          >
            <div class="absolute-top custom-caption">
              <div class="text-subtitle1">
                Храм Святого Архистратига Михаила
              </div>
              <div class="text-caption">Александра III</div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="slide-8" img-src="DSC_0130.jpg">
            <div class="absolute-top custom-caption">
              <div class="text-subtitle1">Канатная дорога Ай-Петри</div>
              <div class="text-caption"></div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </div>
    <div class="text-grey-9 text-weight-bold">
      <div class="row items-center q-mx-sm">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 q-mt-sm">
          <div class="q-pl-md bg-white q-pt-sm">
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
                height: 4vh;
              "
            >
              <q-btn
                to="/product-details"
                class="enter_btn"
                tag="a"
                color="primary"
                glossy
                :class="{ 'text-white': $q.dark.isActive }"
              >
                Выбери приключения
              </q-btn>
            </div>
            <div
              class="q-pa-md q-gutter-md row items-start q-col-gutter no-wrap"
            >
              <div class="q-col-gutter row items-start q-gutter-md">
                <div
                  class="q-col-xs-12 q-col-sm-6 q-col-md-4 q-col-lg-3"
                  v-for="(event, index) in events"
                  :key="index"
                >
                  <!-- Код карточки события -->
                  <q-card class="my-card" flat bordered >
                    <q-img :src="`/${event.image}`" @click="goToProductDetails(event)"/>
                    <q-card-section>
                      <q-btn
                        fab
                        color="primary"
                        icon="shopping_cart"
                        class="absolute"
                        style="top: 0; right: 12px; transform: translateY(-50%)"
                        @click="addToCart(event)"
                      />

                      <div class="row no-wrap items-center">
                        <div class="col text-h6 ellipsis">
                          {{ event.title }}
                        </div>
                        <div
                          class="rounded-borders col-3 cursor-pointer full-height fluid"
                        >
                          <q-icon name="access_time" />
                          {{ event.time }}
                        </div>
                      </div>

                      <q-rating v-model="stars" :max="5" size="32px" />
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                      <div class="text-subtitle1">₽ {{ event.price }}</div>
                      <div class="text-caption text-grey">
                        {{ event.description }}
                      </div>
                    </q-card-section>

                    <q-separator />

                    <q-card-actions>
              
                    </q-card-actions>
                  </q-card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db } from "src/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from 'vue-router';

// Определение реактивных переменных
const dialog = ref(false);
const position = ref("right");
const newMessageText = ref("");
const chatMessages = ref([]);

// Получение роутера
const router = useRouter();

// Метод для открытия диалогового окна
const open = (position) => {
  dialog.value = true;
  position.value = position;
};

// Метод для загрузки сообщений чата при монтировании компонента
onMounted(async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "chatMassage"));
    const fbDb = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      const data = {
        name: doc.data().name,
        avatar: doc.data().avatar,
        text: doc.data().text,
        sent: doc.data().sent,
        textColor: doc.data().textColor,
        bgColor: doc.data().bgColor,
      };
      fbDb.push(data);
    });
    chatMessages.value = fbDb;
  } catch (error) {
    console.error("Error loading chat messages:", error);
  }
});

// Метод для отправки сообщения в чат
const sendMessage = () => {
  if (newMessageText.value != "") {
    chatMessages.value.push({
      name: "me",
      avatar: "https://cdn.quasar.dev/img/avatar4.jpg",
      text: newMessageText.value,
      sent: true,
      textColor: "white",
      bgColor: "primary",
    });
    newMessageText.value = "";
  } else {
    let catcher = document.querySelector(".input_area");
    catcher.classList.add("shake");
    setTimeout(() => {
      catcher.classList.remove("shake");
    }, 1000);
  }
};

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
</script>

<script>
export default {
  data() {
    return {
      slide: "slide-1",
      trending_slide: 1,
      latest_slide: 1,
      events: [], // Добавляем массив для хранения данных о карточках товаров
    };
  },
  created() {
    this.startCarousel(); // Запускаем автоматическую карусель при создании компонента
    this.loadCards(); // Загружаем карточки при создании компонента
  },
      methods: {
        goToProductDetails(event) {
        // Проверяем, есть ли параметр event
        if (event) {
          // Если event передан, переходим на страницу с более подробным описанием товара
          this.$router.push({ name: 'ProductDetails', params: { event } });
        } else {
          // Если event не передан, переходим на страницу с общим списком товаров
          this.$router.push({ name: 'ProductList' });
        }
      },
          startCarousel() {
        let slideIndex = 1;
        let intervalId = setInterval(() => {
          // Увеличиваем индекс слайда с каждым интервалом
          slideIndex++;
          if (slideIndex > 8) slideIndex = 1; // Сбрасываем индекс, если он превысил 7
          this.slide = `slide-${slideIndex}`;
        }, 4000); // Интервал в миллисекундах

        // Остановка предыдущего интервала перед запуском нового
        clearInterval(this.intervalId);
        this.intervalId = intervalId;
      },
    async fetchEvents() {
      try {
        const response = await fetch("/events.json"); // Отправляем запрос к файлу events.json
        const data = await response.json(); // Парсим полученные данные в формате JSON
        this.events = data; // Присваиваем полученные данные переменной events
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    },
    loadCards() {
      this.fetchEvents(); // Вызываем метод загрузки данных при создании компонента
    },
  },
};
</script>

<style>
.my-emoji {
  vertical-align: middle;
  height: 2em;
  width: 2em;
}
.input_area {
  border-radius: 20px;
  background-color: #726f6f;
}
.chat_container {
  background-color: #bc9ae7;
  border-radius: 24px;
}
.chat_header {
  text-align: center;
  font-size: 28px;
  color: white;
  background-color: #826ba0;
  border-top-right-radius: 24px;
  border-top-left-radius: 24px;
}
.shake {
  animation: shake 0.3s;
}
@keyframes shake {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  75% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
<style lang="sass" scoped>
.custom-caption
  text-align: center
  padding: 6px
  color: white
  background-color: rgba(0, 0, 0, 0.5)
</style>
