import { Button, Form, Input } from "antd";
import { rules } from "./const";
import useUserContext from "@/context/UserContext/useUserContext";
import { useNavigate } from "react-router-dom";
import { authService, LoginRequestBody } from "@/services/auth.service";

export default function Login() {
  const [loginForm] = Form.useForm();
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  const handleLogin = async (values: LoginRequestBody) => {
    // await authService.login(values);
    setUser({ name: "Test user", username: "username" });
    navigate("/");
  };
  return (
    <Form form={loginForm} onFinish={handleLogin} layout="vertical">
      <Form.Item name="username" rules={rules.username}>
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item name="password" rules={rules.password}>
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Button type="primary" htmlType="submit" block>
        Login
      </Button>
    </Form>
  );
}
