import Cookies from 'js-cookie'
import { apiRequest } from '../index'

export async function login(username, password) {
    const data = await apiRequest({
        endpoint: 'login',
        method: 'POST',
        body: { username, password },
    })
    // Set cookie expires in 5 minutes
    Cookies.set('auth', data.token, { expires: 24 })
    return data.token
}

export async function register(form) {
    return await apiRequest({
        endpoint: 'register',
        method: 'POST',
        body: form,
    })
}

export async function logout(token) {
    return await apiRequest({
        endpoint: 'logout',
        method: 'POST',
        token,
    })
}

export async function getProfile(token) {
    return await apiRequest({
        endpoint: 'user',
        method: 'GET',
        token,
    })
}

export async function getToken() {
    const token = Cookies.get('auth')
    if (!token) {
        throw new Error('No authentication token found')
    }
    return token
}