import { apiRequest } from '../index';

export async function fetchAllUsers(token) {
    const data = await apiRequest({
        endpoint: 'getAllUsers',
        method: 'GET',
        token,
    });

    return data.users || data;
}

export async function createAccount(form, token) {
    const data = await apiRequest({
        endpoint: 'addUser',
        method: 'POST',
        body: form,
        token,
    });

    return data.user || data;
}

export async function updateAccount(id, form, token) {
    const data = await apiRequest({
        endpoint: `updateUser/${id}`,
        method: 'POST',
        body: form,
        token,
    });

    return data.user || data;
}

export async function deleteAccountById(id, token) {
    return await apiRequest({
        endpoint: `deleteUser/${id}`,
        method: 'DELETE',
        token,
    });
}
