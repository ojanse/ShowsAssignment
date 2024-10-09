import { createRouter, createWebHistory } from 'vue-router';
import DefaultView from "@/global/views/DefaultView.vue";
import DashboardView from "@/modules/dashboard/views/DashboardView.vue";
import ShowDetailsView from "@/modules/detail/views/ShowDetailsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultView,
      children: [
        {
          path: '/',
          name: 'dashboard',
          component: DashboardView,
        },
        {
          path: '/show/:showId',
          name: 'show-details',
          component: ShowDetailsView,
        },
      ],
    },
  ]
});

export default router;
