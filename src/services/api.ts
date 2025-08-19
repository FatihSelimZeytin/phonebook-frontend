import axios from 'axios'
import { useAuthStore } from '../store/auth'

export const BASE_URL = 'http://localhost:8090'

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})

// Add auth token automatically (if available)
api.interceptors.request.use((config) => {
    const auth = useAuthStore()
    if (auth.token) {
        config.headers.Authorization = `Bearer ${auth.token}`
    }
    return config
})

// Generic helper if you still want `request<T>()`
export async function request<T = any>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    data?: any
): Promise<T> {
    const response = await api.request<T>({ method, url, data })
    return response.data
}

export default api