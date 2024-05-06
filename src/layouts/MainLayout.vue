<!-- MainLayout.vue -->
<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-white text-black">
      <div class="col-sm-12 col-xs-12">
        <q-toolbar class="toolbar bg-blue">
          <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
          <!-- <q-btn dense flat round icon="menu" @click="console.log('Button clicked')" /> -->

          <q-toolbar-title style="color: #fff" class="col-xs">
            <q-avatar class="our_logo_header">
              <img src="~assets/Logo_white_wdt.png" />
            </q-avatar>
            Quasar Tours
          </q-toolbar-title>
          <!-- Корзина, настройки и выход -->
          <div class="q-col q-col-gutter justify-end">
            <q-btn
              class="q-mr-md"
              color="white"
              dense
              round
              flat
              icon="shopping_cart"
              to="/MyCard"
            >
              <q-badge color="red" class="text-bold" floating transparent>
                {{ cartCounter }}
              </q-badge>
            </q-btn>
            <q-btn
              flat
              round
              dense
              icon="settings"
              color="white"
              class="q-mr-md"
            />
            <q-btn flat round dense icon="exit_to_app" color="white" to="/" />
          </div>
        </q-toolbar>
      </div>
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
          <q-item clickable v-ripple to="/MyProfile" exact>
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

          <q-item clickable v-ripple to="/Contacts" exact>
            <q-item-section avatar>
              <q-icon name="contacts" />
            </q-item-section>
            <q-item-section>Контакты</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/Favorite" exact>
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>
            <q-item-section>Избранное</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/SearchPage" exact>
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>
            <q-item-section>Поиск</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/MyCard" exact>
            <q-item-section avatar>
              <q-icon name="shopping_cart" />
            </q-item-section>
            <q-item-section>Корзина</q-item-section>
          </q-item>

        </q-list>
      </q-scroll-area>
    </q-drawer>


    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>

    <q-footer
      elevated
      class="bg-blue text-white"
      style="min-height: fit-content"
    >
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

        <div class="q-mx-md" style="transform: translateX(-50px)">
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

<!-- MainLayout.vue -->
<script>
import MyCard from '../pages/MyCard.vue'; // Путь к компоненту MyCard
import { ref, onMounted, watch } from "vue";
import { date } from "quasar";
import ProductCatalog from "components/ProductCatalog.vue";

export default {
  setup() {
    // Логика для левого выдвижного menu
    const leftDrawerOpen = ref(false);
    const toggleLeftDrawer = () => {
      console.log("Toggle Left Drawer"); // Проверка работы гамбургера показала на то что оно не сворачивается из-за stars
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    // Логика для экскурсий и поиска
    const excursions = ref([]); // массив экскурсий
    const filteredExcursions = ref([]); // отфильтрованные экскурсии
    const searchQuery = ref(""); // поисковый запрос

    // Метод для фильтрации экскурсий по поисковому запросу
    const filterExcursions = () => {
      // Поиск по JSON файлу
      const filtered = excursions.value.filter((excursion) => {
        // Для примера предположим, что вам нужно искать по названию экскурсии
        return excursion.title
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase());
      });
      // Обновление списка экскурсий на главной странице
      filteredExcursions.value = filtered;
    };

    // Метод для обработки введенного поискового запроса
    const handleSearch = () => {
      filterExcursions();
    };

    // Метод для загрузки данных о экскурсиях
    const loadExcursions = async () => {
      try {
        const response = await fetch("/events.json"); // Загрузка данных о экскурсиях из JSON файла
        const data = await response.json(); // Преобразование ответа в JSON формат
        excursions.value = data; // Обновление данных экскурсий
      } catch (error) {
        console.error("Ошибка при загрузке данных экскурсий:", error);
      }
    };

    // Загрузка данных о экскурсиях при монтировании компонента
    onMounted(() => {
      loadExcursions();
    });

    // Вызов метода фильтрации экскурсий при изменении searchQuery
    watch(searchQuery, () => {
      filterExcursions();
    });
    return {
      leftDrawerOpen,
      toggleLeftDrawer,
      excursions,
      filteredExcursions,
      searchQuery,
      handleSearch,
    };
  },
  // components: {
  //   ProductCatalog,
  // },
  computed: {
    dataTime() {
      const timeStamp = Date.now();
      return date.formatDate(timeStamp, "dddd H mm");
    },
  },
};
</script>

<script setup>
const cartCounter = ref(0);

// Подписываемся на событие обновления корзины из MyCard.vue
const onCartUpdated = (count) => {
  cartCounter.value = count;
  };
</script>

<style scoped>
.notifications_icon {
  border-radius: 50%;
  width: 1vw;
  background-color: primary;
  margin-right: 6px;
  color: #fff;
}

.enter_btn,
.registration_btn {
  background-color: primary;
  margin: 6px;
  color: #fff;
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
