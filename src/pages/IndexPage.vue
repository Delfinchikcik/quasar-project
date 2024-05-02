<template>
  <div>
    <q-page class="fixed-bottom">
      <div class="float-right">
        <q-dialog v-model="dialog" :position="position">
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
      <q-btn color="secondary" icon-right="mail" @click="open('right')" />
    </div>
  </q-page>
  <div class="q-mt-sm">
    <div class="row q-col-gutter-sm">
      <div class="col-lg-11 col-md-11 col-sm-10 col-xs-10">
        <q-carousel
          :class="$q.platform.is.desktop ? 'q-ml-sm' : ''"
          arrows
          animated
          v-model="slide"
          height="500px"
        >
          <q-carousel-slide name="first" img-src="gallery-2.jpg">
            <div class="absolute-bottom custom-caption">
              <div class="text-subtitle1">Алупкинский дворец</div>
              <div class="text-caption"></div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="second" img-src="gallery-5.jpg">
            <div class="absolute-bottom custom-caption">
              <div class="text-subtitle1">Ливадийский дворец</div>
              <div class="text-caption"></div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="third" img-src="gallery-1.jpg">
            <div class="absolute-bottom custom-caption">
              <div class="text-subtitle1">Массандровский дворец</div>
              <div class="text-caption">Александра III</div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </div>
    <div class="text-grey-9 text-weight-bold">
      <div class="row items-center q-mx-sm">
        <div class="col-12 q-mt-sm">
          <div class="q-pl-md bg-white q-pt-sm">
            <!-- <span class="text-grey-9 text-h6 text-weight-bold">Latest Launches</span>
            <a class="text-primary q-ml-sm cursor-pointer">[see all]</a> -->
          </div>
        </div>
      </div>
      <div class="row items-center q-mx-sm">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 q-mt-sm">
          <div class="q-pl-md bg-white q-pt-sm">
            <span class="text-grey-9 text-h6 text-weight-bold"
              >Популярные туры</span
            >
            <a class="text-primary q-ml-sm cursor-pointer">[читать далее]</a>
          </div>
          <q-carousel
            v-model="trending_slide"
            transition-prev="slide-right"
            transition-next="slide-left"
            swipeable
            animated
            control-color="primary"
            navigation
            padding
            arrows
            height="260px"
            class="rounded-borders"
          >
            <q-carousel-slide
              v-for="(val, idx) in [1, 2, 3]"
              :name="val"
              :key="idx"
              class="column no-wrap"
            >
              <div
                class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
              >
              <q-img
                  @click="$router.push('/category')"
                  style="border: 1px solid lightgrey"
                  class="rounded-borders col-lg-3 col-md-3 col-sm-12 col-xs-12 cursor-pointer full-height"
                  src="gallery-5.jpg"
                >
                  <div
                    class="absolute-bottom custom-caption"
                    style="background-color: rgba(0, 0, 0, 0.5)"
                  >
                    <div class="text-caption text-weight-bolder">Ливадийский дворец</div>
                  </div>
                </q-img>
                <q-img
                  @click="$router.push('/category')"
                  style="border: 1px solid lightgrey"
                  class="rounded-borders col-lg-3 col-md-3 col-sm-12 col-xs-12 cursor-pointer full-height"
                  src="hero-banner.jpg"
                >
                  <div
                    class="absolute-bottom custom-caption"
                    style="background-color: rgba(0, 0, 0, 0.5)"
                  >
                    <div class="text-caption text-weight-bolder">Ялта</div>
                  </div>
                </q-img>
                <q-img
                  @click="$router.push('/category')"
                  style="border: 1px solid lightgrey"
                  class="rounded-borders col-lg-3 col-md-3 col-sm-12 col-xs-12 cursor-pointer full-height"
                  src="gallery-7.jpg"
                >
                  <div
                    class="absolute-bottom custom-caption"
                    style="background-color: rgba(0, 0, 0, 0.5)"
                  >
                    <div class="text-caption text-weight-bolder">
                      Ласточкино гнездо
                    </div>
                  </div>
                </q-img>

                <q-img
                  @click="$router.push('/category')"
                  style="border: 1px solid lightgrey"
                  class="rounded-borders col-lg-3 col-md-3 col-sm-12 col-xs-12 cursor-pointer full-height"
                  src="gallery-1.jpg"
                >
                  <div
                    class="absolute-bottom custom-caption"
                    style="background-color: rgba(0, 0, 0, 0.5)"
                  >
                    <div class="text-caption text-weight-bolder">
                      Массандровский дворец
                    </div>
                  </div>
                </q-img>

              </div>
            </q-carousel-slide>
          </q-carousel>
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
<script>
import Vue from "vue";

export default {
  data() {
    return {
      slide: "first",
      trending_slide: 1,
      latest_slide: 1,
    };
  },
  methods: {},
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
  padding: 8px
  color: white
  background-color: rgba(0, 0, 0, .3)
</style>
