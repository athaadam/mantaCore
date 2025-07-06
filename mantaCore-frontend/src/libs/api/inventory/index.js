import { apiRequest } from '../index';

export const fetchAllItems = async (token) => {
    const data = await apiRequest({
        endpoint: 'getAllItems',
        method: 'GET',
        token,
    });

    return data.items || data;
};

export const createItem = async (form, token) => {
    const data = await apiRequest({
        endpoint: 'createItem',
        method: 'POST',
        body: form,
        token,
    });

    return data.item || data;
};

export const updateItem = async (id, form, token) => {
    const data = await apiRequest({
        endpoint: `updateItem/${id}`,
        method: 'POST',
        body: form,
        token,
    });
    
    return data.item || data;
};