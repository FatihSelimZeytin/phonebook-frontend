import type { ContactType } from './ContactType'

export interface UserType {
    id: number
    username: string
    email: string
    contacts?: ContactType[]
    createdAt: string
    updatedAt: string
}

export interface UserLoginResponseType {
    status: boolean
    msg: string
    data?: {
        token: string
        user?: {
            id: number
            username: string
            email: string
            createdAt?: string
            updatedAt?: string
        }
    }
}