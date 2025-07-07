// ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useUser } from '../UserContext';
import type { JSX } from "react/jsx-dev-runtime";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn } = useUser();
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;