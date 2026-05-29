import { ReactNode, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isTokenValid } from '@/utils/jwt.utils.js';
import { AuthContext } from './AuthContext.js';

export function AuthProvider({ children }: { children: ReactNode }) {
  const storedToken = localStorage.getItem('token');
  const navigate = useNavigate();

  if (storedToken && !isTokenValid(storedToken)) {
    localStorage.removeItem('token');
  }

  const [isAuthenticated, setIsAuthenticated] = useState(!!storedToken && isTokenValid(storedToken));

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);

    navigate('/');
  };

  const logout = () => {
    navigate('/');
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  // Memoize the value to keep your frontend rendering performant and clean
  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
    }),
    [isAuthenticated, login, logout]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
