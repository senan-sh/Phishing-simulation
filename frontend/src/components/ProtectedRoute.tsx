import useUserContext from "@/context/UserContext/useUserContext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: React.ReactNode;
}
export default function ProtectedRoute(props: ProtectedRouteProps) {
  const hasUser = useUserContext().user != null;
  return hasUser ? props.element : <Navigate to="/auth" replace />;
}
