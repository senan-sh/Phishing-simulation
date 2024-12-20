import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Layout, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import "./Header.scss";
import useUserContext from "@/context/UserContext/useUserContext";
import { useCallback, useMemo } from "react";
import { authService } from "@/services/auth.service";
const { Header } = Layout;

export default function AppHeader() {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    await authService.logout();
    setUser(null);
    navigate("/auth");
  }, [navigate, setUser]);

  const menuItems: MenuProps["items"] = useMemo(() => {
    return [
      {
        key: "logout",
        label: (
          <span className="logout-dropdown-item">
            <LogoutOutlined />
            <span>Log out</span>
          </span>
        ),
      },
    ];
  }, []);

  const menu: MenuProps = useMemo(() => {
    return {
      className: "header-user-dropdown",
      items: menuItems,
      onClick: (info) => {
        if (info.key === "logout") {
          handleLogout();
        }
      },
    };
  }, [handleLogout, menuItems]);

  return (
    <Header className="app-header">
      <div className="logo">Phishing Simulation</div>
      <Dropdown menu={menu} trigger={["click"]} placement="bottomRight">
        <div className="avatar">
          <span>{user.name}</span>
          <Avatar icon={<UserOutlined />} />
        </div>
      </Dropdown>
    </Header>
  );
}
