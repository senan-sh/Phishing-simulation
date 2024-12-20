import { httpClient } from "@/configs/http-client";
import { ApiRoutes } from "@/constants/apiRoutes";
import { Button, Form, Input } from "antd";
import toast from "react-hot-toast";
import { registrationFormItems, RegistrationValues } from "./const";

interface RegistrationProps {
  openLogin: () => void;
}

export default function Registration({ openLogin }: RegistrationProps) {
  const [registerForm] = Form.useForm();

  const handleRegister = (values: RegistrationValues) => {
    httpClient.post(ApiRoutes.Registration, values).then(() => {
      toast.success("User created successfully!");
      openLogin();
    });
  };

  return (
    <Form form={registerForm} onFinish={handleRegister} layout="vertical" autoComplete="off">
      {registrationFormItems.map((item) => {
        const Component = item.isPassword ? Input.Password : Input;
        return (
          <Form.Item
            required
            key={item.name}
            name={item.name}
            rules={item.rules}
            dependencies={item.dependencies}
          >
            <Component placeholder={item.placeholder} autoComplete={item.autoComplete} />
          </Form.Item>
        );
      })}
      <Button type="primary" htmlType="submit" block children="Sign up" />
    </Form>
  );
}
