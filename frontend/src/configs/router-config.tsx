import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import App from "../App";
import PhishingSimulation from "../pages/PhishingSimulation";
import ProtectedRoute from "../components/ProtectedRoute";
import Auth from "@/pages/Auth";

const unauthorizedRoutes: RouteObject[] = [
  {
    path: "/auth",
    element: <Auth />,
  },
];

const authRoutes: RouteObject[] = [
  {
    path: "/phishing-attempts",
    element: <PhishingSimulation />,
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
