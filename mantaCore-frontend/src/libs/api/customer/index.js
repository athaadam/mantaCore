import { apiRequest } from ".."

export const getAllCustomers = (token) => {
    const data = apiRequest({
        endpoint: 'getAllCostumers',
        method: 'GET',
        token,
    })
    return data
}