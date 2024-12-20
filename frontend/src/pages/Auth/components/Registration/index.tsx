import { Button, Form, Input } from "antd";
import axios from "axios";
import { rules } from "./const";
import toast from "react-hot-toast";

interface RegistrationProps {
  openLogin: () => void;
}
export default function Registration({ openLogin }: RegistrationProps) {
  const [registerForm] = Form.useForm();
  const handleRegister = async (values) => {
    await axios.post("/api/register", values);
    toast.success("User created successfully!");
    openLogin();
  };
  return (
    <Form form={registerForm} onFinish={handleRegister} layout="vertical" autoComplete="off">
      <Form.Item required name="email" rules={rules.email}>
        <Input placeholder="Email" autoComplete="off" />
      </Form.Item>
      <Form.Item required name="name" rules={rules.name}>
        <Input placeholder="Name" autoComplete="off" />
      </Form.Item>
      <Form.Item required name="surname" rules={rules.surname}>
        <Input placeholder="Surname" autoComplete="off" />
      </Form.Item>
      <Form.Item name="password" rules={rules.password}>
        <Input.Password placeholder="Password" autoComplete="new-password" />
      </Form.Item>
      <Form.Item name="confirmPassword" dependencies={["password"]} rules={rules.confirmPassword}>
        <Input.Password placeholder="Confirm Password" autoComplete="new-password" />
      </Form.Item>
      <Button type="primary" htmlType="submit" block>
        Register
      </Button>
    </Form>
  );
}
