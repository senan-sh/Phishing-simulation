import { Layout } from "antd";
import "./Footer.scss";

const { Footer } = Layout;

export default function AppFooter() {
  return (
    <Footer className="footer-container">
      <p>© {new Date().getFullYear()} Phishing Simulation.</p>
    </Footer>
  );
}
