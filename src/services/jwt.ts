export function decodeJWT(token: string): Record<string, any> | null {
    try {
        const base64Payload = token.split('.')[1]
        const decoded = atob(base64Payload)
        return JSON.parse(decoded)
    } catch (err) {
        console.error('Failed to decode JWT:', err)
        return null
    }
}

export function getTokenExpirationTime(token: string): number {
    const payload = decodeJWT(token)
    if (payload && payload.exp) {
        return payload.exp * 1000 // Convert seconds to milliseconds
    }
    return 0
}

export function isTokenExpired(token: string): boolean {
    const exp = getTokenExpirationTime(token)
    return Date.now() >= exp
}
