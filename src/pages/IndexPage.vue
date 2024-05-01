<template>
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
