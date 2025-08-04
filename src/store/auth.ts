import { defineStore } from 'pinia'
import api from '../services/api'
import { router } from '../router'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || ''
    }),
    actions: {
        async login(email: string, password: string) {
            const res = await api.post('/auth/login', { email, password })
            this.token = res.data.token
            localStorage.setItem('token', this.token)
            await router.push('/dashboard')
        },
        async register(username: string, email: string, password: string) {
            await api.post('/auth/register', { username, email, password })
            await router.push('/login')
        },
        logout() {
            this.token = ''
            localStorage.removeItem('token')
        }
    }
})
