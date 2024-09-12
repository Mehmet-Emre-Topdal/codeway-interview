import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../pages/LoginPage.vue';
import AdminPage from '../pages/AdminPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';

const routes = [
  {
    path: '/',
    redirect: '/admin', 
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/admin',
    name: 'AdminPanel',
    component: AdminPage,
    meta: { requiresAuth: true }, // Bu rotayı korumalı yapıyoruz
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundPage,
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Route guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('authToken');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }, // Girişten sonra yönlendirmek için query parametre ekleyin
      });
    } else {
      next();
    }
  } else {
    next(); // Eğer route koruma gerektirmiyorsa normal devam et
  }
});

export default router;

