import axios from 'axios'
import { useAuthStore } from '../store/auth'
import { getTokenExpirationTime } from '../services/jwt'

const baseUrl = import.meta.env.VITE_BACKEND_URL

interface RefreshResponse {
    token: string
    status: boolean
    data: {
        token: string
    }
}

export async function request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    url: string,
    body?: any,
    customHeaders?: Record<string, string>
): Promise<T> {
    if (!url.startsWith('/')) {
        throw new Error('URL must start with /')
    }

    const auth = useAuthStore()
    const now = Date.now()

    // If token is about to expire (within 5s), refresh it
    if (auth.token && auth.tokenExpiration <= now + 5000) {
        try {
            const refreshRes = await axios.post<RefreshResponse>(
                `${baseUrl}/auth/refresh`,
                { token: auth.token }
            )

            if (refreshRes.data.status && refreshRes.data.data?.token) {
                auth.token = refreshRes.data.data.token
                auth.tokenExpiration = getTokenExpirationTime(auth.token)
            } else {
                throw new Error('Token refresh failed')
            }
        } catch {
            auth.logout()
            throw new Error('Session expired — logged out')
        }
    }

    const headers: Record<string, string> = {
        ...(customHeaders || {}),
    }

    if (auth.token) {
        headers.Authorization = `Bearer ${auth.token}`
    }

    const res = await axios.request<T>({
        method,
        url: `${baseUrl}${url}`,
        data: body,
        headers,
    })

    return res.data
}
