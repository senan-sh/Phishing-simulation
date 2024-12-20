import { ApiRoutes } from "@/constants/apiRoutes";
import { httpClient } from "../configs/http-client";

export const phingAttemptsService = {
  getList: async (page: number, size: number) => {
    return (
      await httpClient.get<PhishingAttemptList>(ApiRoutes.GetPhishingAttempts, {
        params: {
          page,
          size,
        },
      })
    ).data;
  },
  create: (body: { email: string; emailContent: string }) => {
    return httpClient.post(ApiRoutes.GetPhishingAttempts, body);
  },
};
export enum PhishingAttemptStatus {
  Failed = "failed",
  Pending = "pending",
  Sent = "sent",
  Clicked = "clicked",
}

export interface PhishingAttempt {
  _id: string;
  email: string;
  status: PhishingAttemptStatus;
  createdAt: string;
  __v: number;
  emailContent: string;
}
type Paginated<T> = {
  totalElements: number;
  totalPages: number;
  data: T[];
};

type PhishingAttemptList = Paginated<PhishingAttempt>;
