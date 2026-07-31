import { useTranslation } from 'react-i18next';
import { Calendar, Film, Info } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { FilmData } from '@/types/home';

type Props = {
  film: FilmData;
};

export default function FilmStats({ film }: Props) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card className="flex items-center gap-3 p-4">
        <Calendar className="text-primary size-5" />
        <div>
          <p className="text-muted-foreground text-xs uppercase">
            {t('films.metadata.submission_date', 'Submission Date')}
          </p>
          <p className="text-sm font-semibold">
            {film.created_at ? new Date(film.created_at).toLocaleDateString() : '---'}
          </p>
        </div>
      </Card>

      <Card className="flex items-center gap-3 p-4">
        <Film className="text-primary size-5" />
        <div>
          <p className="text-muted-foreground text-xs uppercase">{t('films.metadata.identifier_id', 'Film ID')}</p>
          <p className="text-sm font-semibold">#{film.id}</p>
        </div>
      </Card>

      <Card className="flex items-center gap-3 p-4">
        <Info className="text-primary size-5" />
        <div>
          <p className="text-muted-foreground text-xs uppercase">{t('films.metadata.total_score', 'Score')}</p>
          <p className="text-primary text-sm font-bold">{film.score_total ?? '---'} /10</p>
        </div>
      </Card>
    </div>
  );
}
