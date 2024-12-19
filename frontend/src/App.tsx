import { Toaster } from "react-hot-toast";
import "./App.scss";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Outlet />
    </>
  );
}
