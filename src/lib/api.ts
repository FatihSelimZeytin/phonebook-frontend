import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:8080', // or your backend URL
    withCredentials: true,
})

export async function request<T = any>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    data?: any
): Promise<T> {
    const response = await apiClient.request<T>({ method, url, data })
    return response.data
}