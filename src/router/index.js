import { createRouter, createWebHistory } from 'vue-router'
import MedicineSearch from '../views/MedicineSearch.vue'
import MedicinePage from '../views/MedicinePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MedicineSearch
    },
    {
      path: '/page/:numProcesso',
      name: 'page',
      component: MedicinePage,
      props: true,
    }
  ]
})

export default router
