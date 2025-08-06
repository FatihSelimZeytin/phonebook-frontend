import { request } from '@/lib/api'
import { useAuthStore } from '../store/auth'
import { UserLoginResponseType } from '@/types/UserTypes'

interface Credentials {
    email: string
    password: string
}

export async function loginUser(
    credentials: Credentials
): Promise<UserLoginResponseType> {
    try {
        const data = await request<any>('POST', '/auth/login', credentials)

        if (!data) {
            return { status: false, msg: 'Login failed' }
        }

        const auth = useAuthStore()
        auth.$reset()
        auth.authenticated = true
        auth.setUser(data)

        return { status: true, msg: '', data }
    } catch (error: any) {
        console.error(error)

        if (error.response?.status === 401) {
            return { status: false, msg: 'Invalid credentials' }
        }

        return { status: false, msg: 'Unexpected login error' }
    }
}
