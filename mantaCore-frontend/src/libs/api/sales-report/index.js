import { apiRequest } from "../index";

export const filterInvoices = async (token) => {
    const data = await apiRequest({
        endpoint: 'filterInvoices',
        method: 'GET',
        token,
    });

    return data;
}

export const salesReport = async (token) => {
    const data = await apiRequest({
        endpoint: 'sales-report',
        method: 'GET',
        token,
    });

    return data.sales || data;
}

export const getInvoices = async (token) => {
    return await apiRequest({
        endpoint: 'getAllInvoices',
        method: 'GET',
        token,
    });
}