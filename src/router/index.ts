import { createRouter, createWebHistory } from 'vue-router';
import DefaultView from "@/global/views/DefaultView.vue";
import DashboardView from "@/modules/dashboard/DashboardView.vue";

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
      ],
    },
  ]
});

export default router;
