import { createRouter, createWebHistory } from 'vue-router';

import AdminDashboard from '@/components/dashboard/AdminDashboard.vue';
import LoginPage from '@/components/login/LoginPage.vue';
import ContactUs from '@/components/login/ContactUs.vue';
import ForgotPassword from '@/components/login/ForgotPassword.vue';

const routes = [
  { path: '/', component: LoginPage },
  { path: '/dashboard', component: AdminDashboard },
  { path: '/contact-us', component: ContactUs },
  { path: '/forgot-password', component: ForgotPassword },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
