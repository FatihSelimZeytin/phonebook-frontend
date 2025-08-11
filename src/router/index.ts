import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import ContactsPage from '../pages/ContactsPage.vue'
import AddContactPage from "../pages/AddContactPage.vue"
import EditContactPage from "../pages/EditContactPage.vue"
import { useAuthStore } from '../store/auth'

const routes = [
    { path: '/', redirect: '/dashboard' },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/addcontact', component: AddContactPage, meta: { requiresAuth: true } },
    { path: '/editcontact/:id', component: EditContactPage, meta: { requiresAuth: true } },
    {
        path: '/dashboard',
        component: ContactsPage,
        meta: { requiresAuth: true }
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, _, next) => {
    const auth = useAuthStore()

    if (to.meta.requiresAuth && !auth.token) {
        next('/login')
    } else {
        next()
    }
})
