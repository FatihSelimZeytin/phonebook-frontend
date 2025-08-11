import { request } from '../lib/api'
import { useAuthStore } from '../store/auth'
import type { UserLoginResponseType } from '../types/UserType'

interface LoginCredentials {
    email: string
    password: string
}

interface RegisterCredentials {
    username: string
    email: string
    password: string
}

// Login Function
export async function loginUser(
    credentials: LoginCredentials
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

// Register Function
export async function registerUser(
    credentials: RegisterCredentials
): Promise<UserLoginResponseType> {
    try {
        const data = await request<any>('POST', '/auth/register', credentials)

        if (!data) {
            return { status: false, msg: 'Registration failed' }
        }

        const auth = useAuthStore()
        auth.$reset()
        auth.authenticated = true
        auth.setUser(data)

        return { status: true, msg: '', data }
    } catch (error: any) {
        console.error(error)

        if (error.response?.status === 409) {
            return { status: false, msg: 'Email already registered' }
        }

        return { status: false, msg: 'Unexpected registration error' }
    }
}
