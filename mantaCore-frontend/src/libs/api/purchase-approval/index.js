import { apiRequest } from '../index'

export const getAllPurchases = async (token) => {
    const data = await apiRequest({
        endpoint: 'getAllPurchases',
        method: 'GET',
        token,
    })

    return data.purchases || data
}
