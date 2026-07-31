import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, X } from 'lucide-react';
import { toast } from 'sonner';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useFetch } from '@/hooks/useFetch';
import { FilmData } from '@/types/home';
import { filmStatusStyles } from '@/utils/variants';
import AdminFilmPopup from './popup/AdminFilmPopup';

export default function FilmsPage() {
  const { t } = useTranslation();
  const { data: films, isLoading, error, refetch } = useFetch<FilmData[]>('/movies/admin');
  const [selectedFilm, setSelectedFilm] = useState<FilmData | null>(null);

  const handleStatusChange = async (movieId: number, newStatus: string) => {
    try {
      await toast.promise(
        fetch(`${import.meta.env.VITE_API_URL}/movies/${movieId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }).then(response => {
          if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}`);
          }

          return response;
        }),
        {
          loading: t('toast.common.loading'),
          success: () => {
            refetch();
            return t('toast.movie.updated');
          },
          error: t('toast.common.error'),
        }
      );
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
      <h1 className="text-foreground mb-6 text-xl font-bold md:mb-8 md:text-2xl">{t('films.title')}</h1>

      {orderedFilmsByStatus.length === 0 ? (
        <Card className="text-muted-foreground p-8 text-center">{t('films.empty')}</Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {orderedFilmsByStatus.map(film => (
            <Card
              key={film.id}
              className="hover:border-primary/40 flex cursor-pointer flex-col justify-between p-5 transition-all"
              onClick={() => setSelectedFilm(film)}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-foreground line-clamp-2 text-base font-semibold">{film.title}</h3>
                  <Badge className={filmStatusStyles[film.status as keyof typeof filmStatusStyles]} variant="text">
                    {t(`films.status.${film.status}`)}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm">
                  {film.director_firstname} {film.director_lastname}
                </p>
              </div>

              <div className="border-border mt-4 flex gap-2 border-t pt-4">
                <Button
                  onClick={e => {
                    e.stopPropagation();
                    handleStatusChange(film.id, 'in_review');
                  }}
                  icon={<Check size={14} />}
                  className="flex-1 justify-center rounded-xl bg-green-50 py-2 text-green-600 hover:bg-green-100"
                >
                  {t('films.actions.accept', 'Accepter')}
                </Button>
                <Button
                  onClick={e => {
                    e.stopPropagation();
                    handleStatusChange(film.id, 'rejected');
                  }}
                  icon={<X size={14} />}
                  className="flex-1 justify-center rounded-xl bg-red-50 py-2 text-red-600 hover:bg-red-100"
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
