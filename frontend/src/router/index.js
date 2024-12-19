import { createMemoryHistory, createRouter } from 'vue-router'


import AdminDashboard from "@/components/dashboard/AdminDashboard.vue";
import LoginPage from "@/components/login/LoginPage.vue";

const routes = [
    { path: '/', component: LoginPage },
    { path: '/dashboard', component: AdminDashboard },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router