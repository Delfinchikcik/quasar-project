<template>
  <div>
    <q-page class="q-pa-md tam-area">
      <q-card class="q-mb-md">
        <q-card-section>
          <h2 class="text-h5 text-center q-my-xs">Наша команда</h2>
          <div class="flex item-center justify-around">
            <div
              v-for="(member, index) in teamMembers"
              :key="index"
              :color="member.color"
              class="q-mr-md q-mt-md flex"
            >
              <q-avatar>
                <q-img :src="member.avatar" alt="Avatar" />
              </q-avatar>
              <q-labe class="q-ml-md">
                <q-badge color="primary">{{ member.role }}</q-badge>
                <p class="text-body2">{{ member.name }}</p>
              </q-labe>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <q-card class="form_area">
        <q-card-section class="q-pt-none">
          <p class="form_title">По вопросам рекламы и сотрудничества</p>
          <q-form @submit.prevent="submitForm">
            <q-input
              outlined
              v-model="formData.name"
              label="Имя"
              dense
              required
            />
            <q-input
              outlined
              v-model="formData.email"
              label="Почта"
              dense
              type="email"
              required
            />
            <q-input
              outlined
              v-model="formData.message"
              label="Текст сообщения"
              dense
              type="textarea"
              required
              autogrow
            />
            <q-btn
              type="submit"
              label="Отправить"
              color="primary"
              class="q-mt-md"
            />
          </q-form>
        </q-card-section>
      </q-card>
      <h5 class="text-center q-mb-sm">Социальные сети</h5>
      <q-card class="justify-center">
        <div class="q-pa-md q-gutter-x-xl flex justify-around">
          <q-btn
            round
            glossy
            href="https://www.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2F%3Flocale%3Dru_RU"
            target="blank"
            ><q-icon class="icon_link" name="img:FACEBOOCK.png"></q-icon
          ></q-btn>
          <q-btn round glossy href="https://www.instagram.com/" target="blank"
            ><q-icon class="icon_link" name="img:INST.png"></q-icon
          ></q-btn>
          <q-btn
            round
            glossy
            href="https://www.whatsapp.com/?lang=ru_RU"
            target="blank"
            ><q-icon class="icon_link" name="img:WHATSAP.png"></q-icon
          ></q-btn>
          <q-btn round glossy href="https://web.telegram.org/" target="blank"
            ><q-icon class="icon_link" name="img:TELEG.png"></q-icon
          ></q-btn>
          <q-btn round glossy href="https://vk.com/" target="blank"
            ><q-icon class="icon_link" name="img:VK.png"></q-icon
          ></q-btn>
          <q-btn
            round
            glossy
            href="https://www.youtube.com/?app=desktop&hl=ru"
            target="blank"
            ><q-icon class="icon_link" name="img:YOTUBE.png"></q-icon
          ></q-btn>
        </div>
      </q-card>
    </q-page>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db } from "src/firebase";
import { getDocs, collection } from "firebase/firestore";

defineOptions({
  name: "contactPage",
});
const formData = {
  name: "",
  email: "",
  message: "",
};
const submitForm = () => {
  console.log(formData);
};
const teamMembers = ref([]);

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, "teamMembers"));
  const teamMembersDb = [];
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    const member = {
      name: doc.data().name,
      avatar: doc.data().avatar,
      role: doc.data().role,
      color: doc.data().color,
    };
    teamMembersDb.push(member);
    teamMembers.value = teamMembersDb;
  });
});
</script>

<style scoped>
.form_area {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  margin: 0 auto;
}
.form_title {
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
}
.tam-area {
  max-width: 700px;
  margin: 0 auto;
}
.icon_link {
  width: 40px;
  height: 40px;
}
</style>
