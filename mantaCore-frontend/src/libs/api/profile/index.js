import { apiRequest } from '../index'

export async function changePassword(token, form) {
    return await apiRequest({
        endpoint: 'changePassword',
        method: 'POST',
        body: form,
        token,
    })
}

export async function editProfile(token, form) {
    return await apiRequest({
        endpoint: 'editProfile',
        method: 'POST',
        body: form,
        token,
    })
}

export async function deleteAccount(token) {
    return await apiRequest({
        endpoint: 'deleteAccount',
        method: 'DELETE',
        token,
    })
}
