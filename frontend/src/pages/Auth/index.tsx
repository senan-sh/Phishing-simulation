import { Tabs, TabsProps } from "antd";
import { useState } from "react";
import Login from "./components/Login";
import Registration from "./components/Registration";
import "./Auth.scss";

enum TabsEnum {
  Login = "login",
  Registration = "registration",
}
export default function Auth() {
  const [activeTab, setActiveTab] = useState<string>(TabsEnum.Login);
  const onChange: (activeKey: string) => void = (key: string) => {
    setActiveTab(key);
  };

  const openLogin = () => setActiveTab(TabsEnum.Login);

  const items: TabsProps["items"] = [
    {
      key: TabsEnum.Login,
      label: "Login",
      children: <Login />,
    },
    {
      key: TabsEnum.Registration,
      label: "Registration",
      children: <Registration openLogin={openLogin} />,
    },
  ];
  return (
    <div className="auth-page">
      <h1>Sign in to continue</h1>
      <div className="auth-box">
        <Tabs centered onChange={onChange} items={items} activeKey={activeTab} />
      </div>
    </div>
  );
}
