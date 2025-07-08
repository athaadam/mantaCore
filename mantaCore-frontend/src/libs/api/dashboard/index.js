import { apiRequest } from '@/libs/api/index';

export const totalPenjualan = async (token) => {
    return await apiRequest({
        endpoint: 'totalPenjualan',
        method: 'GET',
        token,
    });
}

export const topSellingItems = async (token) => {
    return await apiRequest({
        endpoint: 'topSellingItems',
        method: 'GET',
        token,
    });
}

export const todayProfitLoss = async (token) => {
    return await apiRequest({
        endpoint: 'todayProfitLoss',
        method: 'GET',
        token,
    });
}

export const lifetimeProfitLoss = async (token) => {
    return await apiRequest({
        endpoint: 'lifetimeProfitLoss',
        method: 'GET',
        token,
    });
}