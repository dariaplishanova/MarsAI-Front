export type Role = ('Jury' | 'Admin' | 'Super_Admin' | 'User')

export type User = {
id: number;
email: string;
role: Role;
}
export interface AuthUser extends User {
  isAuthenticated: boolean;
}
