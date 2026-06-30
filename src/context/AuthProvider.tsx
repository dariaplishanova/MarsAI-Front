import { ReactNode, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isTokenValid } from '@/utils/jwt.utils.js';
import { AuthContext } from './AuthContext.js';

export function AuthProvider({ children }: { children: ReactNode }) {
  const storedToken = localStorage.getItem('token');
  const navigate = useNavigate();

  const [token, setToken] =useState<string | null>(storedToken)

  if (storedToken && !isTokenValid(storedToken)) {
    localStorage.removeItem('token');
  }

  const [isAuthenticated, setIsAuthenticated] = useState(!!storedToken && isTokenValid(storedToken));

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setToken(token);
    setIsAuthenticated(true);

    navigate('/');
  };

  const logout = () => {
    navigate('/');
    localStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);
  };

  // Memoize the value to keep your frontend rendering performant and clean
  const contextValue = useMemo(
    () => ({
      token,
      isAuthenticated,
      login,
      logout,
    }),
    [token, isAuthenticated, login, logout]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
