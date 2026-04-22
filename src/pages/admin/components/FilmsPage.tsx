import { useTranslation } from 'react-i18next';
import { Check, X } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { useFetch } from '@/hooks/useFetch';
import { FilmWithDirector } from '@/types/home';

export default function FilmsPage() {
  const { t } = useTranslation();

  const { data: films, isLoading, error, refetch } = useFetch<FilmWithDirector[]>('/movies/admin');

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

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        console.error('The Backend complained with:', errorData);

        throw new Error(errorData?.message || `HTTP Error ${response.status}`);
      }

      refetch();
      alert(`Film status updated to ${newStatus}!`);
    } catch (err: any) {
      console.error(err);
      alert(`Erreur: ${err.message}`);
    }
  };

  if (isLoading) return <div className="text-muted-foreground p-8">{t('admin.dashboard.loading')}</div>;
  if (error) return <div className="text-destructive p-8">{error}</div>;

  const safeFilms = films ?? [];

  const sortedFilms = [...safeFilms].sort((a, b) => {
    const priorityA = a.status === 'pending' || a.status === 'in_review' ? 1 : 2;
    const priorityB = b.status === 'pending' || b.status === 'in_review' ? 1 : 2;

    return priorityA - priorityB;
  });

  const statusStyles = {
    approved: 'bg-green-100 text-green-700',
    official_selection: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
    pending: 'bg-yellow-100 text-yellow-700',
    in_review: 'bg-yellow-100 text-yellow-700',
  };

  return (
    <div className="p-8">
      <h1 className="text-foreground mb-8 text-2xl font-bold">{t('films.title')}</h1>

      <Card variant="default" className="overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="border-border text-muted-foreground border-b">
            <tr>
              <th className="p-4 font-medium">{t('films.col_title')}</th>
              <th className="p-4 font-medium">{t('films.col_name')}</th>
              <th className="p-4 font-medium">{t('films.col_status')}</th>
              <th className="p-4 text-right font-medium">{t('films.col_actions')}</th>
            </tr>
          </thead>

          <tbody className="divide-border text-foreground divide-y">
            {sortedFilms.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-muted-foreground p-8 text-center">
                  {t('films.empty')}
                </td>
              </tr>
            ) : (
              sortedFilms.map(film => (
                <tr key={film.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4 font-semibold">{film.title}</td>
                  <td className="p-4">{`${film.director_firstname} ${film.director_lastname}`}</td>
                  <td className="p-4">
                    <Badge className={statusStyles[film.status as keyof typeof statusStyles]}>
                      {t(`films.status.${film.status}`)}
                    </Badge>
                  </td>
                  <td className="flex justify-end gap-2 p-4">
                    <button
                      onClick={() => handleStatusChange(film.id, 'in_review')}
                      className="flex h-8 w-8 items-center justify-center rounded-md bg-green-50 text-green-600 transition-colors hover:bg-green-100"
                    >
                      <Check size={16} />
                    </button>

                    <button
                      onClick={() => handleStatusChange(film.id, 'rejected')}
                      className="flex h-8 w-8 items-center justify-center rounded-md bg-red-50 text-red-600 transition-colors hover:bg-red-100"
                    >
                      <X size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
