<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-white text-black">
      <q-toolbar class="toolbar bg-blue">
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title style="color: #fff">
          <q-avatar class="our_logo_header">
            <img src="~assets/Logo_white_wdt.png" />
          </q-avatar>
          Quasar Tours
        </q-toolbar-title>
        <div>
          <q-btn class="notifications_icon" icon="notifications"></q-btn>
          <q-btn to="/" class="enter_btn" tag="a">Войти</q-btn>
          <q-btn to="RegistrationPage" class="registration_btn" tag="a"
            >Регистрация</q-btn
          >
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="250"
      :breakpoint="450"
    >
      <q-scroll-area style="height: calc(100%); border-right: 1px solid #ddd">
        <q-item clickable v-ripple to="/IndexPage" exact>
          <q-item-section avatar>
            <q-icon name="computer" />
          </q-item-section>

          <q-item-section>Главная страница</q-item-section>
        </q-item>
        <q-list padding>
          <q-item clickable v-ripple to="/my_profile" exact>
            <q-item-section avatar>
              <q-icon name="account_circle" />
            </q-item-section>

            <q-item-section> Профиль </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/ProductCatalog" exact>
            <q-item-section avatar>
              <q-icon name="map" />
            </q-item-section>

            <q-item-section style="white-space: nowrap"
              >Список приключений</q-item-section
            >
          </q-item>

          <q-item clickable v-ripple to="/contacts" exact>
            <q-item-section avatar>
              <q-icon name="contacts" />
            </q-item-section>

            <q-item-section>Контакты</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/favorite" exact>
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>

            <q-item-section>Избранное</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>

    <q-footer elevated class="bg-blue text-white">
      <q-toolbar class="text-black row items-center justify-between">
        <img
          style="width: 2%; height: 2%"
          class="our_logo"
          src="~assets/Logo_white_wdt.png"
        />

        <a class="footer_ref" href="tel:+74999224710">+7 499 922-47-10</a>

        <a class="phone_with_text" href="tel:88007006841">8 800 700-68-41</a>

        <a class="footer_ref" href="email:support@geekbrains.ru"
          >support@sell.ru</a
        >

        <div class="q-mx-md">
          <q-btn class="footer_social">
            <q-icon name="img:vk_icon_w.png" />
          </q-btn>
          <q-btn class="footer_social">
            <q-icon name="img:youtube_icon.png" />
          </q-btn>
          <q-btn class="footer_social">
            <q-icon name="img:telegram_icon.png" />
          </q-btn>
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { computed, ref } from "vue";
import { date } from "quasar";

export default {
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  computed: {
    dataTime() {
      const timeStamp = Date.now();
      return date.formatDate(timeStamp, "dddd H mm");
    },
  },
};
</script>
<style scoped>
.notifications_icon {
  border-radius: 50%;
  width: 1vw;
  background-color: primary;
  margin-right: 6px;
  color: white;
}

.enter_btn,
.registration_btn {
  background-color: primary;
  margin: 6px;
  color: white;
}

.our_logo {
  margin-right: 5vw;
}
.our_logo_header,
.our_logo {
  width: 7vw;
  height: 7vh;
}
.phone_text {
  color: grey;
}

.footer_ref {
  text-decoration: none;
  color: rgb(255, 255, 255);
  margin-right: 5vw;
}

.phone_container {
  margin-top: 20px;
}

.phone_with_text {
  text-decoration: none;
  color: rgb(255, 255, 255);
  margin-right: 3px;
}

.footer_social {
  width: 30px;
  height: 30px;
  margin: 10px;
  /* background-color: #fff; */
}

@media (max-width: 420px) {
  .enter_btn,
  .notifications_icon,
  .registration_btn {
    display: none;
  }
}
</style>
