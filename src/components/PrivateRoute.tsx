import { ReactNode, useEffect } from "react"; 
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { isTokenValid, decodedToken } from "@/utils/jwt.utils";

interface PrivateRouteProps {
  children: ReactNode;
  role?: string;
}

export default function PrivateRoute({ children, role }: PrivateRouteProps) {
  const { isAuthenticated, logout } = useAuth();
  const token = localStorage.getItem("token");
  
  const hasInvalidSession = !isAuthenticated || !token || !isTokenValid(token);

  useEffect(() => {
    if (hasInvalidSession) {
      logout();
    }
  }, [hasInvalidSession, logout]);

  if (hasInvalidSession) {
    return <Navigate to="/login" replace />;
  }

  if (role) {
    try {
      const decoded = decodedToken(token);
      
      if (!decoded || decoded.role !== role) {
        return <Navigate to="/" replace />;
      }
    } catch (error) {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
}