import { createRouter, createWebHistory } from 'vue-router';

import AdminDashboard from '@/components/dashboard/AdminDashboard.vue';
import LoginPage from '@/components/login/LoginPage.vue';
import ContactUs from '@/components/login/ContactUs.vue';
import ForgotPassword from '@/components/login/ForgotPassword.vue';
import AddBulk from '@/components/common/AddBulk.vue';
import UserForm from '@/components/common/UserForm.vue';
import AddNewGroup from '@/components/common/AddNewGroup.vue';

const routes = [
  { path: '/', component: LoginPage },
  {
    path: '/dashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true },
  },
  { path: '/contact-us', component: ContactUs },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '/add-bulk', component: AddBulk },
  { path: '/add-new', component: UserForm },
  { path: '/add-new-group', component: AddNewGroup },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!sessionStorage.getItem('token');

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/');
  } else {
    next();
  }
});

export default router;
