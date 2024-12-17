import axios, { AxiosError, HttpStatusCode } from "axios";

export const httpClient = axios.create({
  baseURL: import.meta.env.BASE_URL,
});

httpClient.interceptors.response.use(
  (r) => r,
  (error) => {
    if (error instanceof AxiosError) {
      if (error.status === HttpStatusCode.Unauthorized) {
        // TODO: Implement refresh token
      }
    }
  }
);
