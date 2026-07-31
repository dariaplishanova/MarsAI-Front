import { useState } from 'react';
import { Film, LayoutDashboard, Users } from 'lucide-react';
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
      case 'dashboard':
        return <DashboardPage />;
      case 'films':
        return <FilmsPage />;
      case 'users':
        return <UsersPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <header className="border-border bg-card flex items-center justify-between border-b px-4 py-4 md:hidden">
        <h2 className="text-foreground text-lg font-bold">
          Admin <span className="text-primary">marsAI</span>
        </h2>

        <MobileSidebar pages={ADMIN_PAGES} activePageId={activePageId} onSelectPage={setActivePageId} />
      </header>

      <div className="flex flex-1">
        <aside className="border-border bg-card hidden w-64 border-r p-6 md:block">
          <AdminSidebarContent pages={ADMIN_PAGES} activePageId={activePageId} onSelectPage={setActivePageId} />
        </aside>

        <main className="bg-background flex-1 overflow-y-auto">{renderPageContent()}</main>
      </div>
    </div>
  );
}
