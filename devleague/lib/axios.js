// lib/axios.ts
import axios from 'axios';
axios.defaults.withCredentials = true;
const apiUrl = process.env.API;
axios.defaults.baseURL = `${apiUrl}/api/v1`;
export const api = axios.create({
  baseURL: `${apiUrl}/api/v1`,
  withCredentials: true,
});
export const adminApi = axios.create({
  baseURL: `${apiUrl}/api/v1`,
  withCredentials: true,
});
adminApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Skip refresh token logic for login endpoint or already retried requests
    if (
      originalRequest.url.includes('/admin/login') ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 404 &&
      error.response?.data?.message === 'Access Token Not Found'
    ) {
      try {
        // Mark this request as retried to prevent infinite loops
        originalRequest._retry = true;

        const refreshResponse = await axios.post(
          `${apiUrl}/api/v1/admin/refresh`,
          {},
          {
            withCredentials: true,
          }
        );
        if (refreshResponse.status === 200) {
          return adminApi(originalRequest);
        }
      } catch (refreshError) {
        if (
          refreshError.response?.status === 404 &&
          refreshError.response?.data?.message === 'refresh not found'
        ) {
          return Promise.reject(refreshError);
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const userApi = axios.create({
  baseURL: `${apiUrl}/api/v1`,
  withCredentials: true,
});
userApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Skip refresh token logic for login endpoint or already retried requests
    if (originalRequest.url.includes('/auth/login') || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 404 &&
      error.response?.data?.message === 'No Access Token Found'
    ) {
      try {
        // Mark this request as retried to prevent infinite loops
        originalRequest._retry = true;
        const refreshResponse = await axios.post(
          `${apiUrl}/api/v1/auth/refresh`,
          {},
          {
            withCredentials: true,
          }
        );
        console.log(refreshResponse);
        if (refreshResponse.status === 200) {
          return userApi(originalRequest);
        }
      } catch (refreshError) {
        if (
          refreshError.response?.status === 404 &&
          refreshError.response?.data?.message === 'refresh not found'
        ) {
          return Promise.reject(refreshError);
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
