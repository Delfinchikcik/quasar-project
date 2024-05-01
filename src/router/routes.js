const routes = [
  { path: '/', component: () => import('src/pages/LoginPage.vue') },
  { path: '/RegistrationPage', component: () => import('src/pages/RegistrationPage.vue') },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/IndexPage", component: () => import("pages/IndexPage.vue") },
      {path: "/Contacts", component: () => import("/src/pages/Contacts.vue")},
      { path: '/my_profile', component: () => import('src/pages/my_profile.vue')},
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
