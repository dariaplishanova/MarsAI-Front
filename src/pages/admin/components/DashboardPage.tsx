import { useTranslation } from 'react-i18next';
import { Film, Users } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { useFetch } from '@/hooks/useFetch';

export default function DashboardPage() {
  const { t } = useTranslation();

  const { data: users, isLoading: loadingUsers, error: errorUsers } = useFetch<any[]>('/directors');
  const { data: films, isLoading: loadingFilms, error: errorFilms } = useFetch<any[]>('/movies/admin');

  const isLoading = loadingUsers || loadingFilms;
  const error = errorUsers || errorFilms;

  const totalUsers = users ? users.length : 0;
  const totalFilms = films ? films.length : 0;

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center p-8">
        <p className="text-muted-foreground">{t('admin.dashboard.loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[50vh] items-center justify-center p-8">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 md:p-8">
      <h1 className="text-foreground mb-6 text-xl font-bold md:mb-8 md:text-2xl">{t('admin.dashboard.title')}</h1>

      {/* Defaults to dynamic single column stack on mobile, converts to flex layout inline on desktop spaces */}
      <div className="grid grid-cols-1 gap-4 md:flex md:gap-6">
        <Card variant="dashboard" className="flex w-full flex-row items-center gap-4 md:w-64">
          <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
            <Users size={24} />
          </div>
          <div>
            <p className="text-muted-foreground text-sm">{t('admin.dashboard.total_participants')}</p>
            <p className="text-foreground text-2xl font-bold">{totalUsers}</p>
          </div>
        </Card>

        <Card variant="dashboard" className="flex w-full flex-row items-center gap-4 md:w-64">
          <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
            <Film size={24} />
          </div>
          <div>
            <p className="text-muted-foreground text-sm">{t('admin.dashboard.total_films')}</p>
            <p className="text-foreground text-2xl font-bold">{totalFilms}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
