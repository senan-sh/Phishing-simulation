import useUserContext from "@/context/UserContext/useUserContext";
import AppFooter from "./Footer";
import AppHeader from "./Header";
import "./Layout.scss";

interface LayoutProps {
  children: React.ReactElement;
}
export default function Layout(props: LayoutProps) {
  const hasUser = useUserContext().user != null;

  return (
    <div className={"main-layout" + (hasUser ? " loggedIn" : "")}>
      {hasUser && <AppHeader />}
      <div className="main-content">{props.children}</div>
      <AppFooter />
    </div>
  );
}
