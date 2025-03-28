import { useAuthStore } from "@/module/zustand-auth-store";
import axios from "axios";
import Cookies from "js-cookie";

//baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,

export const api = axios.create({
  baseURL: `https://dukanda-core-dev-0-0-1.onrender.com/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("dukanda-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await useAuthStore.getState().refreshAccessToken();
      const newToken = Cookies.get("dukanda-token");
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);