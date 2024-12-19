import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: React.ReactNode;
}
const isAuthenticated = false;
const ProtectedRoute = (props: ProtectedRouteProps) => {
  return isAuthenticated ? props.element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
