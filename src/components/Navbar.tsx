import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';
import { LogIn, LogOut, Menu, X } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import { AnimatePresence, motion } from 'motion/react';
import { useAuth } from '../hooks/useAuth';
import { decodedToken } from '../utils/jwt.utils';
import { MarsAILogo } from './MarsAILogo';
import Button from './ui/Button';
import { LanguageSwitcher } from './ui/LanguageSwitcher';

const navLinks = [
  { path: '/', label: 'nav.gallery', public: true },
  { path: '/submit', label: 'nav.submit', public: true, hideForRoles: ['jury', 'admin'] },
  { path: '/jury', label: 'nav.jury', roles: ['jury'] },
  { path: '/admin', label: 'nav.admin', roles: ['admin'] },
];

const mobileAnimation = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: 'auto' },
  exit: { opacity: 0, height: 0 },
  transition: { duration: 0.3 },
};

export function Navbar() {
  const { t } = useTranslation();
  const { isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const token = localStorage.getItem('token');

  const decoded = token ? decodedToken(token) : null;
  const userRole = decoded?.role;

  // This translation map fixes your i18next-parser warning from earlier!
  const localizedLabels: Record<string, string> = {
    'nav.gallery': t('nav.gallery'),
    'nav.submit': t('nav.submit'),
    'nav.jury': t('nav.jury'),
    'nav.admin': t('nav.admin'),
  };

  const visibleLinks = navLinks.filter(link => {
    // 1. If the user is a Jury member and the link says 'hide for jury', remove it
    if (isAuthenticated && link.hideForRoles?.includes(userRole || '')) {
      return false;
    }

    // 2. If the link is public, show it
    if (link.public) return true;

    // 3. If the link is private, check if the user has the right role
    if (isAuthenticated && link.roles) {
      return link.roles.includes(userRole || '');
    }

    return false;
  });

  const renderNavLinks = (onClick?: () => void) => (
    <>
      {visibleLinks.map(link => (
        <NavLink key={link.path} to={link.path} onClick={onClick}>
          {({ isActive }) => (
            <Button variant={isActive ? 'active' : 'ghost'} className="w-full md:w-auto">
              {localizedLabels[link.label] || link.label}
            </Button>
          )}
        </NavLink>
      ))}
    </>
  );

  return (
    <nav className="bg-card/95 border-border/50 sticky z-50 border-b py-3 shadow-xl shadow-white/5 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
        <MarsAILogo />

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-3 md:flex">
          {renderNavLinks()}

          {isAuthenticated ? (
            <Button onClick={logout} variant="destructive">
              <LogOut className="mr-1.5 h-4 w-4" />
              {t('button.logout')}
            </Button>
          ) : (
            <NavLink to="/login">
              <Button variant="connexion">
                <LogIn className="mr-1.5 h-4 w-4" />
                {t('button.connect')}
              </Button>
            </NavLink>
          )}
          <LanguageSwitcher />
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-foreground">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div className="md:hidden" {...mobileAnimation}>
            <div className="flex flex-col gap-2 p-4">
              {renderNavLinks(() => setMobileMenuOpen(false))}
              {isAuthenticated ? (
                <Button onClick={logout} variant="destructive">
                  <LogOut className="mr-1.5 h-4 w-4" />
                  {t('button.logout')}
                </Button>
              ) : (
                <NavLink to="/login">
                  <Button variant="connexion">
                    <LogIn className="mr-1.5 h-4 w-4" />
                    {t('button.connect')}
                  </Button>
                </NavLink>
              )}
              <div className="bg-border/50 my-2 h-px" />
              <LanguageSwitcher />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
