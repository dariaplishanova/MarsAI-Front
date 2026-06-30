import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, X } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useFetch } from '@/hooks/useFetch';
import { FilmData } from '@/types/home';
import AdminFilmPopup from './popup/AdminFilmPopup';
import { filmStatusStyles } from '@/utils/variants';

export default function FilmsPage() {
  const { t } = useTranslation();
  const { data: films, isLoading, error, refetch } = useFetch<FilmData[]>('/movies/admin');
  const [selectedFilm, setSelectedFilm] = useState<FilmData | null>(null);

  const handleStatusChange = async (movieId: number, newStatus: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/movies/${movieId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <div className="text-muted-foreground p-8 text-center">{t('admin.dashboard.loading')}</div>;
  if (error) return <div className="text-destructive p-8 text-center">{error}</div>;

  const orderedFilmsByStatus = [...(films ?? [])].sort((a, b) => {
    const priorityA = ['pending', 'in_review'].includes(a.status) ? 1 : 2;
    const priorityB = ['pending', 'in_review'].includes(b.status) ? 1 : 2;
    return priorityA - priorityB;
  });

  return (
    <div className="px-4 py-6 md:p-8">
      <h1 className="mb-6 text-xl font-bold text-foreground md:mb-8 md:text-2xl">{t('films.title')}</h1>

      {orderedFilmsByStatus.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">{t('films.empty')}</Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {orderedFilmsByStatus.map(film => (
            <Card 
              key={film.id} 
              className="flex flex-col justify-between p-5 hover:border-primary/40 transition-all cursor-pointer"
              onClick={() => setSelectedFilm(film)}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-foreground text-base line-clamp-2">{film.title}</h3>
                  <Badge className={filmStatusStyles[film.status as keyof typeof filmStatusStyles]} variant="text">
                    {t(`films.status.${film.status}`)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {film.director_firstname} {film.director_lastname}
                </p>
              </div>

              <div className="flex gap-2 pt-4 mt-4 border-t border-border">
                <Button
                  onClick={e => { e.stopPropagation(); handleStatusChange(film.id, 'in_review'); }}
                  icon={<Check size={14} />}
                  className="flex-1 justify-center bg-green-50 text-green-600 hover:bg-green-100 rounded-xl py-2"
                >
                  {t('films.actions.accept', 'Accepter')}
                </Button>
                <Button
                  onClick={e => { e.stopPropagation(); handleStatusChange(film.id, 'rejected'); }}
                  icon={<X size={14} />}
                  className="flex-1 justify-center bg-red-50 text-red-600 hover:bg-red-100 rounded-xl py-2"
                >
                  {t('films.actions.reject', 'Rejeter')}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <AdminFilmPopup film={selectedFilm} open={selectedFilm !== null} onClose={() => setSelectedFilm(null)} />
    </div>
  );
}