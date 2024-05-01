const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {path: "/Contacts", component: () => import("/src/pages/Contacts.vue"),
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    // path: '/:catchAll(.*)*',
    // component: () => import('pages/ErrorNotFound.vue')
  },
];

export default routes;
