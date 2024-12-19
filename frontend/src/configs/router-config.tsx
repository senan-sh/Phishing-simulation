import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import App from "../App";
import PhishingAttempts from "../pages/PhishingAttempts";
import ProtectedRoute from "../components/ProtectedRoute";
import Login from "../pages/Login";
import Registration from "../pages/Registration";

const unauthorizedRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
];

const authRoutes: RouteObject[] = [
  {
    path: "/phishing-attempts",
    element: <PhishingAttempts />,
  },
].map((a) => {
  return {
    ...a,
    element: <ProtectedRoute element={a.element} />,
  };
});

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      ...unauthorizedRoutes,
      ...authRoutes,
      {
        path: "/",
        element: <Navigate to={authRoutes[0].path!} />,
      },
    ],
  },
  {
    path: "*",
    element: <p>404 Page not found</p>,
  },
]);
