import { ApiRoutes } from "@/constants/ApiRoutes";
import { httpClient } from "../configs/http-client";

export const phingAttemptsService = {
  getList: () => {
    return httpClient.get(ApiRoutes.GetPhishingAttempts);
  },
  create: () => {
    return httpClient.post(ApiRoutes.GetPhishingAttempts);
  },
};
