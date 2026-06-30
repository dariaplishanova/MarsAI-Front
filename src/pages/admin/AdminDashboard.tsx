import { useState } from 'react';
import { LayoutDashboard, Film, Users } from 'lucide-react';
import AdminSidebarContent from './components/AdminSidebarContent';
import DashboardPage from './components/DashboardPage';
import FilmsPage from './components/FilmsPage';
import MobileSidebar from './components/MobileSideBar';
import UsersPage from './components/UsersPage';


const ADMIN_PAGES = [
  { id: 'dashboard', labelKey: 'admin.sidebar.dashboard', icon: LayoutDashboard },
  { id: 'films', labelKey: 'admin.sidebar.films', icon: Film },
  { id: 'users', labelKey: 'admin.sidebar.users', icon: Users },
];

export default function AdminDashboard() {
  const [activePageId, setActivePageId] = useState<string>('dashboard');

  const renderPageContent = () => {
    switch (activePageId) {
      case 'dashboard': return <DashboardPage />;
      case 'films': return <FilmsPage />;
      case 'users': return <UsersPage />;
      default: return <DashboardPage />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      
      <header className="flex items-center justify-between border-b border-border bg-card px-4 py-4 md:hidden">
        <h2 className="text-lg font-bold text-foreground">Admin <span className="text-primary">marsAI</span></h2>
        
        <MobileSidebar 
          pages={ADMIN_PAGES}
          activePageId={activePageId}
          onSelectPage={setActivePageId}
        />
      </header>

      <div className="flex flex-1">
        
        <aside className="hidden w-64 border-r border-border bg-card p-6 md:block">
          <AdminSidebarContent
            pages={ADMIN_PAGES}
            activePageId={activePageId}
            onSelectPage={setActivePageId}
          />
        </aside>

        <main className="flex-1 overflow-y-auto bg-background">
          {renderPageContent()}
        </main>
        
      </div>
    </div>
  );
}