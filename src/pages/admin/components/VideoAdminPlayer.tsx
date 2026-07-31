import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card';
import { FilmData } from '@/types/home';

export default function VideoPlayer({ film }: { film: FilmData }) {
  const { t } = useTranslation();

  return (
    <Card variant="dashboard" className="shadow-sm">
      <div className="aspect-video w-full overflow-hidden rounded-xl bg-black shadow-inner">
        <video
          controls
          controlsList="nodownload"
          className="h-full w-full object-contain"
          src={film.video_url}
          poster={film.thumbnail}
          preload="metadata"
        >
          {t('jury.video.unsupported')}
        </video>
      </div>
    </Card>
  );
}
