import { createRouter, createWebHistory } from 'vue-router';

import AdminDashboard from '@/components/dashboard/AdminDashboard.vue';
import LoginPage from '@/components/login/LoginPage.vue';
import ContactUs from '@/components/login/ContactUs.vue';
import ForgotPassword from '@/components/login/ForgotPassword.vue';
import AddBulk from '@/components/common/AddBulk.vue';
import UserForm from '@/components/common/UserForm.vue';

const routes = [
  { path: '/', component: LoginPage },
  { path: '/dashboard', component: AdminDashboard },
  { path: '/contact-us', component: ContactUs },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '/add-bulk', component: AddBulk },
  { path: '/add-new', component: UserForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
