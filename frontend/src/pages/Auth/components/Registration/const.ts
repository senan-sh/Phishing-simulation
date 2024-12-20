import { Rule } from "antd/es/form";

const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#$%?&*]).{8,}$/;
export const rules: Record<string, Rule[]> = {
  email: [
    { required: true, message: "Email is required" },
    { type: "email", message: "Please enter valid email" },
  ],
  name: [{ required: true, message: "Name is required" }],
  surname: [{ required: true, message: "Name is required" }],
  password: [
    { required: true, message: "Password is required" },
    () => ({
      validator(_, value) {
        if (!value) return Promise.resolve();
        if (!strongPasswordRegex.test(value)) {
          return Promise.reject(
            "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
          );
        }
        return Promise.resolve();
      },
    }),
  ],
  confirmPassword: [
    { required: true },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue("password") === value) return Promise.resolve();
        return Promise.reject("Passwords do not match");
      },
    }),
  ],
};

export const registrationFormItems = [
  { name: "email", rules: rules.email, placeholder: "Email", autoComplete: "off" },
  { name: "name", rules: rules.name, placeholder: "Name", autoComplete: "off" },
  { name: "surname", rules: rules.surname, placeholder: "Surname", autoComplete: "off" },
  {
    name: "password",
    rules: rules.password,
    placeholder: "Password",
    autoComplete: "new-password",
    isPassword: true,
  },
  {
    name: "confirmPassword",
    rules: rules.confirmPassword,
    placeholder: "Confirm Password",
    autoComplete: "new-password",
    isPassword: true,
    dependencies: ["password"],
  },
];

export interface RegistrationValues {
  email: string;
  name: string;
  surname: string;
  password: string;
  confirmPassword: string;
}
