import useUserContext from "@/context/UserContext/useUserContext";
import { authService, LoginRequestBody } from "@/services/auth.service";
import { userService } from "@/services/user.service";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { rules } from "./const";

export default function Login() {
  const [loginForm] = Form.useForm();
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  const handleLogin = async (values: LoginRequestBody) => {
    await authService.login(values);
    const user = await userService.getUserDetails();
    setUser(user);
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
