<template>
  <q-layout view="hHr lpr fFf">
    <q-header elevated class="bg-white text-black">
      <q-toolbar class="toolbar">
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <q-avatar>
            <img src="logo.png" />
          </q-avatar>
          Team project
        </q-toolbar-title>
        <div>
          <q-btn class="notifications_icon" icon="notifications"></q-btn>
          <q-btn class="enter_btn">Войти</q-btn>
          <q-btn class="registration_btn">Регистрация</q-btn>
        </div>
        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
      <q-tabs align="center">
        <q-route-tab to="/page1" label="Page One" />
        <q-route-tab to="/page2" label="Page Two" />
        <q-route-tab to="/page3" label="Page Three" />
      </q-tabs>
    </q-header>
    <!-- я тут притаился   но было 220 ниже-->
    <q-drawer v-model="leftDrawerOpen" show-if-above :width="200" :breakpoint="450">
      <q-scroll-area style="height: calc(100%); border-right: 1px solid #ddd">
        <q-list padding>
          <q-item clickable v-ripple to="/" exact>
            <q-item-section avatar>
              <q-icon name="cloud_download" />
            </q-item-section>

            <q-item-section> - </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/nature" exact>
            <q-item-section avatar>
              <q-icon name="create" />
            </q-item-section>

            <q-item-section> - </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/aboutus" exact>
            <q-item-section avatar>
              <q-icon name="format_list_bulleted
" />
            </q-item-section>

            <q-item-section> - </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/contacts" exact>
            <q-item-section avatar>
              <q-icon name="school" />
            </q-item-section>

            <q-item-section> - </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/" exact>
            <q-item-section avatar>
              <q-icon name="timeline" />
            </q-item-section>

            <q-item-section> - </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/" exact>
            <q-item-section avatar>
              <q-icon name="mood" />
            </q-item-section>

            <q-item-section> - </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/" exact>
            <q-item-section avatar>
              <q-icon name="account_circle" />
            </q-item-section>

            <q-item-section> - </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/" exact>
            <q-item-section avatar>
              <q-icon name="search" />
            </q-item-section>

            <q-item-section> - </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/" exact>
            <q-item-section avatar>
              <q-icon name="group_work" />
            </q-item-section>

            <q-item-section> - </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/" exact>
            <q-item-section avatar>
              <q-icon name="group_add" />
            </q-item-section>

            <q-item-section> - </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
          <div class="text-weight-bold">Razvan Stoenescu</div>
          <div>@rstoenescu</div>
        </div>
      </q-img>
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-list padding>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section>
              Inbox
            </q-item-section>
          </q-item>

          <q-item active clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>

            <q-item-section>
              Star
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="send" />
            </q-item-section>

            <q-item-section>
              Send
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="drafts" />
            </q-item-section>

            <q-item-section>
              Drafts
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>

    <q-footer elevated class="bg-white text-white">
      <q-toolbar class="text-black row items-center justify-between">

        <img class="our_logo" src="logo.png" />

        <a class="footer_ref" href="tel:+74999224710">+7 499 922-47-10</a>

        <a class="phone_with_text" href="tel:88007006841">8 800 700-68-41</a>

        <a class="footer_ref" href="email:support@geekbrains.ru">support@sell.ru</a>

        <div class="q-mx-md">
          <q-btn class="footer_social">
            <q-icon name="img:vk_icon.png" />
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
    const rightDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
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
  background-color: rgb(236, 233, 233);
  margin-right: 6px;
}

.enter_btn,
.registration_btn {
  background-color: rgb(236, 233, 233);
  margin: 6px;
}

.our_logo {
  width: 3vw;
  margin-right: 5vw;
}

.phone_text {
  color: grey;
}

.footer_ref {
  text-decoration: none;
  color: black;
  margin-right: 5vw;
}

.phone_container {
  margin-top: 20px;
}

.phone_with_text {
  text-decoration: none;
  color: black;
  margin-right: 3px;
}

.footer_social {
  width: 30px;
  height: 30px;
  margin: 10px;
}

@media (max-width: 420px) {

  .enter_btn,
  .notifications_icon,
  .registration_btn {
    display: none;
  }
}
</style>
