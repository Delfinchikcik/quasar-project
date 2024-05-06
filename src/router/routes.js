const routes = [
  { path: '/', component: () => import('src/pages/LoginPage.vue') },
  { path: '/RegistrationPage', component: () => import('src/pages/RegistrationPage.vue') },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/IndexPage", component: () => import("pages/IndexPage.vue") },
      { path: "/Contacts", component: () => import("/src/pages/Contacts.vue") },
      { path: '/MyProfile', component: () => import('/src/pages/MyProfile.vue') },
      { path: '/ProductCatalog', component: () => import('components/ProductCatalog.vue') },
      { path: '/Favorite', component: () => import('/src/pages/Favorite.vue') },
      { path: '/Shop', component: () => import('/src/components/Shop.vue') },
      { path: '/SearchPage', component: () => import("pages/SearchPage.vue") },
      { path: '/MyCard', component: () => import("pages/MyCard.vue") },
      {
        // path: '/MyCard',
        // component: () => import("pages/MyCard.vue"),
        // props: (route) => ({
        //   title: route.query.title,
        //   price: route.query.price,
        //   image: route.query.image,
        //   description: route.query.description,
        //   time: route.query.time
        // })
        path: '/MyCard/:id/:title/:price/:image/:description/:time',
        name: 'MyCard',
        component: () => import("pages/MyCard.vue"),
        props: true
      },
      // Добавляем новый маршрут для страницы с деталями экскурсии
      {
        path: '/product-details',
        name: 'ProductDetails',
        component: () => import('pages/ProductDetails.vue'),
        props: true
      }
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },
];

export default routes;
