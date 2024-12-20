import { ApiRoutes } from "@/constants/apiRoutes";
import { httpClient } from "../configs/http-client";

export const phingAttemptsService = {
  getList: async () => {
    return (await httpClient.get<PhishingAttemptList>(ApiRoutes.GetPhishingAttempts)).data;
  },
  create: (email: string) => {
    return httpClient.post(ApiRoutes.GetPhishingAttempts, { email });
  },
};
export enum PhishingAttemptStatus {
  Pending = "pending",
  Sent = "sent",
  Clicked = "clicked",
}

export interface PhishingAttempt {
  _id: string;
  email: string;
  status: PhishingAttemptStatus;
  createdAt: string; // ISO date string
  __v: number;
  emailContent: string;
}
type Paginated<T> = {
  totalElements: number;
  totalPages: number;
  data: T[];
};

type PhishingAttemptList = Paginated<PhishingAttempt>;
