import { apiRequest } from '@/libs/api/index';

export const totalPenjualan = (token) => {
    return apiRequest({
        endpoint: 'totalPenjualan',
        method: 'GET',
        token,
    });
}

export const topSellingItems = (token) => {
    return apiRequest({
        endpoint: 'topSellingItems',
        method: 'GET',
        token,
    });
}

export const todayProfitLoss = (token) => {
    return apiRequest({
        endpoint: 'todayProfitLoss',
        method: 'GET',
        token,
    });
}

export const lifetimeProfitLoss = (token) => {
    return apiRequest({
        endpoint: 'lifetimeProfitLoss',
        method: 'GET',
        token,
    });
}