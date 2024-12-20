import { ApiRoutes } from "@/constants/apiRoutes";
import { httpClient } from "../configs/http-client";

export const userService = {
  registration: () => {
    return httpClient.post(ApiRoutes.Registration);
  },
  getUserDetails: async () => {
    const response = await httpClient.get(ApiRoutes.UserDetails);
    return response.data;
  },
};
