import { AuthUser } from '../types/userRole.js';

export function useAuth(): { user: AuthUser } {
  // MOCK TEMPORAIRE
  return {
    user: {
      id: 1,
      email: 'admin@test.com',
      role: 'Jury',
      isAuthenticated: true,    
    },
    
  };
}
export const NAV_ITEMS = [
  {
    label: 'nav.gallery',
    path: '/',
    roles: ['Jury', 'Admin', 'Super_Admin', 'User'],
  },
  {
    label: 'nav.submit',
    path: '/submit',
    roles: ['Admin' , 'Super_Admin' , 'Jury','User'],
  },
  {
    label: 'nav.jury',
    path: '/jury',
    roles: ['Admin', 'Super_Admin','Jury'],
  },
  {
    label: 'nav.admin',
    path: '/admin',
    roles: ['Admin', 'Super_Admin'],
  },
  {
    label: 'Super Admin',
    path: '/super-admin',
    roles: ['Super_Admin'],
  },
];