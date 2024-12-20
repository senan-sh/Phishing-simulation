import { Rule } from "antd/es/form";

export const rules: Record<string, Rule[]> = {
  username: [{ required: true, message: "Username is required" }],
  password: [{ required: true, message: "Password is required" }],
};
