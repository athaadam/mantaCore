import { apiRequest } from "..";

export const apiHit = async (endpoint, token, method = 'GET', body = null, skipAuth = false) => {
  return await apiRequest({ endpoint, token, method, body, skipAuth });
};
