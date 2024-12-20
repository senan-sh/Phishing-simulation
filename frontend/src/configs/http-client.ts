import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

httpClient.interceptors.response.use(
  (r) => r,
  (error) => {
    let message: string;
    if (error instanceof AxiosError) {
      message = error.message;
    } else {
      message = error.toString();
    }
    toast.error(message);
    return Promise.reject(error);
  }
);
