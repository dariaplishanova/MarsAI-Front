import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MarsAILogo } from './MarsAILogo.js';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './ui/LanguageSwitcher.js';
import { MobileLanguageSwitcher } from './ui/MobileLanguageSwitcher.js';
import Button from './ui/button.js';
import { useAuth, NAV_ITEMS } from '@/hooks/useAuth.js';

export function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const closeMobileMenu = () => setMobileMenuOpen(false);


const { user } = useAuth(); 
const visibleNavItems = user ? NAV_ITEMS.filter(item =>
  item.roles.includes(user.role)
) : [];
  return (
    <nav className="sticky z-50 bg-card/95 backdrop-blur-md border-b border-border/50 py-3">
      <div className="container mx-auto px-4 md:px-6 h-full flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="shrink-0">
          <MarsAILogo />
        </div>

        {/* Desktop Navigation - Hidden on Mobile */}
        <div className="hidden md:flex items-center gap-3">
          {visibleNavItems.map(item => (
  <Link key={item.path} to={item.path}>
    <Button
      variant={isActive(item.path) ? 'default' : 'ghost'}
      className={
        isActive(item.path)
          ? 'bg-primary/10 text-primary hover:bg-primary/20'
          : ''
      }
    >
      {t(item.label)}
    </Button>
  </Link>
))}
        
        {/* Desktop Right Section - Register + Language */}
        <div className="hidden md:flex items-center gap-3">
          {/* Desktop Language Selector */}
          <LanguageSwitcher />
        </div>

        {/* Mobile Right Section - Language + Burger */}
        <div className="flex md:hidden items-center gap-3">
          {/* Mobile Language Switcher */}
          <MobileLanguageSwitcher />

          {/* Burger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-border hover:border-primary hover:bg-primary/10 transition-colors"
            aria-label="Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence> 
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-card/98 backdrop-blur-lg border-b border-border/50 overflow-hidden"
            role="navigation"
            aria-label="Menu mobile"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {visibleNavItems.map(item => (
  <NavLink
    key={item.path}
    to={item.path}
    onClick={closeMobileMenu}
  >
    <Button
      variant={isActive(item.path) ? 'active' : 'ghost'}
    >
      {t(item.label)}
    </Button>
  </NavLink>
))}
  </div>
  </motion.div>
        )}
      </AnimatePresence>
      </div>
    </nav>
  );


}
