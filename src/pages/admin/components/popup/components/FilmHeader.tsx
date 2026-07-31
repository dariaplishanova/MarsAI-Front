import { useTranslation } from 'react-i18next';
import Badge from '@/components/ui/Badge';
import { FilmData } from '@/types/home';

type Props = {
  film: FilmData;
};

export default function FilmHeader({ film }: Props) {
  const { t } = useTranslation();

  const statusStyles: Record<string, string> = {
    approved: 'bg-green-100 text-green-700',
    official_selection: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
    pending: 'bg-yellow-100 text-yellow-700',
    in_review: 'bg-yellow-100 text-yellow-700',
  };

  return (
    <div className="border-border flex flex-col gap-4 border-b pb-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{film.title}</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          {t('films.col_name', 'Réalisateur')}:{' '}
          <span className="text-foreground font-medium">
            {film.director_firstname ?? ''} {film.director_lastname ?? ''}
          </span>
        </p>
      </div>

      <Badge className={statusStyles[film.status] ?? ''}>{t(`films.status.${film.status}`)}</Badge>
    </div>
  );
}
