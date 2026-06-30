export type UserRole = 'user' | 'jury' | 'admin';

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: UserRole;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export interface JWTPayload {
  userId: number;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}