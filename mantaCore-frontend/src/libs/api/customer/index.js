import { apiRequest } from ".."

export const getAllCustomers = async (token) => {
    const data = await apiRequest({
        endpoint: 'getAllCostumers',
        method: 'GET',
        token,
    })
    return data
}

export const createCustomer = async (data, token) => {
    const res = await apiRequest({
        endpoint: 'createCostumer',
        method: 'POST',
        body: data,
        token,
    });
    return res.costumer;
};

export const updateCustomerById = async (id, data, token) => {
    const res = await apiRequest({
        endpoint: `updateCostumer/${id}`,
        method: 'POST',
        body: data,
        token,
    });
    return res.costumer;
}
