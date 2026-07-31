import { ComponentType } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

type AdminPage = {
  id: string;
  labelKey: string;
  icon: ComponentType<{ className?: string }>;
};

interface AdminSidebarContentProps {
  pages: AdminPage[];
  activePageId: string;
  onSelectPage: (id: string) => void;
  onCloseMobileSidebar?: () => void;
}

export default function AdminSidebarContent({
  pages,
  activePageId,
  onSelectPage,
  onCloseMobileSidebar,
}: AdminSidebarContentProps) {
  const { t } = useTranslation();

  const baseButton =
    'flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all duration-200';

  const activeButton = 'border-primary bg-primary/10 font-semibold text-primary shadow-sm';

  const inactiveButton = 'border-transparent text-muted-foreground hover:bg-muted hover:text-foreground';

  return (
    <div className="bg-card text-card-foreground flex h-full flex-col justify-between">
      {/* Header */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-foreground text-xl font-bold tracking-tight">
            {t('admin.sidebar.brand_prefix', 'Admin')} <span className="text-primary">marsAI</span>
          </h2>

          {onCloseMobileSidebar && (
            <button onClick={onCloseMobileSidebar} className="hover:bg-muted rounded-lg p-1.5 md:hidden">
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="space-y-1.5">
          {pages.map(page => {
            const isActive = activePageId === page.id;
            const Icon = page.icon;

            return (
              <button
                key={page.id}
                onClick={() => {
                  onSelectPage(page.id);
                  onCloseMobileSidebar?.();
                }}
                className={`${baseButton} ${isActive ? activeButton : inactiveButton}`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className="text-sm font-medium">{t(page.labelKey)}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer placeholder (optional) */}
      <div className="border-border border-t pt-4" />
    </div>
  );
}
