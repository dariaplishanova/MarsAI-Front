import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card';
import { FilmData } from '@/types/home';

export default function VideoPlayer({ film }: { film: FilmData }) {
  const { t } = useTranslation();

  return (
    <Card variant="dashboard" className="shadow-sm">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">{film.title}</h1>
          <p className="mt-1 mb-2 text-base font-medium text-accent-burgundy">
            {t('jury.video.director')}: {`${film.director_firstname} ${film.director_lastname}` }
          </p>
          <p className="text-sm text-muted-foreground">
            {t('jury.video.language')}: {film.language} • {t('jury.video.duration')}: {film.duration}{t('jury.video.seconds')}
          </p>
        </div>
        <span className="bg-primary/10 text-primary border-primary/20 rounded-full border px-3 py-1 text-xs font-medium">
          {film.status === 'in_review' ? t('jury.video.status_in_review') : film.status}
        </span>
      </div>
      
      <div className="aspect-video w-full overflow-hidden rounded-xl bg-black shadow-inner">
        <video 
          controls 
          controlsList="nodownload"
          className="h-full w-full object-contain"
          src={film.video_url}
          poster={film.thumbnail_url}
          preload="metadata"
        >
          {t('jury.video.unsupported')}
        </video>
      </div>
      
      <div className="mt-4">
        <h3 className="font-semibold text-foreground">{t('jury.video.synopsis_title')}</h3>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
          {film.synopsis || film.synopsis_fr || t('jury.video.no_synopsis')}
        </p>
      </div>
    </Card>
  );
}