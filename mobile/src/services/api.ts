import axios from "axios";
import { getToken } from "./storage";

const api = axios.create({
  baseURL: "http://192.168.137.178:8080",
});

api.interceptors.request.use(
  async (config) => {
    const token = await getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;