import { useTranslation } from 'react-i18next';

interface AdminSidebarContentProps {
  pages: any[];
  onSelectPage: (id: string) => void;
  activePageId: string;
}

export default function AdminSidebarContent({ pages, activePageId, onSelectPage }: AdminSidebarContentProps) {
  const { t } = useTranslation();

  return (
    <div className="flex h-full flex-col space-y-5 overflow-hidden">
      {/* The Title */}
      <h2 className="text-foreground text-2xl font-bold">Admin marsAI</h2>
      
      {/* The scrollable list container */}
      <div className="flex-1 space-y-2 overflow-y-auto pr-2 pb-20 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        
        {/* Your perfect map function */}
        {pages.map(page => {
          const isActive = activePageId === page.id.toString();

          return (
            <button
              key={page.id}
              onClick={() => onSelectPage(page.id)}
              className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-all duration-200 ${
                isActive
                  ? 'border-primary bg-primary/10 text-primary shadow-sm shadow-primary/20'
                  : 'border-transparent text-foreground hover:bg-muted'
              }`}
            >
              <page.icon className="h-5 w-5" />
              <span className="text-lg font-medium">{t(page.labelKey)}</span>
            </button>
          );
        })}
        
      </div>
    </div>
  );
}