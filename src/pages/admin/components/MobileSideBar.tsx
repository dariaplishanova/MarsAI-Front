import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Button from '@/components/ui/Button';
import AdminSidebarContent from './AdminSidebarContent';

interface MobileSidebarProps {
  pages: any[];
  activePageId: string;
  onSelectPage: (id: string) => void;
}

export default function MobileSidebar({ pages, activePageId, onSelectPage }: MobileSidebarProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="border-border bg-background text-foreground flex items-center gap-2"
      >
        <Menu className="size-4" /> {t('admin.sidebar.menu_button', 'Menu')}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed bottom-0 left-0 top-0 z-50 flex w-4/5 max-w-sm flex-col border-r border-border bg-card p-6 shadow-2xl"
            >
              <AdminSidebarContent 
                pages={pages}
                activePageId={activePageId}
                onSelectPage={onSelectPage}
                onCloseMobileSidebar={() => setIsOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}