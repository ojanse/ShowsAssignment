import { createRouter, createWebHistory } from 'vue-router';
import DefaultView from "@/global/views/DefaultView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultView
    },
  ]
});

export default router;
