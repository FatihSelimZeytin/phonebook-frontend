import { defineStore } from 'pinia'
import api from '../services/api'
import { router } from '../router'
import { getTokenExpirationTime } from '../services/jwt'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || '',
        tokenExpiration: 0, // required for auto-refresh
        authenticated: false,
        user: null as any
    }),
    actions: {
        setUser(userData: any) {
            this.user = userData
            this.token = userData.token
            this.tokenExpiration = getTokenExpirationTime(userData.token) // set expiration
        },
        async login(email: string, password: string) {
            const res = await api.post('/auth/login', { email, password })
            this.setUser(res.data)
            this.authenticated = true
            localStorage.setItem('token', this.token)
            await router.push('/dashboard')
        },
        async register(username: string, email: string, password: string) {
            const res = await api.post('/auth/register', { username, email, password })
            this.setUser(res.data)
            this.authenticated = true
            localStorage.setItem('token', this.token)
            await router.push('/dashboard')
        },
        logout() {
            this.token = ''
            this.tokenExpiration = 0 // clear it
            this.authenticated = false
            this.user = null
            localStorage.removeItem('token')
        }
    }
})
