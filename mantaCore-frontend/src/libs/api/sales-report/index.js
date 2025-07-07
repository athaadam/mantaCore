import { apiRequest } from "../index";

export const getInvoices = async (token) => {
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