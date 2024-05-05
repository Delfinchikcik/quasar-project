<template>
  <div class="wrapper_index">
    <div
      class="fixed-bottom"
      style="display: flex; top: 555px; justify-content: right"
    >
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
      </div>
    </div>
    <q-btn class="chat_icon" color="primary" icon-right="mail" @click="open('right')" />
    <div class="q-mt-sm">
      <div class="row q-col-gutter-sm">
        <div
          style="height: 50vh"
          class="col-lg-12 col-md-12 col-sm-11 col-xs-11"
        >
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
                <div class="text-caption">
                  графа Михаила Семёновича Воронцова
                </div>
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
                  height: 8vh;
                "
              >
                <q-btn
                  to="/ProductCatalog"
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
                style="height: 40vh"
                class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap foto_gelery"
              >
                <q-img
                  @click="$router.push('/ProductCatalog')"
                  style="border: 1px solid lightgrey"
                  class="rounded-borders col-3 cursor-pointer full-height fluid"
                  src="gallery-5.jpg"
                >
                  <div class="absolute-bottom custom-caption">
                    <div class="text-caption text-weight-bolder">
                      Ливадийский дворец
                    </div>
                  </div>
                </q-img>
                <q-img
                  @click="$router.push('/ProductCatalog')"
                  style="border: 1px solid lightgrey"
                  class="rounded-borders col-3 cursor-pointer full-height fluid"
                  src="hero-banner.jpg"
                >
                  <div class="absolute-bottom custom-caption">
                    <div class="text-caption text-weight-bolder">Ялта</div>
                  </div>
                </q-img>
                <q-img
                  @click="$router.push('/ProductCatalog')"
                  style="border: 1px solid lightgrey"
                  class="rounded-borders col-3 cursor-pointer full-height fluid"
                  src="gallery-7.jpg"
                >
                  <div class="absolute-bottom custom-caption">
                    <div class="text-caption text-weight-bolder">
                      Ласточкино гнездо
                    </div>
                  </div>
                </q-img>
                <q-img
                  @click="$router.push('/ProductCatalog')"
                  style="border: 1px solid lightgrey"
                  class="rounded-borders col-3 cursor-pointer full-height fluid"
                  src="Koktebel.jpg"
                >
                  <div class="absolute-bottom custom-caption">
                    <div class="text-caption text-weight-bolder">Коктебель</div>
                  </div>
                </q-img>
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

defineOptions({
  name: "MainPage",
});
const dialog = ref(false);
const position = ref("right");
const newMessageText = ref("");
const open = (position) => {
  dialog.value = true;
  position.value = position;
};
const chatMessages = ref([]);
onMounted(async () => {
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
    chatMessages.value = fbDb;
  });
});

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
</script>
<!-- Скрипт для карусели -->
<script>
export default {
  data() {
    return {
      slide: "slide-1",
      trending_slide: 1,
      latest_slide: 1,
    };
  },
  created() {
    this.startCarousel(); // Запускаем автоматическую карусель при создании компонента
  },
  methods: {
    startCarousel() {
      let slideIndex = 1;
      setInterval(() => {
        // Увеличиваем индекс слайда с каждым интервалом
        slideIndex++;
        if (slideIndex > 8) slideIndex = 1; // Сбрасываем индекс, если он превысил 7
        this.slide = `slide-${slideIndex}`;
      }, 4000); // Интервал в миллисекундах
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
.wrapper_index{
  max-width: 80vw;
  margin: 0 auto;
  z-index: 0;
}
.chat_icon{
  position: fixed;
  bottom: 14vh;
  right: 2vw;
  z-index: 2;
  width: 4vw;
  height: 2vw;
  box-shadow: 5px 5px 3px 3px rgb(163, 209, 240);
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
