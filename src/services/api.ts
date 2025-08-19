import axios from 'axios'
import { useAuthStore } from '../store/auth'

export const defaultUrl = 'http://localhost:8090'; // Change to match your backend

const api = axios.create({
    baseURL: defaultUrl,
})

api.interceptors.request.use((config) => {
    const auth = useAuthStore()
    if (auth.token) {
        config.headers.Authorization = `Bearer ${auth.token}`
    }
    return config
})

export default api
