import { ApiRoutes } from "@/constants/ApiRoutes";
import { httpClient } from "../configs/http-client";

export const authService = {
  login: (body: LoginRequestBody) => {
    return httpClient.post(ApiRoutes.Login, body);
  },
  logout: () => {
    return httpClient.post(ApiRoutes.Logout);
  },
};

export interface LoginRequestBody {
  username: string;
  password: string;
}
