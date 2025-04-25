// lib/axios.ts
import axios from 'axios';
axios.defaults.withCredentials = true;
const api = process.env.API;
export const adminApi = axios.create({
  baseURL: `${api}/api/v1`,
  withCredentials: true,
});
adminApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Skip refresh token logic for login endpoint
    if (originalRequest.url.includes('/admin/login')) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      error.response?.data?.message === 'Access Token Not Found'
    ) {
      try {
        const refreshResponse = await axios.post(
          `${api}/api/v1/admin/refresh`,
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
      }
    }

    return Promise.reject(error);
  }
);
