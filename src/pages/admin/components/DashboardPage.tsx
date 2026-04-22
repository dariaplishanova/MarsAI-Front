import { useTranslation } from 'react-i18next';
import { useFetch } from '@/hooks/useFetch';
import { Card } from '@/components/ui/Card';
import { Users, Film } from 'lucide-react';

export default function DashboardPage() {
  const { t } = useTranslation();

  const { data: users, isLoading: loadingUsers, error: errorUsers } = useFetch<any[]>('/directors');
  const { data: films, isLoading: loadingFilms, error: errorFilms } = useFetch<any[]>('/movies/admin');

  const isLoading = loadingUsers || loadingFilms;
  const error = errorUsers || errorFilms;

  const totalUsers = users ? users.length : 0;
  const totalFilms = films ? films.length : 0;

  if (isLoading) {
    <div className="flex h-full items-center justify-center p-8">
      <p className="text-muted-foreground">{t('admin.dashboard.loading')}</p>
    </div>;
  }

  if (error) {
    <div className="flex h-full items-center justify-center p-8">
      <p className="text-muted-foreground">{t('admin.dashboard.loading')}</p>
    </div>;
  }

  return (
    <div className='p-8'>
        <h1 className='mb-8 text-2xl font-bold text-foreground'>{t('admin.dashboard.title')}</h1>

        <div className='flex gap-6 '> 
            <Card variant="dashboard" className="flex w-64 flex-row items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{t('admin.dashboard.total_participants')}</p>
            <p className="text-2xl font-bold text-foreground">{totalUsers}</p>
          </div>
        </Card>

        <Card variant="dashboard" className="flex w-64 flex-row items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Film size={24} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{t('admin.dashboard.total_films')}</p>
            <p className="text-2xl font-bold text-foreground">{totalFilms}</p>
          </div>
        </Card>
        </div>
    </div>
  )
}
