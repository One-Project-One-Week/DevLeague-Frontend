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
          return api(originalRequest);
        }
      } catch (refreshError) {
        if (
          refreshError.response?.status === 404 &&
          refreshError.response?.data?.message === 'refresh not found'
        ) {
          // Handle refresh token not found scenario
          // You might want to redirect to login or clear user session
          // window.location.href = '/admin';
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);
